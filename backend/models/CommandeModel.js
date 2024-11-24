import mongoose from 'mongoose';

const commandeSchema = new mongoose.Schema({
  acheteurId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  commandes: [
    {
      vendeurId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      produits: [
        {
          produitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
          quantite: { type: Number, required: true },
        },
      ],
      total: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true }, // Total global de la commande
  dateCreation: { type: Date, default: Date.now },
});

const Commande = mongoose.model('Commande', commandeSchema);
export default Commande;
