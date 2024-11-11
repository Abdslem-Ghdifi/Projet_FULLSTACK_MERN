import './seConnceter.css';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const SeConnecter = () => {
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState(''); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`/api/v1/auth/loginUser`, 
        { email, motdepasse }, 
        { headers: { 'Content-Type': 'application/json' } }   
      );

      if (response.data.success) {
        toast.success(response.data.message);
        
        // Get the token from the response
        const token = response.data.token; // Assuming the token is sent in the response
console.log(token)
        // Store token in local storage
       localStorage.setItem('token', token);
        
        // Store user data in local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Navigation vers la page d'accueil
        navigate('/userAcceuil');
      } else {
        toast.error(response.data.message || 'Erreur lors de la connexion');
      }
    } catch (error) {
      if (error.response) {
        // If the server response is not 2xx
        toast.error(error.response.data.message || 'Erreur lors de la connexion');
      } else if (error.request) {
        // If no response was received
        toast.error('Pas de réponse du serveur');
      } else {
        // Error in request setup
        toast.error('Erreur lors de la requête');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Navigate to the forgot password page
  };
  console.log(localStorage.getItem('token'))

  return (
    <div id='seconnceter'>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr key="email-row">
              <td>
                <input
                  type="email"
                  placeholder="Taper votre Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr key="password-row">
              <td>
                <input
                  type="password"
                  placeholder="Taper votre mot de passe"
                  value={motdepasse}
                  onChange={(e) => setMotdepasse(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr key="submit-row">
              <td>
                <input
                  type="submit"
                  value={loading ? 'Connecting...' : 'Se connecter'}
                  id='btc'
                  disabled={loading}
                />
              </td>
            </tr>
            <tr key="forgot-password-row">
              <td>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  id="forgot-password-btn"
                >
                  Forgot Password?
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <ToastContainer />
      </form>
    </div>
  );
};

export default SeConnecter;
