// index.js
const express = require("express");
require("dotenv").config();
const connectDB = require("./src/config/db");
const cookieParser = require("cookie-parser");
const errorhandler = require("./src/middleware/errorMiddleware");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5555;

const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN_VITE || "http://localhost:5173";

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
connectDB();




//Routes
const authRoute = require("./src/Routes/authRoute");
const userRoute = require("./src/Routes/userRoute");
const sellerRoute = require("./src/Routes/sellerRoute");
const adminRoutes = require("./src/Routes/adminRoutes");

const ordersRoutes = require("./src/Routes/orderRoute");
const wishlistRoute = require("./src/Routes/wishlistRoute");
const cartRoute = require("./src/Routes/cartRoute");

const categoryRoutes = require("./src/Routes/categoryRoute");
const categoryItemRoutes = require("./src/Routes/categoryItemsRoute");

const productRoutes = require("./src/Routes/productroutes");
const sellerProductsRoutes = require("./src/Routes/sellerProductRoutes");
const sellerRequestRoutes = require("./src/Routes/sellerProductRequestRoutes")



const adminProductRoutes = require("./src/Routes/adminProductRoutes");
const adminSellerProductRoutes = require("./src/Routes/adminSellerProductRoutes");
const adminProductRequestRoutes = require( "./src/Routes/adminProductRequestRoutes");


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoute);

//user
app.use("/api/user", userRoute);
app.use("/api/orders", ordersRoutes);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/cart", cartRoute);

//seller
app.use("/api/seller", sellerRoute);
app.use("/api/seller/products", sellerProductsRoutes);
app.use("/api/seller", sellerRequestRoutes);


//admin
app.use("/api/admin", adminRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/seller-products", adminSellerProductRoutes);
app.use("/api/admin", adminProductRequestRoutes);
app.use("/api/seller", sellerRequestRoutes);


//products
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/category-items", categoryItemRoutes);




app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});


app.use(errorhandler);

app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);

  

