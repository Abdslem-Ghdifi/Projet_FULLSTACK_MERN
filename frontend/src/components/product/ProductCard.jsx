import React from 'react';

const ProductCard = ({ produit, addToCart }) => {

  if (!produit) {
    return <p>Product not found</p>; 
  }

  /*const handleUpdate = (id_p, updatedData) => {
    updateProduct(id_p, updatedData);
    setModalOpen(false); 
  };*/

  /*const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${produit.nom}"?`)) {
      deleteProduct(produit.id_p);
    }
  };*/

  return (
    <div className="card product-card m-2" style={{ width: '18rem' }}>
      <img 
        src={produit.image} 
        alt={produit.nom} 
        className="card-img-top" 
        style={{ height: '200px', objectFit: 'cover' }} 
      />
      <div className="card-body">
        <h5 className="card-title">{produit.nom}</h5>
        <p className="card-text">{produit.description}</p>
        <p className="card-text"><strong>Price:</strong> ${produit.prix}</p>
        <p className="card-text"><strong>Stock:</strong> {produit.stock}</p>
        <button 
          className="btn btn-primary" 
          onClick={() => addToCart(produit)}>
          Add to Panier
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

        /*<button 
          className="btn btn-secondary" 
          onClick={() => setModalOpen(true)}>
          Update
        </button>
        <button 
          className="btn btn-danger" 
          onClick={handleDelete}>
          Delete
        </button>*/
