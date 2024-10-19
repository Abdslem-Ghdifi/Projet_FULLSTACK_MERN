import React, { useState } from 'react';
import './Menu.css';
import { useLocation, useNavigate } from 'react-router-dom'; 

const MenuProduit = () => {
  const location = useLocation();
 
  const { user } = location.state || {};
  const [activeMenu, setActiveMenu] = useState("Déposer un produit");
  const navigate = useNavigate(); 

  const handleNavigation = (path, menuName) => {
    setActiveMenu(menuName);
    navigate(path, { state: { user } }); // Ajoute ici l'utilisateur
};


  return (
    <div className='menu'>
      <ul className="menu-list">
        <li 
          onClick={() => handleNavigation('/DeposerArticle',"Déposer un produit")} 
          className={activeMenu === "Déposer un produit" ? "active" : ""}
        >
          Déposer un produit
        </li>
        <li 
          onClick={() => handleNavigation('/liste-produits', "Afficher liste des produits")} 
          className={activeMenu === "Afficher liste des produits" ? "active" : ""}
        >
          Afficher liste des produits
        </li>
        <li 
          onClick={() => handleNavigation('/commandes', "Voir les commandes")} 
          className={activeMenu === "Voir les commandes" ? "active" : ""}
        >
          Voir les commandes
        </li>
      </ul>
    </div>
  );
}

export default MenuProduit;
