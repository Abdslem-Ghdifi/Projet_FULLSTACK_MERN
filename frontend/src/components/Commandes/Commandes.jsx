import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/Footer';
import './Commandes.css';

const Commande = () => {
  const [commandes, setCommandes] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const fetchCommandes = async () => {
      if (!user) return;

      try {
        const response = await axios.post(
          'http://localhost:8084/api/v1/auth/getCommandes',
          { userId: user._id },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.data.success) {
          setCommandes(response.data.commandes);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes', error);
      }
    };

    fetchCommandes();
  }, [user]);

  return (
    <div className="commande-container">
      <Navbar />
      <h2>Mes Commandes</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : commandes.length > 0 ? (
        <table className="commande-table">
          <thead>
            <tr>
              <th>ID Commande</th>
              
              <th>Date</th>
              <th>Vendeur</th>
              <th>Total</th>
              <th>Image</th> {/* Nouvelle colonne pour l'image */}
            </tr>
          </thead>
          <tbody>
            {commandes.map((commande) => (
              <tr key={commande._id}>
                <td>{commande._id}</td>
                
                <td>{new Date(commande.dateCommande).toLocaleDateString()}</td>
                <td>{commande.vendeurId.prenom} {commande.vendeurId.nom}</td>
                <td>{commande.total} €</td>
                <td>
                  {commande.produits && commande.produits.length > 0 ? (
                    <img
                      src={commande.produits[0].produitId.image[0]} // Première image du produit
                      alt={commande.produits[0].produitId.nom}
                      className="commande-product-image"
                    />
                  ) : (
                    <span>Aucune image</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucune commande trouvée.</p>
      )}
      <Footer />
    </div>
  );
};

export default Commande;
