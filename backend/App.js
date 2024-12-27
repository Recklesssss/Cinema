const express = require('express');
const http = require('http');
const { Server } = require('socket.io'); 
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

dotenv.config();

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.use(errorHandler);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (message) => {
    console.log('Message received:', message);

    io.emit('message', message);
  }); 

  socket.on('create-room', ({ roomName }) => {
     
    console.log(`Room created: ${roomName} with ID: ${roomId}`);

    createRoom(roomId, { roomName, creatorId: socket.id });

    socket.join(roomId);
    socket.emit('room-created', roomId);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
