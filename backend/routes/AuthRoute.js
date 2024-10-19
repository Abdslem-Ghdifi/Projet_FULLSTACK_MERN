import express from 'express';
import { 
    registerController,
    loginController
} from '../controllers/AuthController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { createProduit, getProduits } from '../controllers/ProduitController.js';
import { updateUser } from '../controllers/UpdateUser.js';
import crypto from 'crypto'; // For generating reset token
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js'; // Import your User model

// Router object
const router = express.Router();

// Routes
// Register User
router.post('/RegisterUser', registerController);

// Test route
router.get('/test', requireSignIn);

// Login User
router.post('/loginUser', loginController);

// Add a product
router.post('/createProduit', createProduit);

// Get all products
router.get('/getProduits', getProduits);

// Update user
router.put('/updateUser', updateUser);

// Forgot password route
/*router.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Utilisateur non trouvé' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour
        await user.save();

        // Configure email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        // Password reset URL
        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Réinitialisation du mot de passe',
            text: `Vous avez demandé une réinitialisation de mot de passe. Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe : ${resetUrl}`,
        };

        // Send reset email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Email de réinitialisation envoyé' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur lors de la réinitialisation du mot de passe' });
    }
});

// Reset password route
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // Find the user by token and check if token has not expired
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Token invalide ou expiré' });
        }

        // Hash new password and save
        const salt = await bcrypt.genSalt(10);
        user.motdepasse = await bcrypt.hash(password, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Mot de passe réinitialisé avec succès' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur lors de la réinitialisation du mot de passe' });
    }
});*/

export default router;
