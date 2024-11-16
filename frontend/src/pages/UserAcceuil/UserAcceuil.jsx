import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import MenuProduit from '../../components/MenuProduit/Menu';
import './UserAcceuil.css';
import Product from '../../components/product/Products'
import Footer from '../../components/footer/Footer';

const UserAcceuil = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term

  // Function to handle search term from Navbar
  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term state
  };

  const location = useLocation();
  const { user } = location.state || {}; // Get user information from the location state

  return (
    <>
      <div>
        <Navbar user={user} onSearch={handleSearch} /> {/* Pass user data as a prop */}
      
        <div>
          <Product searchTerm={searchTerm} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserAcceuil;
