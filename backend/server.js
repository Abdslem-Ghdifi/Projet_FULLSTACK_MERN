import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import AuthRoute from './routes/AuthRoute.js';
import cors from 'cors';
import cloudinary from 'cloudinary';
import multer from 'multer';
import productRoutes from './routes/productRoutes.js '
import { createAdminController } from './controllers/AdminController.js';
import mongoose from 'mongoose';
import User from './models/userModel.js';
import Produit from './models/ProduitModel.js';
import Cart from './models/cartModel.js';
// Configure environment variables
dotenv.config();

// Create Express app
const app = express();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup for file uploads
const upload = multer({ dest: 'public/' });

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/auth', productRoutes);
// Test route
app.get('/', (req, res) => {
    res.send('<center><h1>Welcome to Green Store</h1></center>');
});

// Image upload route
app.post('/api/v1/auth/upload', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req?.file?.path);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'An error occurred during the upload',
        });
    }
});

// Admin user creation route 
app.post('/api/v1/admin/create', async (req, res) => {
    try {
        await createAdminController(req, res); // Call the controller
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error creating admin',
        });
    }
});

//endpoint to fetch live stats data
app.get('/api/v1/admin/stats', async (req, res) => {
    try {
        // Fetch live stats from MongoDB
        const totalUsers = await User.countDocuments();
        const activeProducts = await Produit.countDocuments({ stock: { $gt: 0 } });  // Active products (in stock)
        const pendingOrders = await Cart.countDocuments({ total: { $gt: 0 } });  // Pending orders

        //getting chart data (monthly sales, active users, etc.)
        const chartData = await getMonthlyChartData();

        // Respond with the data
        res.json({ stats: { totalUsers, activeProducts, pendingOrders }, chartData });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Error fetching stats' });
    }
});

// Helper function to generate monthly chart data
async function getMonthlyChartData() {
    const chartData = [];

    // Loop to get data for each month 
    for (let month = 1; month <= 12; month++) {
        const monthStart = new Date(2024, month - 1, 1); // Start of the month
        const monthEnd = new Date(2024, month, 0); // End of the month

        // Query database for stats for this month
        const usersThisMonth = await User.countDocuments({
            createdAt: { $gte: monthStart, $lt: monthEnd },
        });

        const productsThisMonth = await Produit.countDocuments({
            dateCreation: { $gte: monthStart, $lt: monthEnd },
        });

        const ordersThisMonth = await Cart.countDocuments({
            dateCreation: { $gte: monthStart, $lt: monthEnd },
        });

        chartData.push({
            name: monthStart.toLocaleString('default', { month: 'short' }), // Display month abbreviation
            users: usersThisMonth,
            products: productsThisMonth,
            orders: ordersThisMonth,
        });
    }

    return chartData;
}

// Set port
const port = process.env.PORT || 8084;

// Start the server
app.listen(port, () => {
    console.log(`Server running in ${process.env.DEV_MODE} mode on port ${port}`.bgCyan.white);
});
