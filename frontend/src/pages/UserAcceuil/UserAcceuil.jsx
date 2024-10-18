import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import MenuProduit from '../../components/MenuProduit/Menu';
import ProfilUser from '../../components/ProfilUser/Profil';
import './UserAcceuil.css';
import Product from '../../components/product/Products'
import Footer  from '../../components/footer/Footer';

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
       
      
            <div>
              <Product/>
            </div>
          
        </div>

        {/* Menu à droite */}
        <div className="menuDroite">
          <MenuProduit />
        </div>
      </div>
      <Footer/>
    </div>
  );
};


export default UserAcceuil;
