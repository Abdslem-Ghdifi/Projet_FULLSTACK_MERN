import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/Footer';

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { produit } = location.state || {};

  // State initialization
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('materiel');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle missing product data
  useEffect(() => {
    if (!produit) {
      toast.error('No product data available to edit.');
      navigate('/products');
    } else {
      // Initialize state with product data
      setNom(produit.nom || '');
      setPrix(produit.prix || '');
      setStock(produit.stock || '');
      setDescription(produit.description || '');
      setCategorie(produit.categorie || 'materiel');
      setImagePreview(produit.image || null);
    }
  }, [produit, navigate]);

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('prix', prix);
      formData.append('stock', stock);
      formData.append('description', description);
      formData.append('categorie', categorie);
      if (image) formData.append('image', image);

      const response = await axios.put(`/api/v1/auth/updateProduit/${produit._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Product updated successfully!');
        navigate('/Producrved');
      } else {
        toast.error('Failed to update the product.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      if (error.response) {
        toast.error(error.response.data.message || 'Failed to update the product.');
      } else if (error.request) {
        toast.error('No response from the server. Check your connection.');
      } else {
        toast.error('Unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!produit) {
    return null; // Avoid rendering if redirect is in progress
  }

  return (
    <div>
      <Navbar />
      <div id="ajouter-produit">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div>
            <label>Nom:</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label>Prix:</label>
            <input
              type="number"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label>Catégorie:</label>
            <select
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              disabled={loading}
            >
              <option value="materiel">Matériel</option>
              <option value="produit pour les animaux">Produit pour les Animaux</option>
              <option value="produit pour les plantes">Produit pour les Plantes</option>
            </select>
          </div>
          <div>
            <label>Stock:</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label>Image:</label>
            <input type="file" accept="image/*" onChange={handleImg} disabled={loading} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected"
                style={{ maxWidth: '200px', marginTop: '10px' }}
              />
            )}
          </div>
          <div>
            <input type="submit" value={loading ? 'Updating...' : 'Update Product'} disabled={loading} />
          </div>
          <div>
            <button type="button" onClick={() => navigate('/Producrved')} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default EditProduct;
