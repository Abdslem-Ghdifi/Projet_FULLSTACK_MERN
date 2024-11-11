import images from '../../assets/assets';
import './Navbar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState('Accueil');

  const handleNavigation = (route, menuName) => {
    setMenu(menuName);
    navigate(route);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
      case 'Déposer un produit':
        handleNavigation('/DeposerArticle', 'Déposer un produit');
        break;
      case 'Afficher liste des produits':
        handleNavigation('/Producrved', 'Afficher liste des produits');
        break;
      case 'Voir les commandes':
        handleNavigation('/commandes', 'Voir les commandes');
        break;
      default:
        break;
    }
  };

  return (
    <div className="navbar">
      <img src={images.logoWhite} alt="Logo" className="logo" />

      {/* Menu */}
      <ul className="navbar-menu">
        <li
          onClick={() => handleNavigation('/userAcceuil', 'Accueil')}
          className={menu === 'Accueil' ? 'active' : ''}
        >
          Accueil
        </li>
        <li
          onClick={() => handleNavigation('/commande', 'Commande')}
          className={menu === 'Commande' ? 'active' : ''}
        >
          Commande
        </li>
        <li
          onClick={() => handleNavigation('/categorie', 'Catégorie')}
          className={menu === 'Catégorie' ? 'active' : ''}
        >
          Catégorie
        </li>
        <li
          onClick={() => handleNavigation('/contact', 'Contact admin')}
          className={menu === 'Contact admin' ? 'active' : ''}
        >
          Contact admin
        </li>
        <li
          onClick={() => handleNavigation('/profil', 'Profil')}
          className={menu === 'Profil' ? 'active' : ''}
        >
          Profil
        </li>
      </ul>

      {/* Right side of Navbar */}
      <div className="navbar-right">
        <select className="dropdown-select" onChange={handleSelectChange}>
          <option value="">Select an option</option>
          <option value="Déposer un produit">Déposer un produit</option>
          <option value="Afficher liste des produits">Afficher liste des produits</option>
          <option value="Voir les commandes">Voir les commandes</option>
        </select>
        <img src={images.iconSearch} className="icon" alt="Search Icon" />
        <div className="navbar-search-icon" onClick={handleCartClick}>
          <img src={images.iconBasket} className="icon" alt="Basket Icon" />
          <div className="dot"></div>
        </div>
      
        <button className="btn">Déconnecter</button>
      </div>
    </div>
  );
};

export default Navbar;
