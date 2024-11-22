import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../../components/footer/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Producrved.css'; // Styling file

const Producrved = () => {
  const [user, setUser] = useState(null); // User data
  const [products, setProducts] = useState([]); // List of products
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('/api/v1/auth/fetchUser', {
          headers: { Authorization: `Bearer ${token}` },
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
  }, [navigate]);

  // Fetch user's products
  useEffect(() => {
    const fetchProducts = async () => {
      if (!user || !user._id) return;

      try {
        const response = await axios.get(`/api/v1/auth/getProduitsByVendeur/${user._id}`);
        const data = response.data;

        if (Array.isArray(data.produits)) {
          setProducts(data.produits);
        } else {
          console.error('Unexpected data format:', data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    if (user && user._id) fetchProducts();
  }, [user]);

  // Delete a product
  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await axios.delete(`/api/v1/auth/deleteProduit/${productId}`);
      if (response.data.success) {
        setProducts(products.filter((product) => product._id !== productId));
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="products-container">
        <h2>Welcome, {user?.prenom || 'User'}! Here are your products:</h2>
        {products.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#555' }}>No products available.</p>
        ) : (
          <div className="product-items">
            {products.map((produit) => (
              <div key={produit._id || produit.id_p} className="product-item">
                <img src={produit.image} alt={produit.nom} className="product-image" />
                <h3>{produit.nom}</h3>
                <p>Price: {produit.prix} €</p>
                <p>Stock: {produit.stock}</p>
                <button
                  className="action-button"
                  onClick={() => navigate('/EditProduct', { state: { produit } })}
                >
                  Edit
                </button>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(produit._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Producrved;
