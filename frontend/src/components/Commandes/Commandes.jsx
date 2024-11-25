import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/Footer';
import './Commandes.css';

const Commande = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
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
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const response = await axios.post(
          'http://localhost:8084/api/v1/auth/getCommandes',
          { userId: user._id },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.data.success) {
          setOrders(response.data.commandes);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="order-container">
      <Navbar />
      <h2>My Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length > 0 ? (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Seller</th>
              <th>Total</th>
              <th>Image</th> {/* New column for product image */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.dateCommande).toLocaleDateString()}</td>
                <td>{order.vendeurId.firstName} {order.vendeurId.lastName}</td>
                <td>{order.total} €</td>
                <td>
                  {order.products && order.products.length > 0 ? (
                    <img
                      src={order.products[0].productId.image[0]} // First image of the product
                      alt={order.products[0].productId.name}
                      className="order-product-image"
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
      <Footer />
    </div>
  );
};

export default Commande;
