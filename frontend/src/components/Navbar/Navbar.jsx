import images from '../../assets/assets';
import './Navbar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, onSearch }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState('Home');
  const [showSearch, setShowSearch] = useState(false); // State to toggle search input visibility
  const [searchTerm, setSearchTerm] = useState(''); // State to store search term

  const handleNavigation = (route, menuName) => {
    setMenu(menuName);
    navigate(route);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term
    onSearch(e.target.value); // Pass the search term to parent (UserHome)
  };

  // Function to toggle the search input visibility
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
      case 'Post a product':
        handleNavigation('/DeposerArticle', 'Post a product');
        break;
      case 'Show product list':
        handleNavigation('/Producrved', 'Show product list');
        break;
      case 'View orders':
        handleNavigation('/commandes', 'View orders');
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
          onClick={() => handleNavigation('/userAcceuil', 'Home')}
          className={menu === 'Home' ? 'active' : ''}
        >
          Home
        </li>
        <li
          onClick={() => handleNavigation('/commandes', 'Orders')}
          className={menu === 'Orders' ? 'active' : ''}
        >
          Orders
        </li>
        <li
          onClick={() => handleNavigation('/categorie', 'Category')}
          className={menu === 'Category' ? 'active' : ''}
        >
          Category
        </li>
        <li
          onClick={() => handleNavigation('/contact', 'Contact Admin')}
          className={menu === 'Contact Admin' ? 'active' : ''}
        >
          Contact Admin
        </li>
        <li
          onClick={() => handleNavigation('/profil', 'Profile')}
          className={menu === 'Profile' ? 'active' : ''}
        >
          Profile
        </li>
      </ul>

      {/* Right side of Navbar */}
      <div className="navbar-right">
        <select className="dropdown-select" onChange={handleSelectChange}>
          <option value="">Select an option</option>
          <option value="Post a product">Post a product</option>
          <option value="Show product list">Show product list</option>
          <option value="View orders">View orders</option>
        </select>
        <img src={images.iconSearch} className="icon" alt="Search Icon" onClick={toggleSearch} />
        {showSearch && (
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="navbar-search-input"
          />
        )}
        <div className="navbar-search-icon" onClick={handleCartClick}>
          <img src={images.iconBasket} className="icon" alt="Basket Icon" />
          <div className="dot"></div>
        </div>
        <button className="btn">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
