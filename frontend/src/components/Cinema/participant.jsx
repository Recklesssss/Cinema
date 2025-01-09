import React, { useState, useEffect, useRef } from 'react'
import io from "socket.io-client";
import SimplePeer from "simple-peer";
import { BiSolidToggleRight } from "react-icons/bi";
import { BiSolidToggleLeft } from "react-icons/bi";

const socket = io("http://localhost:5000");

function Participant({video}) {
  const [localStream,setLocalStream] = useState(null);
  const [peer,setPeer] = useState({});
  const [participants,setParticipants] = useState([]);
  const localVideoRef = useRef(null);

  useEffect(() => {

  })

  return (
    <div className="leftContainer">
          <h1>Participant</h1>
          <div className="participantContainer">
            {!video ? <div className="participantItem">
              <img src="" alt="" />
              <h3>Username</h3>
              <button className="muteButton">
              <BiSolidToggleRight style={{ color:'white',fontSize: '24px' }}/> 
              </button>
              <button className='onbutton'><BiSolidToggleLeft style={{ color:'white',fontSize: '24px' }} /></button>
            </div>:video}
          </div>
        </div>
  )
}

export default Participant