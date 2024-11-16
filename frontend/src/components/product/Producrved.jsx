import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios'; 
import Navbar from '../Navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { useNavigate } from 'react-router-dom';

const Producrved = () => {
  const [user, setUser ] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchUserData = async () => {
  
      const token = localStorage.getItem('token'); 
     
    
      if (!token) {
        navigate('/login'); 
        return;
      }

      try {
        const response = await axios.get('/api/v1/auth/fetchUser', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUser(response.data.user); 
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  
  }, [navigate, user, setUser, loading]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user || !user._id) {
        console.error("User is not defined");
        console.log('ena mawjoud1')
        return;
      }
      console.log(`${user._id}`)
      try {
        const response = await axios.get(`/api/v1/auth/getProduitsByVendeur/${user._id}`);
        console.log(`${user._id}`)
        const data = response.data; 
        console.log("Fetched Products:", data);

        if (Array.isArray(data.produits)) {
          setProducts(data.produits); 
        
        } else {
          console.error("Unexpected data format:", data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    if (user && user._id) {
      fetchProducts();
    }
  }, [user]);

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
            <div className="col-md-4" key={produit.id_p || produit._id}>
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
