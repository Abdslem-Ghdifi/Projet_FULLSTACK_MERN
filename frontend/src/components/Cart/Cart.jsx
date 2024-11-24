import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/Footer';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(null);  // État pour le panier
  const [userName, setUserName] = useState(null);  // État pour le nom de l'utilisateur
  const [userId, setUserId] = useState(null);  // État pour l'ID de l'utilisateur
  const navigate = useNavigate();  // Pour la navigation

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('/api/v1/auth/fetchUser', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setUserId(response.data.user._id);
          setUserName(response.data.user.prenom);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;

      try {
        const item = { userId };

        const response = await axios.post(
          'http://localhost:8084/api/v1/auth/getCart',
          item,
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.data.success) {
          setCart(response.data.cart);
        } else {
          console.error('Erreur lors de la récupération du panier');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du panier', error);
      }
    };

    fetchCart();
  }, [userId]);

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.post(
        'http://localhost:8084/api/v1/auth/cartRemove',
        { userId, productId },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        setCart(response.data.cart);
      } else {
        console.error('Erreur lors de la suppression du produit:', response.data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
    }
  };

  const handleConfirmOrder = async () => {
    if (!cart || cart.produits.length === 0) {
      alert('Votre panier est vide. Vous ne pouvez pas passer commande.');
      return;
    }

    try {
      const commande = {
        acheteurId: userId,
        produits: cart.produits.map((item) => ({
          produit: item.produit._id,
          quantite: item.quantity,
        })),
      };

      const commandesParVendeur = {};

      commande.produits.forEach((item) => {
        const vendeurId = item.produit.vendeur;

        if (!vendeurId) {
          console.error('Produit sans vendeur:', item.produit);
          return;
        }

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

      const response = await axios.post(
        'http://localhost:8084/api/v1/auth/createCommande',
        {
          acheteurId: userId,
          produits: Object.values(commandesParVendeur),
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success) {
        alert('Commande confirmée avec succès !');
        await axios.post(
          'http://localhost:8084/api/v1/auth/emptyCart',
          { userId },
          { headers: { 'Content-Type': 'application/json' } }
        );

        setCart(null);
        localStorage.setItem('invoiceData', JSON.stringify(response.data.commande));

        navigate('/facture');
      } else {
        console.error('Erreur API:', response.data.message);
        alert('Erreur lors de la confirmation de la commande: ' + response.data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la confirmation de la commande:', error);
    }
  };

  return (
    <div className="cart-container">
      <Navbar />
      <h2>Votre Panier</h2>
      {cart ? (
        <div className="cart-content">
          <ul className="cart-items">
            {cart.produits.map((item) => (
              <li key={item.produit._id} className="cart-item">
                <div className="cart-item-details">
                  <img src={item.produit.image} alt={item.produit.nom} className="product-image" />
                  <div className="item-info">
                    <p className="product-name">{item.produit.nom}</p>
                    <p className="product-price">{item.produit.prix} €</p>
                    <p className="product-quantity">Quantité: {item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.produit._id)} className="remove-btn">Supprimer</button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="total-price">Total: {cart.total} €</h3>
          <button onClick={handleConfirmOrder} className="confirm-order-btn">Confirmer la commande</button>
        </div>
      ) : (
        <p className="empty-cart">Votre panier est vide.</p>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
