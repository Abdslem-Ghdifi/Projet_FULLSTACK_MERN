import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUser] = useState(null);
  const navigate = useNavigate();

  // Récupérer les données de l'utilisateur
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('/api/v1/auth/fetchUser', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.data.success) {
          setUser(response.data.user._id);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Récupérer les produits
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8084/api/v1/auth/getProduits');
        setProducts(response.data.produits);
        setLoading(false);
      } catch (error) {
        setError("Échec de la récupération des produits. Veuillez réessayer.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

   // Filter products based on search term
   const filteredProducts = products.filter(product => 
    product.nom.toLowerCase().includes(searchTerm.toLowerCase()) // Case insensitive search
  );

  // Ajouter un produit au panier
  const addToCart = (product) => {
    if (!userId) {
      toast.error("Utilisateur non authentifié. Veuillez vous connecter.");
      return;
    }

    // Demander à l'utilisateur la quantité via un prompt
    const quantity = prompt(`Indiquez la quantité pour ${product.nom} (Stock disponible : ${product.stock})`);
    const qty = parseInt(quantity);

    // Vérification de la validité de la quantité
    if (isNaN(qty) || qty <= 0) {
      toast.error("Quantité invalide. Veuillez entrer une quantité positive.");
      return;
    } else if (qty > product.stock) {
      toast.error("Quantité supérieure au stock disponible.");
      return;
    }

    const cartItem = {
      userId: userId, // Correction de la variable 'UserId' à 'userId'
      produitId: product._id, // Assurez-vous que vous utilisez le bon champ 'id' ou '_id'
      quantity: qty
    };

    // Requête pour ajouter au panier
    axios.post('http://localhost:8084/api/v1/auth/addToCart', cartItem, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.data.success) {
          toast.success(`Vous avez ajouté ${qty} ${product.nom}(s) à votre panier.`);
        } else {
          toast.error("Erreur lors de l'ajout au panier.");
        }
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout au panier:', error);
        toast.error("Une erreur est survenue lors de l'ajout au panier.");
      });
  };

  // Supprimer un produit du panier
  const removeFromCart = (productId) => {
    if (!userId) {
      toast.error("Utilisateur non authentifié. Veuillez vous connecter.");
      return;
    }

    axios.delete(`http://localhost:8084/api/v1/auth/cart/${userId}/${productId}`)
      .then((response) => {
        if (response.data.success) {
          toast.success("Produit supprimé du panier.");
        } else {
          toast.error("Erreur lors de la suppression du produit.");
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression du produit:', error);
        toast.error("Une erreur est survenue lors de la suppression.");
      });
  };

  if (loading) {
    return <div>Chargement des produits...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="products-page container">
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((produit) => (
            <div className="col-md-4" key={produit._id}> {/* Utilisez '_id' au lieu de 'id_p' */}
              <ProductCard produit={produit} addToCart={addToCart} removeFromCart={removeFromCart} />
            </div>
          ))
        ) : (
          <p>Aucun produit disponible.</p>
        )}
      </div>

      {/* Toast Container pour afficher les toasts */}
      <ToastContainer />
    </div>
  );
};

export default Products;
