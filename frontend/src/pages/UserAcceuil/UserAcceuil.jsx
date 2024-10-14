import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'
const UserAcceuil = () => {
  const location = useLocation();
  const { user } = location.state || {}; // Récupérer les informations de l'utilisateur
  
  
  return (
    <div>
        <Navbar></Navbar>
      <h1>Bienvenue, {user ? `${user.nom} ${user.prenom}` : 'Utilisateur'}</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>CIN: {user.cin}</p>
          <p></p>
          {/* Afficher d'autres informations si nécessaire */}
        </div>
      )}
    </div>
  );
};

export default UserAcceuil;
