import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/seConnecter/register';
import SeConnecter from './pages/seConnecter/seConnecter';  
import Home from './pages/home/home'
import UserAccueil from './pages/UserAcceuil/UserAcceuil';
import ModifierProfil from'./components/ProfilUser/ModifierProfil'
import ForgotPassword from './pages/seConnecter/forgot-password';
import ResetPassword from './pages/seConnecter/ResetPassword';
import DeposerArticle from './components/Article/DeposerArticle';
import Profil from './components/ProfilUser/Profil';
import Producrved from './components/product/Producrved';
import Cart from './components/Cart/Cart';
import AdminDashboard from './pages/AdminDashboard';
import EditProduct from './components/product/EditProduct'
import Invoice from './components/facture/invoice';
import Commande from './components/Commandes/Commandes.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<SeConnecter />} />
        <Route path='/userAcceuil' element={<UserAccueil />}></Route>
        <Route path='/ModifierProfil' element={<ModifierProfil />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} /> 
        <Route path='/DeposerArticle' element={<DeposerArticle />}></Route>
        <Route path="/cart" element={<Cart />} />    
        <Route path='/profil' element={<Profil />}></Route>
        <Route path='/Producrved' element={<Producrved />}></Route>
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/EditProduct" element={<EditProduct />} />
        <Route path="/facture" element={<Invoice />} />
        <Route path="/commandes" element={<Commande />} />
      </Routes>
    </Router>
  );
}

export default App;
