
import Produit from '../models/ProduitModel.js';

// Fonction pour créer un produit et l'envoyer à l'API
export const createProduit = async (req, res) => {
  const { nom, description, prix, categorie, stock, image, vendeur } = req.body;

  try {
    const newProduit = new Produit({
      nom,
      description,
      prix,
      categorie,
      stock,
      image,
      vendeur,
    });

    // Enregistrer le produit dans la base de données
    const savedProduit = await newProduit.save();

    // Réponse de succès
    res.status(201).json({
      success: true,
      message: "Produit créé avec succès",
      produit: savedProduit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création du produit",
      error: error.message,
    });
  }
};


// Fonction pour récupérer tous les produits
export const getProduits = async (req, res) => {
    try {
      const produits = await Produit.find();
      res.status(200).json({ success: true, produits });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des produits",
        error: error.message,
      });
    }
  };
  
