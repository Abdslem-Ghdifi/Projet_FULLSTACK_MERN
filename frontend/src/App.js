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
      </Routes>
    </Router>
  );
}

export default App;
