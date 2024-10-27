import images from '../../assets/assets';
import './Navbar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState('Accueil');

  const handleNavigation = (route, menuName) => {
    setMenu(menuName);
    navigate(route, { state: { user } });
    console.log(user);
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
        <img src={images.iconSearch} className="icon" alt="Search Icon" />
        <div className="navbar-search-icon">
          <img src={images.iconBasket} className="icon" alt="Basket Icon" />
          <div className="dot"></div>
        </div>
        <button>Déconnecter</button>
      </div>
    </div>
  );
};

export default Navbar;
