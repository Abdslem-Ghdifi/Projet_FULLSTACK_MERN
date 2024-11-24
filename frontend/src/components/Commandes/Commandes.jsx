import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Commandes = ({ userId }) => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les commandes de l'utilisateur
    const fetchCommandes = async () => {
      try {
        // Envoi de la requête POST à l'API
        const response = await axios.post('http://localhost:8084/api/v1/auth/getCommandes', { userId });
        setCommandes(response.data.commandes);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des commandes:', err);
        setError('Erreur lors de la récupération des commandes');
        setLoading(false);
      }
    };

    // Appeler la fonction de récupération des commandes
    fetchCommandes();
  }, [userId]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Mes Commandes</h2>
      {commandes.length === 0 ? (
        <p>Aucune commande trouvée</p>
      ) : (
        commandes.map((commande) => (
          <div key={commande._id} className="commande">
            <h3>Commande ID: {commande._id}</h3>
            <p>Total: {commande.total}€</p>
            <div>
              <h4>Détails des commandes</h4>
              {commande.commandes.map((detail, index) => (
                <div key={index} className="commande-detail">
                  <p><strong>Vendeur: </strong>{detail.vendeur.prenom} {detail.vendeur.nom}</p>
                  <div>
                    {detail.produit ? (
                      <div>
                        <p><strong>Produit: </strong>{detail.produit.nom}</p>
                        <p><strong>Prix: </strong>{detail.produit.prix}€</p>
                        <img src={detail.produit.image} alt={detail.produit.nom} style={{ width: '100px', height: '100px' }} />
                      </div>
                    ) : (
                      <p>Produit non trouvé</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Commandes;
