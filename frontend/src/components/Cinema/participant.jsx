import React, { useState, useEffect, useRef } from 'react';
import io from "socket.io-client";
import SimplePeer from "simple-peer";
import { BiSolidToggleRight, BiSolidToggleLeft } from "react-icons/bi";

const socket = io("http://localhost:5000");

function Participant() {
  const [localStream, setLocalStream] = useState(null);
  const [peers, setPeers] = useState({});
  const [participants, setParticipants] = useState([]);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const localVideoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Media access error:", err));

    socket.on("participants", (updatedParticipants) => {
      setParticipants(updatedParticipants);
    });

    socket.on("signal", ({ peerId, signal }) => {
      if (peers[peerId]) {
        peers[peerId].signal(signal);
      } else {
        const peer = createPeer(peerId, false);
        peer.signal(signal);
        setPeers((prev) => ({ ...prev, [peerId]: peer }));
      }
    });

    socket.on("userJoined", ({ peerId }) => {
      const peer = createPeer(peerId, true);
      setPeers((prev) => ({ ...prev, [peerId]: peer }));
    });

    socket.on("userLeft", (peerId) => {
      setPeers((prev) => {
        if (prev[peerId]) prev[peerId].destroy();
        const { [peerId]: _, ...remainingPeers } = prev;
        return remainingPeers;
      });
      setParticipants((prev) =>
        prev.filter((participant) => participant.id !== peerId)
      );
    });

    return () => {
      socket.emit("leaveRoom", { roomId: "cinemaRoom" });
      localStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const createPeer = (peerId, initiator) => {
    const peer = new SimplePeer({
      initiator,
      trickle: false,
      stream: localStream,
    });

    peer.on("signal", (signal) => {
      socket.emit("signal", { peerId, signal });
    });

    peer.on("stream", (remoteStream) => {
      setParticipants((prev) =>
        prev.map((participant) =>
          participant.id === peerId
            ? { ...participant, remoteStream }
            : participant
        )
      );
    });

    return peer;
  };

  const toggleMedia = (type) => {
    if (!localStream) return;
    const track = type === "video"
      ? localStream.getVideoTracks()[0]
      : localStream.getAudioTracks()[0];
    if (track) {
      track.enabled = !track.enabled;
      type === "video" ? setVideoEnabled(track.enabled) : setAudioEnabled(track.enabled);
      socket.emit("updateMediaState", { [`${type}Enabled`]: track.enabled });
    }
  };

  return (
    <div className="leftContainer">
      <h1>Participants</h1>
      <div className="participantContainer">
        <div className="participantItem">
          <video ref={localVideoRef} autoPlay muted playsInline />
          <h3>You</h3>
          <button onClick={() => toggleMedia("video")} className="toggleButton">
            {videoEnabled ? (
              <BiSolidToggleRight style={{ color: 'green', fontSize: '24px' }} />
            ) : (
              <BiSolidToggleLeft style={{ color: 'red', fontSize: '24px' }} />
            )}
          </button>
          <button onClick={() => toggleMedia("audio")} className="toggleButton">
            {audioEnabled ? (
              <BiSolidToggleRight style={{ color: 'green', fontSize: '24px' }} />
            ) : (
              <BiSolidToggleLeft style={{ color: 'red', fontSize: '24px' }} />
            )}
          </button>
        </div>
        {participants.map((participant) => (
          <div className="participantItem" key={participant.id}>
            <video
              autoPlay
              playsInline
              ref={(video) => {
                if (video && participant.remoteStream) {
                  video.srcObject = participant.remoteStream;
                }
              }}
            />
            <h3>{participant.name}</h3>
            <p>Video: {participant.videoEnabled ? "On" : "Off"}</p>
            <p>Audio: {participant.audioEnabled ? "On" : "Off"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Participant;
