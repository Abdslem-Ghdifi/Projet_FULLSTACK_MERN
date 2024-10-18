import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DeposerArticle.css';

const DeposerArticle = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [categorie, setCategorie] = useState('matériel');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('prix', prix);
    formData.append('categorie', categorie);
    formData.append('stock', stock);
    formData.append('image', image);
    formData.append('vendeur', 'user_id'); // Remplace par l'ID de l'utilisateur connecté
    formData.append('dateCreation', new Date().toISOString());

    try {
      const response = await axios.post('/api/v1/createProduit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Article déposé avec succès!');
      } else {
        toast.error(response.data.message || 'Erreur lors du dépôt de l\'article');
      }
    } catch (error) {
      toast.error('Erreur lors de la soumission du formulaire');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="deposer-article">
      <h2>Déposer un Article</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom de l'article"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <textarea
          placeholder="Description de l'article"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Prix"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          required
        />
        <select
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
        >
          <option value="matériel">Matériel</option>
          <option value="produit pour les animaux">Produit pour les Animaux</option>
          <option value="produit pour les plantes">Produit pour les Plantes</option>
        </select>
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <input
          type="submit"
          value={loading ? 'En cours...' : 'Déposer l\'article'}
          disabled={loading}
        />
      </form>
      <ToastContainer />
    </div>
  );
};

export default DeposerArticle;
