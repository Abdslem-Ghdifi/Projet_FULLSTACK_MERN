import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Profil.css';
import Footer from '../footer/Footer';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

const ProfilUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) {
        navigate('/login'); // Redirect if no token is available
        return;
      }
      
      try {
        const response = await axios.get('/api/v1/auth/fetchUser', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in Authorization header
          },
        });
  
        if (response.data.success) {
          setUser(response.data.user); // Update user information
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle the error (e.g., show a notification)
      } finally {
        setLoading(false); // Stop loading, even on error
      }
    };
  
    fetchUserData();
  }, [navigate]);

  // Load user data from local storage if not already available
  useEffect(() => {
    if (!user && !loading) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    }
  }, [user, loading]);

  return (
    <div className="profil-container">
      <Navbar />
      <h2>My Profile</h2>

      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div className="profil-content">
          <div className="profil-image-container">
            <img
              src={user.imageProfil}
              alt="User Profile"
              className="profil-image"
            />
          </div>

          <table className="profil-info-table">
            <tbody>
              <tr>
                <td><strong>Last Name:</strong></td>
                <td>{user.nom}</td>
              </tr>
              <tr>
                <td><strong>First Name:</strong></td>
                <td>{user.prenom}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td><strong>CIN:</strong></td>
                <td>{user.cin}</td>
              </tr>
              <tr>
                <td><strong>Date of Birth:</strong></td>
                <td>{user.dateNais}</td>
              </tr>
              <tr>
                <td><strong>Phone:</strong></td>
                <td>{user.tel}</td>
              </tr>
              <tr>
                <td><strong>Address:</strong></td>
                <td>{user.adresse}</td>
              </tr>
            </tbody>
          </table>

          <button
            className="edit-button"
            onClick={() => navigate('/ModifierProfil', { state: { user } })}
          >
            Edit Information
          </button>
        </div>
      ) : (
        <p>No user information available</p>
      )}
      <Footer />
    </div>
  );
};

export default ProfilUser;
