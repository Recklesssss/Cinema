const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const roomRoutes = require('./Routes/roomRoutes');
const movieRoutes = require('./Routes/movieRoutes');
const cors = require('cors');

const roomController = require('./controllers/chatController');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST' , 'DELETE', 'PUT'],
  },
});

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.use(errorHandler);
app.use('/api/rooms', roomRoutes);
app.use('/api/movies', movieRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('message',(message)=>{
    io.emit('message',message)
  })
  // socket.on('create-room', async ({ roomName }) => {
  //   console.log(`Room creation requested: ${roomName}`);

  //   // Call the controller to create the room
  //   const { success, roomId, message } = await roomController.createRoom(
  //     roomName,
  //     socket.id // Use the socket ID as the creator ID
  //   );

  //   if (success) {
  //     socket.join(roomId); // Add the user to the created room
  //     socket.emit('room-created', roomId); // Inform the user of room creation
  //     console.log(`Room created: ${roomName} with ID: ${roomId}`);
  //   } else {
  //     socket.emit('error', message); // Send an error message if creation fails
  //   }
  // });

  socket.on('disconnect', () => {
   console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
