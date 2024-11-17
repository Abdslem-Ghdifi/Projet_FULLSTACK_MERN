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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/v1/auth/loginUser`,
        { email, motdepasse },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/userAcceuil');
      } else {
        toast.error(response.data.message || 'Erreur lors de la connexion');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Erreur lors de la connexion');
      } else if (error.request) {
        toast.error('Pas de réponse du serveur');
      } else {
        toast.error('Erreur lors de la requête');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div id="seconnceter" className="d-flex align-items-center justify-content-center">
      <div className="content-wrapper d-flex">
        <div className="text-container">
          <h1 className="display-4 text-success">Bienvenue au GreenStore!</h1>
          <p className="lead">Connectez-vous pour accéder à votre compte et explorer les fonctionnalités.</p>
          <p className="text-muted"><a href="#" onClick={handleForgotPassword} className="text-success text-decoration-none">Vous avez oublié votre mot de passe ?</a> Cliquez ici pour le récupérer.</p>
        </div>
        <form onSubmit={handleSubmit} className="form-container">
          <h2 className="text-center text-success mb-4">Se Connecter</h2>
          <div className="form-group mb-3">
            <input type="email" className="form-control" placeholder="Taper votre Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group mb-3">
            <input type="password" className="form-control" placeholder="Taper votre mot de passe" value={motdepasse} onChange={(e) => setMotdepasse(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-success w-50 mb-3" disabled={loading}>{loading ? 'Connecting...' : 'Se connecter'}</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SeConnecter;
