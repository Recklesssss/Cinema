const dotenv = require('dotenv');

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const roomRoutes = require('./Routes/roomRoutes');
const movieRoutes = require('./Routes/movieRoutes');
const chatRoutes = require('./Routes/chatRoutes');
const  handleSocketEvents  = require('./Service/chatServices'); 
const cors = require('cors');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST' , 'DELETE', 'PUT'],
    credentials: true,
  },
    pingTimeout: 60000, // 60 seconds
    pingInterval: 25000, // 25 seconds
  
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/chat', chatRoutes);


app.use(errorHandler);

io.on('connection', (socket) => {
  handleSocketEvents.handleSocketEvents(socket, io);
  console.log('A user connected', socket.id);
  socket.on('disconnect', (reason) => {
   console.log('A user disconnected', socket.id, 'Reason:', reason);
   socket.removeAllListeners();
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
