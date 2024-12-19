import React, { useState } from 'react';
import "./Friends.css";
import Navbar from '../navbar/Navbar';

function Friends() {
  // Initialize friends as an array
  const [friends, setFriends] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ]);

  return (
    <div className="outer_container">
        <Navbar/>
    <div className="friends">
         
      <b><h3>Invite your friends to cinema</h3></b>
      <h4>Earn 100 points for each friend that signs up</h4>
      <div className="explore">
        <div className="nav_friend">
          <ul>
            <li>Friends</li>
            <li>Explore</li>
          </ul>
        </div>
        {/* Render the list of friends */}
        <div className="friend-list">
          {friends.length > 0 ? (
            friends.map((friend) => (
              <div key={friend.id} className="friend">
                {friend.name}
              </div>
            ))
          ) : (
            <p>No friends to display</p>
          )}
        </div>
      </div>
      <b><h4>Invite Link</h4></b>
      <p>Share this link with your friends: <a href="https://example.cinema.com">https://example.cinema.com</a></p>
    </div>
    </div>
  );
}

export default Friends;
