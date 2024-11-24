
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

export const updateProduct = async (req, res) => {
  const productId = req.params.id;

  console.log('Received data:', req.body);

  // Validate product ID
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid product ID format' });
  }

  try {
    // Allowed fields for update
    const allowedFields = ['nom', 'description', 'prix', 'categorie', 'stock', 'image'];
    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Handle image upload if any
    if (req.file) {
      updateData.image = req.file.path; // Assuming Multer middleware handles file uploads
    }

    // Find and update the product
    const updatedProduct = await Produit.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { new: true, runValidators: true } // Return the updated document and validate data
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      success:true,
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message: 'An error occurred while updating the product',
      error: error.message,
    });
  }
};
export const getProduitsByVendeur = async (req, res) => {
  const { vendeurId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(vendeurId)) {
    return res.status(400).json({ 
      success: false,
      message: 'Invalid vendeur ID'
    });
  }

  try {
    const produits = await Produit.find({ vendeur: vendeurId })
    
    if (!produits.length) {
      return res.status(404).json({ 
        success: false,
        message: 'No products found for this vendeur' 
      });
    }

    res.status(200).json({ 
      success: true,
      produits 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error retrieving products for this vendeur',
      error: error.message
    });
  }
};


