import mongoose from "mongoose";
import { format } from "morgan";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
    cin: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: true,
    },
    dateNais: {
        type: String,
        required: true,
    },
    tel: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    motdepasse: {
        type: String,
        required: true,
    },
    adresse: {
        type: String,
        required: true,
    },
    imageProfil: {  
        type: String, 
        default: '../../profil.jpg'   
    },
    //for password reset functionality
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
}, { timestamps: true });

export default mongoose.model('users', userSchema);
