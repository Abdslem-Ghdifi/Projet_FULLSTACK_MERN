import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-light text-dark pt-5 pb-3">
      <div className="container">
        <div className="row">
          {/* About Us Section */}
          <div className="col-md-4 mb-4">
            <h4 className="footer-heading">About Us</h4>
            <p>
              We are a company committed to providing the best products to our customers. 
              Our mission is to ensure customer satisfaction with high-quality services.
            </p>
          </div>

          {/* Contact Us Section */}
          <div className="col-md-4 mb-4">
            <h4 className="footer-heading">Contact Us</h4>
            <p>Email: info@greenstore.tn</p>
            <p>Phone: +216 90 000 000</p>
            <p>Address: Jbal Lahmer City</p>
          </div>

          {/* Follow Us Section */}
          <div className="col-md-4 mb-3">
            <h4 className="footer-heading">Follow Us</h4>
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

        <div className="footer-bottom text-center py-3 border-top border-dark">
          <p>&copy; 2024 GreenStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
