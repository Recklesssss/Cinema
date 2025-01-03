const db = require('../config/database');

exports.postMessages = async (message , sender , roomId)=>{
    const messages = await db.query(`INSERT INTO chats (comment , user_id , room_id ) values ($1,$2,$3) `,[message , sender , roomId]);
}
exports.getMessages = async (roomId)=>{
    const messages = await db.query(`SELECT * FROM chats WHERE room_id = $1 ORDER BY time ASC`,[roomId]);
    return messages.rows;
}