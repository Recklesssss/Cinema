import React from 'react'
import './Cinema.css'
import Navbar from '../navbar/Navbar'

function Cinema() {
  return (
    <div>
    <Navbar/>
    <div className='cinema'>
        <div className="mainContainer">
            <div className="videoContent">

            </div>
            <div className="comment">
                <div className="commentContainer">
                    <div className="commentHeader">
                        <h2>Comments</h2>
                    </div>
                    <div className="commentBody">
                        <div className="commentItem">
                            <div className="commentUser">
                                <img src="" alt="" />
                                <h3>Username</h3>
                            </div>
                            <div className="commentText">
                                <p>Comment</p>
                            </div>
                        </div>
                    </div>
                    <div className="commentFooter">
                        <input type="text" placeholder="Write a comment..." />
                        <button>Post</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="leftContainer">
            <h1>Particioant</h1>
            <div className="participantContainer">
                <div className="participantItem">
                    <img src="" alt="" />
                    <h3>Username</h3>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Cinema