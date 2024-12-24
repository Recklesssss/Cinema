const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./Middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mount user routes
app.use('/api/users', userRoutes);

// Global error handler (should be last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
