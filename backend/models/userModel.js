import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    cin: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
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
        unique: true,
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
        default: '../../profil.jpg',
    },
    role: { type: String, default: "user" },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
}, { timestamps: true });

// Vérifie si le modèle existe déjà
const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
