const express = require('express'); 
const connectDB = require('./config/db');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
