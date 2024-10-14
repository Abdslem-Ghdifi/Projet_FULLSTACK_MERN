import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';  
const produitSchema = new mongoose.Schema({
    id_p: {
        type: String,
        default: uuidv4,
        required: true,
    },
    nom: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    prix: {
        type: Number,
        required: true,
        min: 0,
    },
    categorie: {
        type: String,
        required: true,
        enum: ['materiel', 'produit pour les animaux', 'produit pour les plantes'],  // Liste des catégories valides
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    image: {
        type: String,
        required: false,
    },
    vendeur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: false,
    },
    dateCreation: {
        type: Date,
        default: Date.now,
    }
});
const Produit = mongoose.model('Produit', produitSchema);
export default Produit;
