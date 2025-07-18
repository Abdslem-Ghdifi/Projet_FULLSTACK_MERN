import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './forgotPassword.css'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(`/api/v1/auth/forgotpassword`, { email }, {
        headers: { 'Content-Type': 'application/json' }
      // Check headers being sent

      });
      console.log(document.cookie) // Check for large cookies
      console.log(response.headers)

      if (response.data.success) {
        toast.success('Email de réinitialisation envoyé avec succès.');
      } else {
        toast.error(response.data.message || 'Erreur lors de l\'envoi de l\'email.');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Erreur lors de l\'envoi de l\'email.');
      } else if (error.request) {
        toast.error('Pas de réponse du serveur.');
      } else {
        toast.error('Erreur lors de la requête.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='forgot-password'>
      <form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Envoi en cours...' : 'Envoyer'}
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default ForgotPassword;
