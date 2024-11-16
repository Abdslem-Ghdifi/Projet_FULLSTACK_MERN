import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar'; 
import Footer from '../footer/Footer'; 
import axios from 'axios';

const Myproductcard = () => {
  const [user, setUser] = useState(null); // Corrected state initialization
  const [cart, setCart] = useState({ produits: [] }); // Added missing state for 'cart'
  const [loading, setLoading] = useState(true);

  /*
  const handleUpdate = (id_p, updatedData) => {
    updateProduct(id_p, updatedData);
    setModalOpen(false);
  };

  const handleDelete = (id_p) => { 
    if (window.confirm(`Are you sure you want to delete "${produit.nom}"?`)) {
      deleteProduct(id_p);
    }
  };
  */

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) {
        // Redirect if no token is available
        return;
      }
      
      try {
        const response = await axios.get('/api/v1/auth/fetchUser', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in Authorization header
          },
        });

        if (response.data.success) {
          setUser(response.data.user); // Update user information
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Stop loading, even in case of error
      }
    };

    fetchUserData();
  }, []); // Changed dependency array to [] to prevent unnecessary re-renders

  if (loading) return <p>Loading...</p>; // Display loading state while fetching data

  return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-container">
        <h2>Voici votre panier {user?.nom || ''}:</h2> {/* Safe access to user.nom */}
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
                <button /*onClick={() => handleDelete(item.produit._id)}*/>delete</button>
                <button /*onClick={() => handleUpdate(item.produit._id)}*/>update</button>
              </div>
            ))}
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Myproductcard;
