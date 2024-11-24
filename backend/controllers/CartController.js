import Cart from '../models/cartModel.js';
import Produit from '../models/ProduitModel.js';
import User from '../models/userModel.js';

// Fonction pour ajouter un produit au panier
export const addToCart = async (req, res) => {
  
  const {userId ,  produitId, quantity } = req.body;
  try {
    // Vérifiez si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

    // Vérifiez si le produit existe
    const produit = await Produit.findById(produitId);
    if (!produit) {
      return res.status(404).json({ success: false, message: 'Produit non trouvé' });
    }

    // Vérifiez la quantité disponible
    if (quantity > produit.stock) {
      return res.status(400).json({ success: false, message: 'Quantité supérieure au stock disponible' });
    }

    // Vérifiez si l'utilisateur a déjà un panier
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Créez un nouveau panier si l'utilisateur n'en a pas encore
      cart = new Cart({
        user: userId,
        produits: [{ produit: produitId, quantity }],
        total: produit.prix * quantity,
      });
    } else {
      // Mettre à jour le panier existant
      const productIndex = cart.produits.findIndex(item => item.produit.toString() === produitId);

      if (productIndex >= 0) {
        // Si le produit existe déjà dans le panier, on met à jour la quantité
        cart.produits[productIndex].quantity += quantity;
      } else {
        // Sinon, on ajoute le produit au panier
        cart.produits.push({ produit: produitId, quantity });
      }

      // Recalculer le total
      cart.total = cart.produits.reduce((acc, item) => {
        return acc + (produit.prix * item.quantity);
      }, 0);
    }

    // Sauvegarder le panier
    await cart.save();

    res.status(200).json({ success: true, message: 'Produit ajouté au panier', cart });
  } catch (error) {
    console.error('Erreur interne:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'ajout au panier' });
  }
};



// Fonction pour supprimer un produit du panier
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  console.log(userId);
  console.log(productId);
  
  try {
    // Trouver le panier de l'utilisateur
    const cart = await Cart.findOne({ user: userId }).populate("produits.produit");

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Panier non trouvé' });
    }

    // Trouver l'index du produit dans le panier
    const productIndex = cart.produits.findIndex(item => item.produit._id.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({ success: false, message: 'Produit non trouvé dans le panier' });
    }

    // Supprimer le produit du panier
    cart.produits.splice(productIndex, 1);

    // Recalculer le total du panier
    cart.total = cart.produits.reduce((acc, item) => {
      return acc + (item.produit.prix * item.quantity);
    }, 0);

    // Enregistrer le panier mis à jour
    await cart.save();

    res.status(200).json({ success: true, message: 'Produit supprimé du panier', cart });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression du produit' });
  }
};

// Fonction pour récupérer le panier d'un utilisateur
export const getCart = async (req, res) => {
  const { userId } = req.body;
  
  // Vérifier si le userId est fourni dans le corps de la requête
  if (!userId) {
    return res.status(400).json({ success: false, message: 'userId est requis.' });
  }

  try {
    // Trouver le panier de l'utilisateur et peupler les informations des produits
    const cart = await Cart.findOne({ user: userId })
      .populate({
        path: 'produits.produit',   // Populate les produits du panier
        select: 'nom prix image',    // Sélectionne les champs que vous souhaitez peupler
      });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Panier non trouvé' });
    }

    // Retourner le panier
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération du panier' });
  }
};
// Fonction pour vider le panier d'un utilisateur
export const emptyCart = async (req, res) => {
  const { userId } = req.body;

  try {
    // Trouver le panier de l'utilisateur
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Panier non trouvé' });
    }

    // Vider le panier
    cart.produits = [];
    cart.total = 0;

    // Sauvegarder le panier vide
    await cart.save();

    res.status(200).json({ success: true, message: 'Panier vidé avec succès', cart });
  } catch (error) {
    console.error('Erreur lors du vidage du panier:', error);
    res.status(500).json({ success: false, message: 'Erreur lors du vidage du panier' });
  }
};
