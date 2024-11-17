import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css"; 

const Register = () => {
  const [cin, setCin] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateNais, setDateNais] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [adresse, setAdresse] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      cin,
      nom,
      prenom,
      dateNais,
      tel,
      email,
      motdepasse,
      adresse,
    };

    try {
      const response = await axios.post(`/api/v1/auth/RegisterUser`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        navigate("/login");
      } else {
        toast.error(response.data.message || "Error during registration");
      }
    } catch (error) {
      toast.error("Request error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-text">
          <h1>Join GreenStore Marketplace</h1>
          <p>
          Inscrivez-vous aujourd'hui pour faire partie du meilleur
           marché en ligne de produits agricoles durables et innovants.
           Connectez-vous avec nous pour donner vie à vos projets agricoles !
          </p>
        </div>
        <div className="register-form-container">
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-row">
              <div className="form-group">
                <label>CIN</label>
                <input
                  type="number"
                  className="form-control"
                  value={cin}
                  onChange={(e) => setCin(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  className="form-control"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date de Naissance</label>
                <input
                  type="date"
                  className="form-control"
                  value={dateNais}
                  onChange={(e) => setDateNais(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Téléphone</label>
                <input
                  type="number"
                  className="form-control"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Mot de Passe</label>
                <input
                  type="password"
                  className="form-control"
                  value={motdepasse}
                  onChange={(e) => setMotdepasse(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Adresse</label>
                <input
                  type="text"
                  className="form-control"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary register-btn"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "S'inscrire"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Register;