import './ResetPassword.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useParams(); // Get token from the URL
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`/api/v1/auth/reset-password/${token}`, { password });
      
      if (response.data.success) {
        toast.success('Mot de passe réinitialisé avec succès');
        navigate('/login');
      } else {
        toast.error('Échec de la réinitialisation du mot de passe');
      }
    } catch (error) {
      toast.error('Erreur lors de la réinitialisation du mot de passe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Réinitialiser le mot de passe</h2>
      <input
        type="password"
        placeholder="Entrez un nouveau mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Envoi en cours...' : 'Réinitialiser le mot de passe'}
      </button>
      <ToastContainer />
    </form>
  );
};

export default ResetPassword;
