import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-light text-dark pt-5 pb-3">
      <div className="container">
        <div className="row">
          {/* Section About Us */}
          <div className="col-md-4 mb-4">
            <h4 className="footer-heading">À propos de nous</h4>
            <p>
              Nous sommes une entreprise engagée à fournir les meilleurs produits à nos clients. 
              Notre mission est de garantir la satisfaction client avec des services de qualité.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h4 className="footer-heading">Contactez-nous</h4>
            <p>Email : info@greenstore.tn</p>
            <p>Téléphone : +216 90 000 000</p>
            <p>Adresse : Jbal Lahmer City</p>
          </div>

          <div className="col-md-4 mb-3">
            <h4 className="footer-heading">Suivez-nous</h4>
            <div className="social-icons">
              <a href="#" className="text-dark me-3">
                <FaFacebook size={30} />
              </a>
              <a href="#" className="text-dark me-3">
                <FaTwitter size={30} />
              </a>
              <a href="#" className="text-dark me-3">
                <FaLinkedin size={30} />
              </a>
              <a href="#" className="text-dark">
                <FaInstagram size={30} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom text-center py-3  border-top border-dark">
          <p>&copy; 2024 GreenStore. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
