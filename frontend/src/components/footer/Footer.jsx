import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section À propos */}
        <div className="footer-about">
          <h4>À propos de nous</h4>
          <p>
            Nous sommes une entreprise engagée à fournir les meilleurs produits à nos clients. 
            Notre mission est de garantir la satisfaction client avec des services de qualité.
          </p>
        </div>

        {/* Section Contact */}
        <div className="footer-contact">
          <h4>Contactez-nous</h4>
          <p>Email : info@greenstore.tn</p>
          <p>Téléphone : +216 90 000 000</p>
          <p>Adresse : Ennacim City</p>
        </div>

        {/* Section Suivez-nous (sans liens) */}
        <div className="footer-social">
          <h4>Suivez-nous</h4>
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <p>&copy; 2024 Votre Entreprise. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
