import images from '../../assets/assets';
import './Navbar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate(); // Initialiser useNavigate
  const [menu, setMenu] = useState('Accueil'); // Initialisation à "Accueil"

  const handleNavigation = (route) => {
    setMenu(route); // Mettre à jour l'état du menu
    navigate(route); // Naviguer vers la route correspondante
  };

  return (
    <div className='navbar'>
      <img src={images.logoWhite} alt="Logo" className="logo" />
      
      {/* Menu */}
      <ul className="navbar-menu">
        <li 
          onClick={() => handleNavigation('/')} // Route pour Accueil
          className={menu === 'Accueil' ? 'active' : ''}
        >
          Accueil
        </li>
        <li 
          onClick={() => handleNavigation('/commande')} // Route pour Commande
          className={menu === 'Commande' ? 'active' : ''}
        >
          Commande
        </li>
        <li 
          onClick={() => handleNavigation('/categorie')} // Route pour Catégorie
          className={menu === 'Catégorie' ? 'active' : ''}
        >
          Catégorie
        </li>
        <li 
          onClick={() => handleNavigation('/contact')} // Route pour Contact admin
          className={menu === 'Contact admin' ? 'active' : ''}
        >
          Contact admin
        </li>
      </ul>

      {/* Right side of Navbar */}
      <div className="navbar-right">
        <img src={images.iconSearch} className="icon" alt="Search Icon" />
        <div className="navbar-search-icon">
          <img src={images.iconBasket} className="icon" alt="Basket Icon" />
          <div className="dot"></div>
        </div>
        <button>Déconnecter</button>
      </div>  
    </div>
  );
}

export default Navbar;
