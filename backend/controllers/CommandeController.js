import mongoose from 'mongoose';
import Commande from '../models/CommandeModel.js'; // Assurez-vous que le modèle Commande est correctement importé
import User from '../models/userModel.js'; // Assurez-vous que le modèle User est correctement importé
import Produit from '../models/ProduitModel.js'; // Assurez-vous que le modèle Produit est correctement importé

export const getCommandes = async (req, res) => {
    try {
        const { userId } = req.body; // L'ID de l'utilisateur est maintenant dans le body

        console.log(userId);

        // Chercher les commandes de l'acheteur
        const commandes = await Commande.find({ acheteurId: userId });

        // Si aucune commande n'est trouvée, retourner une erreur
        if (!commandes || commandes.length === 0) {
            return res.status(404).json({ success: false, message: 'Aucune commande trouvée' });
        }

        // Peupler les informations des vendeurs et des produits dans les commandes
        const commandesAvecDetails = await Promise.all(commandes.map(async (commande) => {
            const commandesDetails = await Promise.all(commande.commandes.map(async (detail) => {
                // Peupler les informations du vendeur
                const vendeur = await User.findById(detail.vendeurId).select('prenom nom');
                
                // Peupler les informations du produit
                const produit = await Produit.findById(detail.produits.produitId).select('nom prix image');
                
                return {
                    ...detail.toObject(), // Les détails originaux de la commande
                    vendeur: vendeur ? { prenom: vendeur.prenom, nom: vendeur.nom } : null,
                    produit: produit ? { nom: produit.nom, prix: produit.prix, image: produit.image } : null
                };
            }));

            return {
                ...commande.toObject(),
                commandes: commandesDetails
            };
        }));

        return res.json({
            success: true,
            commandes: commandesAvecDetails,
        });

    } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
        return res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
};


export const createCommande = async (req, res) => {
  try {
    const { acheteurId, produits } = req.body;

    // Créer une structure pour organiser les produits par vendeur
    const commandesParVendeur = {};

    // Organiser les produits par vendeur
    produits.forEach((item) => {
      const vendeurId = item.produit.vendeur;

      if (!commandesParVendeur[vendeurId]) {
        commandesParVendeur[vendeurId] = {
          vendeurId: vendeurId,
          produits: [],
          total: 0,
        };
      }

      commandesParVendeur[vendeurId].produits.push({
        produitId: item.produit._id,
        quantite: item.quantite,
      });
      commandesParVendeur[vendeurId].total += item.produit.prix * item.quantite;
    });

    // Créer une commande avec des produits regroupés par vendeur
    const commande = new Commande({
      acheteurId: acheteurId,
      commandes: Object.values(commandesParVendeur),
      total: produits.reduce((acc, item) => acc + item.produit.prix * item.quantite, 0),
    });

    const savedCommande = await commande.save();

    return res.json({
      success: true,
      message: 'Commande créée avec succès',
      commande: savedCommande,
    });
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};
