const db = require('../config/database');

exports.createRoom = async ( roomName, creatorId ,movieId ) => {
  const room = await db.query(`INSERT INTO rooms (room_name, creator_id, movie_id) VALUES ($1, $2, $3) RETURNING room_id`
    , [roomName, creatorId ,movieId]);
    return room.rows[0];
}
exports.joinroom = async (userId, roomId) => {
  try {
    // Step 1: Retrieve the current participants in the room
    const roomQuery = await db.query('SELECT participant FROM rooms WHERE room_id = $1', [roomId]);

    if (roomQuery.rows.length === 0) {
      throw new Error('Room not found');
    }

    // Step 2: Parse the current participants (it will be an array of JSON objects)
    const participants = roomQuery.rows[0].participant || []; // Fallback to empty array if no participants

    // Step 3: Add the new participant to the array
    const newParticipant = { id: userId };
    participants.push(newParticipant); // Append new user to the array

    // Step 4: Ensure participants are passed as jsonb array
    // PostgreSQL requires the correct casting to jsonb[] when updating
    const updateQuery = await db.query(
      'UPDATE rooms SET participant = $1::jsonb[] WHERE room_id = $2 RETURNING *',
      [participants, roomId]  // Pass participants array (it should already be in correct format)
    );

    return updateQuery.rows[0]; // Return the updated room info
  } catch (error) {
    console.error('Error in joinroom:', error.message);
    throw error; // Propagate the error to be handled elsewhere if needed
  }
};

exports.deleteRoom = async (roomId) => {
  const room = await db.query(`DELETE FROM rooms WHERE room_id = $1`, [roomId]);
}
exports.kickUser = async (roomId, userId) => {
    const room = await db.query(
      `UPDATE rooms 
       SET participant = jsonb_set(
         participant::jsonb, 
         '{}', 
         (participant::jsonb - $2)
       )
       WHERE room_id = $1
       RETURNING *`,
      [roomId, userId]
    );
    return room;
  };