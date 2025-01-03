const db = require('../config/database');

exports.createRoom = async ( roomName, creatorId ,movieId ) => {
  const room = await db.query(`INSERT INTO rooms (room_name, creator_id, movie_id) VALUES ($1, $2, $3) RETURNING room_id`
    , [roomName, creatorId ,movieId]);
    return room.rows[0];
}
exports.joinroom = async (userId) => {
  const room = await db.query(`INSERT INTO rooms( participant) VALUES ($1) RETURNING *`
    , [ userId]);
    return room;
}
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