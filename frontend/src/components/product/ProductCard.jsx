import React from 'react';

const ProductCard = ({ produit, addToCart }) => {
  if (!produit) {
    return <p>Product not found</p>; // Handle undefined produit
  }

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
