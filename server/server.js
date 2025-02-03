const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/AuthRoutes');
const offerRoutes = require('./routes/offersRoutes');
const applyRoutes = require('./routes/applyRoutes');

dotenv.config();

connectDB();

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['https://tech-interns.vercel.app', 'http://localhost:5173'];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/users', applyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});