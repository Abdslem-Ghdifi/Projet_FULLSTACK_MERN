import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import AuthRoute from './routes/AuthRoute.js';
import cors from 'cors';
import cloudinary from 'cloudinary';
import multer from 'multer';

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

// Set port
const port = process.env.PORT || 8084;

// Start the server
app.listen(port, () => {
    console.log(`Server running in ${process.env.DEV_MODE} mode on port ${port}`.bgCyan.white);
});
