// productRoutes.js
import express from 'express';
import Produit from './models/produitModel.js';  // This matches your 'produit' collection

const router = express.Router();

// Route to get all products from 'produit' collection
router.get('/products', async (req, res) => {
    try {
      const produits = await Produit.find(); // This should fetch data from 'produit' collection
      res.status(200).json(produits); // Return fetched products
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
router.get('/getProduitsByVendeur', getProduitsByVendeur);
export default router;
