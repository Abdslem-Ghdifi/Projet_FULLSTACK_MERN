import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import MenuProduit from '../../components/MenuProduit/Menu';
import './UserAcceuil.css';

const UserAcceuil = () => {
  const location = useLocation();
  const { user } = location.state || {}; // Récupérer les informations de l'utilisateur

  return (
    <div>
      <Navbar />
      <div className="app-container">
        <div className="content">
          <h1>Bienvenue, {user ? `${user.nom} ${user.prenom}` : 'Utilisateur'}</h1>
          {user && (
            <div>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>CIN:</strong> {user.cin}</p>
              {/* Afficher d'autres informations si nécessaire */}
            </div>
          )}
        </div>
        <div className="menuDroite">
          <MenuProduit />
        </div>
      </div>
    </div>
  );
};

export default UserAcceuil;
