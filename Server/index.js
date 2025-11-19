// index.js (or idex.js)
const express = require('express');
require('dotenv').config();
const connectDB = require('./src/config/db');
const cookieParser = require("cookie-parser");
const errorhandler = require('./src/middleware/errorMiddleware');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5555;

// routers
const productRoute = require('./src/Routes/productroutes');
const userRoute = require('./src/Routes/userroute');
const sellerRoute = require('./src/Routes/sellerRoute');
const authRoute = require('./src/Routes/authRoute');
const ordersRoutes = require('./src/Routes/orderRoute');


app.use(express.json()); 
app.use(cookieParser());

const FRONTEND = process.env.FRONTEND_ORIGIN || 'http://localhost:5555yes';
app.use(cors({
  origin: FRONTEND,
  credentials: true
}));

// database connect
connectDB();

// Mount routers
app.use('/api/products', productRoute);    
app.use('/api/auth', authRoute);           
app.use('/api/orders', ordersRoutes);
app.use('/api/user', userRoute);
app.use('/api/sellers',sellerRoute);


// Basic 404
app.use((req, res) => {
  res.status(404).json({ status: 404, message: `Route ${req.originalUrl} not found` });
});

// error handler
app.use(errorhandler);

app.listen(PORT, () => console.log(`Art Amour backend running on http://localhost:${PORT}`));
