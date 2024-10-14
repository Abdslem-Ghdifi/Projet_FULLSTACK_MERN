import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './pages/seConnecter/register';
import SeConnecter from './pages/seConnecter/seConnecter';  
import Home from '../src/pages/home/home'
import UserAccueil from './pages/UserAcceuil/UserAcceuil';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<SeConnecter />} />
        <Route path='/userAcceuil' element={<UserAccueil />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
