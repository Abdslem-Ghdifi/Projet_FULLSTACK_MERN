import images from '../../assets/assets'
import './Navbar.css';
import  { useState } from 'react';

const Navbar = () => {
  const [menu,setMenu] = useState("Acceuiel");
  return (
    <div className='navbar'>
      <img src={images.logoWhite} alt="" className="logo" />
      <ul className="navbar-menu">
        <li onClick={()=>setMenu("Acceuiel")} className={menu==="Acceuiel"?"active":""}>Acceuiel</li>
        <li onClick={()=>setMenu("Catalogue")} className={menu==="Catalogue"?"active":""}>Catalogue</li>
        <li onClick={()=>setMenu("Profile")} className={menu==="Profile"?"active":""}>Profile</li>
        <li onClick={()=>setMenu("Commande")} className={menu==="Commande"?"active":""}>Commande</li>
        <li onClick={()=>setMenu("Contact")} className={menu==="Contact"?"active":""}>Contact admin</li>
        
      </ul>
      <div className="navbar-right">
        <img src={images.iconSearch} className="icon" />
        <div className="navbar-search-icon">
          <img src={images.iconBasket} className="icon" />
          <div className="dot"></div>
        </div>
        <button>déconnecter</button>
      </div>  
    </div>
  );
}

export default Navbar;
