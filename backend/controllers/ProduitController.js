
import Produit from '../models/ProduitModel.js';
import mongoose from 'mongoose';

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

  // Delete product by ID
export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const deletedProduct = await Produit.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};

// Update product by ID
export const updateProduct = async (req, res) => {
  const productId = req.params.id;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const updatedProduct = await Produit.findByIdAndUpdate(
      productId,
      { $set: req.body },
      { new: true, runValidators: true } // Return the updated product and validate the data
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error });
  }
};
export const getProduitsByVendeur = async (req, res) => {
  const vendeurId = req.params.vendeurId;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(vendeurId)) {
    return res.status(400).json({ message: 'Invalid vendeur ID' });
  }

  try {
    // Find products by vendeur ID
    const produits = await Produit.find({ vendeur: vendeurId });

    // If no products are found
    if (produits.length === 0) {
      return res.status(404).json({ message: 'No products found for this vendeur' });
    }

    // Return the products
    res.status(200).json({ success: true, produits });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des produits pour ce vendeur',
      error: error.message,
    });
  }
};
  
