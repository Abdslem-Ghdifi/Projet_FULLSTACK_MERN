import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'; 
import Footer from '../footer/Footer'; 
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userId, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('/api/v1/auth/fetchUser', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.data.success) {
          
          setUser(response.data.user._id);
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
      try {
        const item = {
          userId: userId, // Envoyer userId dans item
        };

        const response = await axios.post(
          `http://localhost:8084/api/v1/auth/getCart`, 
          item,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        
        if (response.data.success) {
          setCart(response.data.cart); 
          setUserName(response.data.cart.user.name); 
        } else {
          console.error('Erreur lors de la récupération du panier');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du panier', error);
      }
    };

    if (userId) fetchCart();
  }, [userId]);

  const handleRemoveFromCart = async (produitId) => {

    try {
      
      const d = {
        userId : userId ,
        productId: produitId
      }
      const response = await axios.post('http://localhost:8084/api/v1/auth/cartRemove', d,{
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.data.success) {
        setCart(response.data.cart); // Mise à jour du panier après suppression
      } else {
        console.error('Erreur lors de la suppression du produit');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du produit', error);
    }
  };

  const handleConfirmOrder = () => {
    alert('Commande confirmée !');
  };

  if (!cart) {
    return <div>Chargement du panier...</div>;
  }

  return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-container">
        <h2>Voici votre panier {userName} : </h2>
        {cart.produits.length === 0 ? (
          <p>Votre panier est vide</p>
        ) : (
          <div className="cart-items">
            {cart.produits.map((item) => (
              <div key={item.produit._id} className="cart-item">
                <img src={item.produit.image} alt={item.produit.nom} />
                <h3>{item.produit.nom}</h3>
                <p>Quantité: {item.quantity}</p>
                <p>Prix: {item.produit.prix} €</p>
                <button onClick={() => handleRemoveFromCart(item.produit._id)}>
                  Supprimer du panier
                </button>
              </div>
            ))}
            <div className="total">
              <p>Total: {cart.total} €</p>
            </div>
            <button onClick={handleConfirmOrder} className="confirm-button">
              Confirmer la commande
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
