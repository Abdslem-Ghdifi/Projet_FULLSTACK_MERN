import React, { useState } from 'react';
import './Menu.css';

const MenuProduit = () => {
  const [activeMenu, setActiveMenu] = useState("Déposer un produit");

  return (
    <div className='menu'>
      <ul className="menu-list">
        <li onClick={() => setActiveMenu("Déposer un produit")} className={activeMenu === "Déposer un produit" ? "active" : ""}>
          Déposer un produit
        </li>
        <li onClick={() => setActiveMenu("Afficher liste des produits")} className={activeMenu === "Afficher liste des produits" ? "active" : ""}>
          Afficher liste des produits
        </li>
        <li onClick={() => setActiveMenu("Voir les commandes")} className={activeMenu === "Voir les commandes" ? "active" : ""}>
          Voir les commandes
        </li>
      </ul>
    </div>
  );
}

export default MenuProduit;
