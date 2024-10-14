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
        <h2>Explorez la nature et transformez votre espace avec Green Store</h2>
        <p>
          Rejoignez Green Store, votre marketplace pour les passionnés de plantes et de nature ! Que vous
          soyez débutant ou expert, découvrez notre sélection de plantes et de matériel de jardinage.
          Inscrivez-vous maintenant pour des offres exclusives et des conseils d&apos;experts. Transformez votre
          espace avec la beauté de la nature – connectez-vous dès aujourd&apos;hui et commencez votre aventure verte !
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
