import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './DeposerArticle.css'; // Assurez-vous d'ajouter votre fichier CSS
import { useNavigate } from 'react-router-dom';

const AjouterProduit = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [categorie, setCategorie] = useState('materiel');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(''); // État pour l'image du produit
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Création de l'objet produit à envoyer
    const produitData = {
      nom,
      description,
      prix,
      categorie,
      stock,
      image: image ? image : '', // Image par défaut si aucune image n'est sélectionnée
    };

    try {
      const response = await axios.post('/api/v1/auth/createProduit', produitData, {
        headers: {
          'Content-Type': 'application/json', // Spécifier le type JSON
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/userAcceuil'); // Rediriger vers la page des produits après l'ajout
      } else {
        toast.error(response.data.message || 'Erreur lors de l\'ajout du produit');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error);
      toast.error('Erreur lors de la requête');
    } finally {
      setLoading(false);
    }
  };

  const handleImg = (e) => {
    const file = e.target.files[0];
    setLoading(true);
    imageUpload(file)
      .then((url) => {
        toast.dismiss();
        toast.success("Image uploaded successfully.");
        setImage(url);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Error while uploading your image...");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div id='ajouter-produit'>
      <h2>Ajouter un Produit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Prix:</label>
          <input type="number" value={prix} onChange={(e) => setPrix(e.target.value)} required />
        </div>
        <div>
          <label>Catégorie:</label>
          <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
            <option value="materiel">Matériel</option>
            <option value="produit pour les animaux">Produit pour les Animaux</option>
            <option value="produit pour les plantes">Produit pour les Plantes</option>
          </select>
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImg}
          />
        </div>
        <div>
          <input type="submit" value={loading ? 'Ajout...' : 'Ajouter le Produit'} disabled={loading} />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AjouterProduit;

const imageUpload = async (file) => {
  const formData = new FormData();
  if (file) {
    formData.append("image", file);
  }
  try {
    const response = await axios.post("http://localhost:8084/api/v1/auth/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.secure_url; // Assurez-vous que votre API retourne l'URL de l'image
  } catch (error) {
    toast.error("An error occurred during image upload");
    throw error; // Pour que le catch dans handleImg fonctionne
  }
};
