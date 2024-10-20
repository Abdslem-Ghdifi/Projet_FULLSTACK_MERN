import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; 

const UpdateProductModal = ({ isOpen, onRequestClose, produit, onUpdate }) => {
  // Initialize state for product fields
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState(0);
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [categorie, setCategorie] = useState('');

  // Effect to set the state when the modal opens
  useEffect(() => {
    if (produit) {
      setNom(produit.nom);
      setPrix(produit.prix);
      setDescription(produit.description);
      setStock(produit.stock);
      setCategorie(produit.categorie);
    }
  }, [produit, isOpen]); // Reset state when produit changes or modal opens

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass all updated fields to parent
    onUpdate(produit.id_p, { nom, prix, description, stock, categorie });
    onRequestClose(); // Close the modal
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={prix}
            onChange={(e) => setPrix(Number(e.target.value))} // Ensure price is a number
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))} // Ensure stock is a number
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            required
          >
            <option value="materiel">Materiel</option>
            <option value="produit pour les animaux">Produit pour les animaux</option>
            <option value="produit pour les plantes">Produit pour les plantes</option>
          </select>
        </div>
        <button type="submit">Update</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default UpdateProductModal;
