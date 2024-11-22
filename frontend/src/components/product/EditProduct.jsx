import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/Footer';

const EditProduct = () => {
  const location = useLocation();
  const { produit } = location.state || {};
  const [nom, setNom] = useState(produit?.nom || '');
  const [prix, setPrix] = useState(produit?.prix || '');
  const [stock, setStock] = useState(produit?.stock || '');
  const [description, setDescription] = useState(produit?.description || '');
  const [categorie, setCategorie] = useState(produit?.categorie || 'materiel');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
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
        navigate('/products');
      } else {
        toast.error('Failed to update the product.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the product.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div id="ajouter-produit">
        <h2>Edit Product</h2>
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
            <input type="file" accept="image/*" onChange={handleImg} />
          </div>
          <div>
            <input type="submit" value={loading ? 'Updating...' : 'Update Product'} disabled={loading} />
          </div>
        </form>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default EditProduct;
