import mongoose from 'mongoose';
import Commande from '../models/CommandeModel.js'; // Assurez-vous que le modèle Commande est correctement importé
import User from '../models/userModel.js'; // Assurez-vous que le modèle User est correctement importé
import Produit from '../models/ProduitModel.js'; // Assurez-vous que le modèle Produit est correctement importé


export const getCommandes = async (req, res) => {
  try {
    const { userId } = req.body; // Récupérer l'ID de l'utilisateur dans le corps de la requête

    // Chercher les commandes de l'acheteur
    const commandes = await Commande.find({ acheteurId: userId })
      .populate('vendeurId', 'prenom nom')  // Peupler les informations du vendeur
      .populate('produits.produitId', 'nom prix image');  // Peupler les informations des produits

    // Si aucune commande n'est trouvée, retourner une erreur
    if (!commandes || commandes.length === 0) {
      return res.status(404).json({ success: false, message: 'Aucune commande trouvée' });
    }

    // Retourner les commandes avec les informations détaillées
    return res.json({
      success: true,
      commandes,
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

export const createCommande = async (req, res) => {
  try {
    const { acheteurId, command } = req.body;  // 'command' et non 'commandproduit'
    console.log("Les données reçues : ", req.body);  // Tester la requête complète

    // Validation des données reçues
    if (!acheteurId || !command || command.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Les informations de commande sont incomplètes.',
      });
    }

    // Tester si 'acheteurId' et 'command' existent
    console.log('Acheteur ID :', acheteurId);
    console.log('Commandes reçues :', command);

    // Préparation des commandes par vendeur
    const commandes = command.map((commande) => {
      // Tester la structure de chaque commande
      console.log('Vendeur ID :', commande.vendeurId);
      console.log('Produits dans la commande :', commande.produit);

      return {
        acheteurId,
        vendeurId: commande.vendeurId,
        produits: commande.produit.map((produit) => {  
          // Tester les produits à l'intérieur de chaque commande
          console.log('Produit dans la commande :', produit);

          return {
            produitId: produit.produitId,
            quantite: produit.quantite,
          };
        }),
        total: commande.total,
        dateCommande: new Date(),
        status: 'En attente',
      };
    });

    // Enregistrer chaque commande dans la base de données
    const savedCommandes = [];
    for (const commande of commandes) {
      console.log('Enregistrement de la commande :', commande);  // Tester chaque commande avant de l'enregistrer

      const savedCommande = await Commande.create(commande);
      savedCommandes.push(savedCommande);
    }

    res.status(201).json({
      success: true,
      message: 'Commandes créées avec succès.',
      commandes: savedCommandes,
    });
  } catch (error) {
    console.error('Erreur lors de la création des commandes :', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur lors de la création des commandes.',
    });
  }
};
