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
  const [file, setFile] = useState(null); // For image upload
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to upload an image file
  const uploadImage = async () => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/api/v1/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.imageUrl; // Return uploaded image URL
    } catch (error) {
      toast.error("Failed to upload image.");
      console.error(error);
      return null;
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage(); // Upload the image if available

      const userData = {
        cin,
        nom,
        prenom,
        dateNais,
        tel,
        email,
        motdepasse,
        adresse,
        image: imageUrl,
      };

      const response = await axios.post(`/api/v1/auth/RegisterUser`, userData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        toast.success("Account created successfully!");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Error during registration");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
  <div className="register-container">
    {/* Informational Section */}
    <div className="register-text">
      <h1>Join GreenStore Marketplace</h1>
      <p>
        Sign up today to become part of the best online marketplace for sustainable
        and innovative agricultural products. Connect with us to bring your agricultural
        projects to life!
      </p>
    </div>
    
    {/* Registration Form */}
    <div className="register-form-container">
      <form onSubmit={handleSubmit} className="register-form">
        
        {/* Row 1: CIN and Last Name */}
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
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
        </div>
        
        {/* Row 2: First Name and Date of Birth */}
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              value={dateNais}
              onChange={(e) => setDateNais(e.target.value)}
              required
            />
          </div>
        </div>
        
        {/* Row 3: Phone Number and Email */}
        <div className="form-row">
          <div className="form-group">
            <label>Phone Number</label>
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
        
        {/* Row 4: Password and Address */}
        <div className="form-row">
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={motdepasse}
              onChange={(e) => setMotdepasse(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              required
            />
          </div>
        </div>
        
        {/* Image Upload */}
        <div className="form-group">
          <label>Profile Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary register-btn"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  </div>
  <ToastContainer />
</div>

  );
};

export default Register;
