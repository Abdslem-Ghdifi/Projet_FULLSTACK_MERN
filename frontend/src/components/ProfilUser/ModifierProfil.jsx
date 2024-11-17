import './ModifierProfil.css';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/Footer';


const ModifierProfil = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const [nom, setNom] = useState(user.nom || '');
  const [prenom, setPrenom] = useState(user.prenom || '');
  const [email, setEmail] = useState(user.email || '');
  const [cin, setCin] = useState(user.cin || '');
  const [dateNais, setDateNais] = useState(user.dateNais || '');
  const [tel, setTel] = useState(user.tel || '');
  const [adresse, setAdresse] = useState(user.adresse || '');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      <Navbar />
      <div id="modifier-profil" className="container mt-2 mb-2">
        <div className="card shadow">
          <div className="card-header bg-success text-white text-center">
            <h3>Modifier Profil</h3>
          </div>
          <div >
            <form onSubmit={handleSubmit}>
              <div className="row mb-2">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Prénom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="CIN"
                    value={cin}
                    onChange={(e) => setCin(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
              </div>
              <div className="row mb-2">
              
                <div className="col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Date de Naissance"
                    value={dateNais}
                    onChange={(e) => setDateNais(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Téléphone"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Adresse"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button
                  type="submit" className="btn btn-success h-50 w-100 py-2" disabled={loading}>
                  {loading ? 'En cours...' : 'Mettre à jour'}
                </button>
                <button
                  type="button" className="btn btn-success h-50 w-100 py-2" onClick={() => navigate('/userAcceuil')}
                >
                  Retour
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
      <div><Footer /></div>
      

    </div>
    
  );
};

export default ModifierProfil;
