import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';

export const createAdminController = async (req, res) => {
    try {
      const { cin, nom, prenom, dateNais, tel, email, motdepasse, adresse } = req.body;
  
      if (!cin || !nom || !prenom || !dateNais || !tel || !email || !motdepasse || !adresse) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
      }
  
      // Check if the user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email is already in use.' });
      }
  
      const hashedPassword = await bcrypt.hash(motdepasse, 10);
  
      // Create admin
      const adminUser = new userModel({
        cin,
        nom,
        prenom,
        dateNais,
        tel,
        email,
        motdepasse: hashedPassword,
        adresse,
        role: 'admin', // Ensure role is 'admin'
      });
  
      await adminUser.save();
  
      res.status(201).send({
        success: true,
        message: 'Admin user created successfully',
        user: adminUser
      });
    } catch (error) {
      console.error('Error creating admin user:', error);  // Log the error for debugging
      res.status(500).send({
        success: false,
        message: 'Error creating admin user',
        error: error.message || 'Unknown error'
      });
    }
  };
  