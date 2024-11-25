import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="header">
      <div className="overlay"></div>
      <div className="container d-flex flex-column align-items-center justify-content-center text-center h-100">
        {/* Title Section */}
        <div className="header-content">
          <h1 className="display-4 text-light fw-bold">AGRAS Store</h1>
          <p className="text-light lead">
            Agras is a team of young IT students with a shared passion for agriculture and technology. 
            Our project is an online marketplace dedicated to providing a wide range of agricultural products and supplies. 
            From seeds and tools to animal care products, we aim to make agriculture more accessible and efficient for everyone.
          </p>
        </div>

        {/* Button Section */}
        <div className="header-buttons mt-4">
          <button className="btn btn-outline-light mx-3" onClick={handleLoginClick}>
            Login
          </button>
          <button className="btn btn-outline-light mx-3" onClick={handleRegisterClick}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
