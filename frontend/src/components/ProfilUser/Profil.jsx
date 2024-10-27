import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Profil.css';
import Footer from '../footer/Footer';
import Navbar from '../Navbar/Navbar';

const ProfilUser = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {}; // Récupérer les informations de l'utilisateur

  return (
    <div className="profil-container">
          <Navbar/>
      <h2>Mon Profil</h2>
    
      {user ? (
        <div className="profil-content">
          {/* Afficher l'image de profil */}
          <div className="profil-image-container">
            <img 
              src={user.imageProfil } 
              alt="Profil utilisateur" 
              className="profil-image" 
            />
          </div>

          {/* Tableau des informations utilisateur */}
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

          {/* Bouton pour modifier les informations */}
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
      <Footer/>
    </div>
  );
};

export default ProfilUser;
