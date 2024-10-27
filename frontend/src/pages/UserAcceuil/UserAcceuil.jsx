import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import MenuProduit from '../../components/MenuProduit/Menu';
import './UserAcceuil.css';
import Product from '../../components/product/Products'
import Footer from '../../components/footer/Footer';

const UserAcceuil = () => {
  const location = useLocation();
  const { user } = location.state || {}; // Get user information from the location state

  return (
    <>
      <div>
        <Navbar user={user} /> {/* Pass user data as a prop */}
        <MenuProduit user={user}  />
        <div>
          <Product />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserAcceuil;
