import './Header.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleConnectClick = () => {
    navigate("/login"); // Programmatic navigation to "/seconnceter"
  };
const handleClick =() =>{
  navigate('/register')
};
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>AGRAS Store</h2>
        <p>
        Agras is a team of young IT students with a shared passion for agriculture and technology. Our project is an online marketplace dedicated to offering a wide range of agricultural products and supplies. From seeds and tools to animal care products, we aim to make agriculture more accessible and efficient for everyone.
        </p>
        <button id='btn_connecter' onClick={handleConnectClick}> {/* Attach onClick handler */}
          se connecter
        </button>
        <button id="btn_signin"  onClick={handleClick}>sign in </button>
      </div>
    </div>
  );
}

export default Header;
