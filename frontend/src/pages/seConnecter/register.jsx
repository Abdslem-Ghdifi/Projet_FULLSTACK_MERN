import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; 
import './register.css';  // Assurez-vous d'ajouter votre fichier CSS
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [cin, setCin] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNais, setDateNais] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [adresse, setAdresse] = useState('');
  const [imageProfil, setImageProfil] = useState(null); // État pour l'image de profil
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Créer un objet FormData pour envoyer les données
    const formData = new FormData();
    formData.append('cin', cin);
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    formData.append('dateNais', dateNais);
    formData.append('tel', tel);
    formData.append('email', email);
    formData.append('motdepasse', motdepasse);
    formData.append('adresse', adresse);

    // Si aucune image n'est téléchargée, utiliser l'image par défaut
    if (imageProfil) {
      formData.append('imageProfil', imageProfil);
    } else {
      // Remplacer par l'URL de l'image par défaut
      formData.append('imageProfil', '../../assets/profil.jpg'); // Remplace par le chemin de ton image par défaut
    }

    try {
      const response = await axios.post(`/api/v1/auth/RegisterUser`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success(response.data.message || 'Inscription réussie');
        navigate('/login');
      } else {
        toast.error(response.data.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      toast.error('Erreur lors de la requête');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='register'>
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>CIN:</label>
          <input type="number" value={cin} onChange={(e) => setCin(e.target.value)} required />
        </div>
        <div>
          <label>Nom:</label>
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>
        <div>
          <label>Prénom:</label>
          <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
        </div>
        <div>
          <label>Date de Naissance:</label>
          <input type="date" value={dateNais} onChange={(e) => setDateNais(e.target.value)} required />
        </div>
        <div>
          <label>Téléphone:</label>
          <input type="number" value={tel} onChange={(e) => setTel(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Mot de Passe:</label>
          <input type="password" value={motdepasse} onChange={(e) => setMotdepasse(e.target.value)} required />
        </div>
        <div>
          <label>Adresse:</label>
          <input type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} required />
        </div>
        <div>
          <label>Image de Profil:</label>
          <input type="file" accept="image/*" onChange={(e) => setImageProfil(e.target.files[0])} />
        </div>
        <div>
          <input type="submit" value={loading ? 'Inscription...' : 'S\'inscrire'} disabled={loading} />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
