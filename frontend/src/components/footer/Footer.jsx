import React from 'react';
import './Footer.css'; // Assuming you will use external CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="team-info">
          <h4>Team Agras</h4>
          <ul>
            <li>Salah Soltani</li>
            <li>Adem Mokhtar Khadhri</li>
            <li>Ghaith Bibeni</li>
            <li>Abdelsalem Ghidifi</li>
            <li>Rayen Chaabi</li>
            <li>Momen Rsaissi</li>
          </ul>
        </div>
        <div className="contact-info">
          <h4>Contact Us</h4>
          <p>Email: <a href="mailto:agras@gmail.com">agras@gmail.com</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Agras. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
