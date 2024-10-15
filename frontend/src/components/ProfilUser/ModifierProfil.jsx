import './ModifierProfil.css';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; 
import Navbar from '../Navbar/Navbar';

const ModifierProfil = () => {
  const location = useLocation();
  const { user } = location.state || {}; // Récupérer les informations utilisateur
  const [nom, setNom] = useState(user.nom || '');
  const [prenom, setPrenom] = useState(user.prenom || '');
  const [email, setEmail] = useState(user.email || '');
  const [cin, setCin] = useState(user.cin || '');
  const [dateNais, setDateNais] = useState(user.dateNais || '');
  const [tel, setTel] = useState(user.tel || '');
  const [adresse, setAdresse] = useState(user.adresse || '');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
const returnA =()=>{
    navigate('/userAcceuil')
}
  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(`/api/v1/auth/updateUser`, 
        { nom, prenom, email, cin, dateNais, tel, adresse }, 
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success) {
        toast.success('Profil mis à jour avec succès');
        // Navigation vers la page d'accueil avec les nouvelles informations utilisateur
        navigate('/userAcceuil', { state: { user: response.data.user } });
      } else {
        toast.error(response.data.message || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Erreur lors de la mise à jour');
      } else if (error.request) {
        toast.error('Pas de réponse du serveur');
      } else {
        toast.error('Erreur lors de la requête');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Navbar></Navbar>
    <div id='modifier-profil'>

    
      <h2>Modifier Profil</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Prénom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="CIN"
                  value={cin}
                  onChange={(e) => setCin(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="date"
                  placeholder="Date de Naissance"
                  value={dateNais}
                  onChange={(e) => setDateNais(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Adresse"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="submit"
                  value={loading ? 'En cours...' : 'Mettre à jour'}
                  id='btc'
                  disabled={loading}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="submit"
                  value="Return"
                  id='btc'
                  onClick={returnA()}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <ToastContainer />
      </form>
    </div>
    </div>
  );
};

export default ModifierProfil;
