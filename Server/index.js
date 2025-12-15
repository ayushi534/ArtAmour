// index.js
const express = require('express');
require('dotenv').config();
const connectDB = require('./src/config/db');
const cookieParser = require("cookie-parser");
const errorhandler = require('./src/middleware/errorMiddleware');
const cors = require("cors");
const helmet = require("helmet");
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5555;

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN_VITE || "http://localhost:5173";
app.use(helmet());
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(cookieParser());


// routers (require after middleware)
const productRoute = require('./src/Routes/productroutes');
const userRoute = require('./src/Routes/userRoute');
const sellerRoute = require('./src/Routes/sellerRoute');
const adminRoutes = require('./src/Routes/adminRoutes');
const authRoute = require('./src/Routes/authRoute');
const ordersRoutes = require('./src/Routes/orderRoute');
const categoryRoutes = require("./src/Routes/categoryRoute");
const categoryItemRoutes = require("./src/Routes/categoryItemsRoute");
const adminProductRoutes = require("./src/Routes/adminProductRoutes");
const ProductRoutes = require("./src/Routes/productroutes");
const wishlistRoute = require('./src/Routes/wishlistRoute');
const cartRoute = require('./src/Routes/cartRoute');
// connect DB once
connectDB();
// Mount routers (IMPORTANT: keep /api prefix for API routes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/products', productRoute);
app.use('/api/auth', authRoute);
app.use('/api/orders', ordersRoutes);
app.use('/api/user', userRoute);
app.use('/api/seller', sellerRoute);
app.use('/api/admin', adminRoutes); 
app.use('/api/categories', categoryRoutes);
app.use('/api/category-items', categoryItemRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/admin/products', adminProductRoutes);
app.use('/api/wishlist',wishlistRoute);
app.use('/api/cart', cartRoute)
     
// Basic 404 (must be after mounting routers)
app.use((req, res) => {
  res.status(404).json({ status: 404, message: `Route ${req.originalUrl} not found` });
});

// error handler (express error middleware)
app.use(errorhandler);
app.listen(PORT, () => console.log(`Art Amour backend running on http://localhost:${PORT}`));
  

