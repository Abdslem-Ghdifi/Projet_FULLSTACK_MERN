import mongoose from 'mongoose';

// Définition du schéma pour une commande
const commandeSchema = new mongoose.Schema({
  acheteurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',  // Référence au modèle User
    required: true,
  },
  vendeurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',  // Référence au modèle User pour le vendeur
    required: true,
  },
  produits: [{
    produitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produit',  // Référence au modèle Produit
      required: true,
    },
    quantite: {
      type: Number,
      required: true,
      min: 1,  // La quantité doit être au moins 1
    },
  }],
  total: {
    type: Number,
    required: true,
    min: 0,  // Le total ne peut pas être inférieur à 0
  },
  dateCommande: {
    type: Date,
    default: Date.now,  // Date de création de la commande
  },
  
});

// Création du modèle Commande
const Commande = mongoose.model('Commande', commandeSchema);

export default Commande;
