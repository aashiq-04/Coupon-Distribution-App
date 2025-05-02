const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const couponRoutes = require('./routes/couponRoutes');
const adminRoutes = require('./routes/adminRoute');
dotenv.config();
const connectDB = require('./config/db');
connectDB();


const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use('/coupons', couponRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
