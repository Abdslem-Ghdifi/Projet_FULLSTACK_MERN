import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/Footer';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(null); // State for the cart
  const [userName, setUserName] = useState(null); // State for the user's name
  const [userId, setUserId] = useState(null); // State for the user's ID
  const navigate = useNavigate(); // For navigation

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
          setUserId(response.data.user._id);
          setUserName(response.data.user.firstName);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;

      try {
        const item = { userId };

        const response = await axios.post(
          'http://localhost:8084/api/v1/auth/getCart',
          item,
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.data.success) {
          setCart(response.data.cart);
        } else {
          console.error('Error fetching the cart');
        }
      } catch (error) {
        console.error('Error fetching the cart', error);
      }
    };

    fetchCart();
  }, [userId]);

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.post(
        'http://localhost:8084/api/v1/auth/cartRemove',
        { userId, productId },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        setCart(response.data.cart);
      } else {
        console.error('Error removing product:', response.data.message);
      }
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const handleConfirmOrder = async () => {
    if (!cart || cart.products.length === 0) {
      alert('Your cart is empty. You cannot place an order.');
      return;
    }

    try {
      const order = {
        buyerId: userId,
        products: cart.products.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          seller: item.product.seller,
          price: item.product.price,
        })),
      };

      const ordersBySeller = {};

      order.products.forEach((item) => {
        const sellerId = item.seller;
        if (!sellerId) {
          console.error('Product without seller:', item.product);
          return;
        }

        if (!ordersBySeller[sellerId]) {
          ordersBySeller[sellerId] = {
            sellerId: sellerId,
            product: [],
            total: 0,
          };
        }

        ordersBySeller[sellerId].product.push({
          productId: item.product,
          quantity: item.quantity,
        });

        ordersBySeller[sellerId].total += item.price * item.quantity;
      });

      const commands = Object.values(ordersBySeller);

      const response = await axios.post(
        'http://localhost:8084/api/v1/auth/createOrder',
        {
          buyerId: userId,
          commands: commands, // Renamed to match the backend's expected name
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success) {
        alert('Order confirmed successfully!');
        await axios.post(
          'http://localhost:8084/api/v1/auth/emptyCart',
          { userId },
          { headers: { 'Content-Type': 'application/json' } }
        );

        setCart(null);
        localStorage.setItem('invoiceData', JSON.stringify(commands));
        navigate('/invoice');
      } else {
        console.error('API Error:', response.data.message);
        alert('Error confirming the order: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error confirming the order:', error);
    }
  };

  return (
    <div className="cart-container">
      <Navbar />
      <h2>Your Cart</h2>
      {cart ? (
        <div className="cart-content">
          <ul className="cart-items">
            {cart.products.map((item) => (
              <li key={item.product._id} className="cart-item">
                <div className="cart-item-details">
                  <img src={item.product.image} alt={item.product.name} className="product-image" />
                  <div className="item-info">
                    <p className="product-name">{item.product.name}</p>
                    <p className="product-price">{item.product.price} €</p>
                    <p className="product-quantity">Quantity: {item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.product._id)} className="remove-btn">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="total-price">Total: {cart.total} €</h3>
          <button onClick={handleConfirmOrder} className="confirm-order-btn">Confirm Order</button>
        </div>
      ) : (
        <p className="empty-cart">Your cart is empty.</p>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
