import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios'; 
import Navbar from '../Navbar/Navbar';
import Footer from '../../components/footer/Footer';

const Producrved = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products from backend
  useEffect((user) => {
    console.log('poduct',user)
    const fetchProducts = async () => {
      if (!user || !user._id) { // Check if user or user._id is undefined
        console.error("User is not defined");
        return; // Exit if user is not defined
      }
      
      try {
        // Call the API to get products by vendor
        const response = await axios.get(`/api/v1/auth/getProduitsByVendeur/${user._id}`);
        const data = response.data; 
        console.log("Fetched Products:", data);
        setProducts(data.produits); 
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [user]); // Dependency array includes user to refetch if it changes

  // Function to add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log("Cart updated:", cart);
  };

  return (
    <div className="products-page container">
      <Navbar />
      <div className="row">
        {products.length > 0 ? (
          products.map((produit) => (
            <div className="col-md-4" key={produit.id_p}>
              <ProductCard produit={produit} addToCart={addToCart} />
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Producrved;
