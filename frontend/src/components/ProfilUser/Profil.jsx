import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Profil.css';
import Footer from '../footer/Footer';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

const ProfilUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) {
        navigate('/login'); // Redirige si aucun token n'est disponible
        return;
      }
      
      try {
        const response = await axios.get('/api/v1/auth/fetchUser', {
          headers: {
            'Authorization': `Bearer ${token}`, // Inclure le token dans l'en-tête Authorization
          },
        });
  
        if (response.data.success) {
          setUser(response.data.user); // Mettre à jour les informations utilisateur
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Gérer l'erreur (par exemple, afficher une notification)
      } finally {
        setLoading(false); // Arrêter le chargement, même en cas d'erreur
      }
    };
  
    fetchUserData();
  }, [navigate]);

  // Charger les données utilisateur à partir du stockage local si elles ne sont pas déjà disponibles
  useEffect(() => {
    if (!user && !loading) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    }
  }, [user, loading]);

  return (
    <div className="profil-container">
      <Navbar />
      <h2>Mon Profil</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : user ? (
        <div className="profil-content">
          <div className="profil-image-container">
            <img
              src={user.imageProfil}
              alt="Profil utilisateur"
              className="profil-image"
            />
          </div>

          <table className="profil-info-table">
            <tbody>
              <tr>
                <td><strong>Nom:</strong></td>
                <td>{user.nom}</td>
              </tr>
              <tr>
                <td><strong>Prénom:</strong></td>
                <td>{user.prenom}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td><strong>CIN:</strong></td>
                <td>{user.cin}</td>
              </tr>
              <tr>
                <td><strong>Date de Naissance:</strong></td>
                <td>{user.dateNais}</td>
              </tr>
              <tr>
                <td><strong>Téléphone:</strong></td>
                <td>{user.tel}</td>
              </tr>
              <tr>
                <td><strong>Adresse:</strong></td>
                <td>{user.adresse}</td>
              </tr>
            </tbody>
          </table>

          <button
            className="edit-button"
            onClick={() => navigate('/ModifierProfil', { state: { user } })}
          >
            Modifier les informations
          </button>
        </div>
      ) : (
        <p>Aucune information utilisateur disponible</p>
      )}
      <Footer />
    </div>
  );
};

export default ProfilUser;
