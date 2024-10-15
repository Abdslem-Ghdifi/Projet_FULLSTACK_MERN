import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import MenuProduit from '../../components/MenuProduit/Menu';
import ProfilUser from '../../components/ProfilUser/Profil';
import './UserAcceuil.css';

const UserAcceuil = () => {
  const location = useLocation();
  const { user } = location.state || {}; // Récupérer les informations de l'utilisateur

  return (
    <div>
      <Navbar />

      <div className="app-container">
        {/* Menu à gauche */}
        <div className="menuGauche">
          <ProfilUser />
        </div>

        {/* Contenu principal */}
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

        {/* Menu à droite */}
        <div className="menuDroite">
          <MenuProduit />
        </div>
      </div>
    </div>
  );
};

export default UserAcceuil;
