import { useState } from 'react';
import './Menu.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Menu({ user }) {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('Post a Product'); // Default menu item
  const navigate = useNavigate();

  const handleNavigation = (path, menuName) => {
    setActiveMenu(menuName);
    navigate(path);
  };

  return (
    <ul className="menu-list">
      <li
        onClick={() => handleNavigation('/DeposerArticle', 'Post a Product')}
        className={activeMenu === 'Post a Product' ? 'active' : ''}
      >
        Post a Product
      </li>
      <li
        onClick={() => handleNavigation('/Producrved', 'View Product List')}
        className={activeMenu === 'View Product List' ? 'active' : ''}
      >
        View Product List
      </li>
      <li
        onClick={() => handleNavigation('/commandes', 'View Orders')}
        className={activeMenu === 'View Orders' ? 'active' : ''}
      >
        View Orders
      </li>
    </ul>
  );
}

export default Menu;
