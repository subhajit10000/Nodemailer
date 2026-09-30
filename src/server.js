const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);


require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const authRouter = require('./router/authRoute.js');

app.use(express.json());

app.use(cors());

app.use('/api/auth', authRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🔥 Server is running on port https://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();