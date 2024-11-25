import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './DeposerArticle.css'; // Ensure to add your CSS file
import { useNavigate } from 'react-router-dom';

const DeposerArticle = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('equipment');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null); // State to store user ID

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) {
        navigate('/login'); // Redirect if no token is available
        return;
      }
      
      try {
        const response = await axios.get('/api/v1/auth/fetchUser', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUserId(response.data.user._id); // Store user ID
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create product object to send
    const productData = {
      name,
      description,
      price,
      category,
      stock,
      image: image || '', // Default image if none is selected
      seller: userId, // User ID as seller
    };

    try {
      const response = await axios.post('/api/v1/auth/createProduct', productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/userHome'); // Redirect to home page after adding product
      } else {
        toast.error(response.data.message || 'Error adding product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Request error');
    } finally {
      setLoading(false);
    }
  };

  const handleImg = (e) => {
    const file = e.target.files[0];
    setLoading(true);
    imageUpload(file)
      .then((url) => {
        toast.dismiss();
        toast.success("Image uploaded successfully.");
        setImage(url);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Error uploading the image.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div id='add-product'>
      <h2>Add a Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="equipment">Equipment</option>
            <option value="animal products">Animal Products</option>
            <option value="plant products">Plant Products</option>
          </select>
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImg}
          />
        </div>
        <div>
          <input type="submit" value={loading ? 'Adding...' : 'Add Product'} disabled={loading} />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default DeposerArticle;

const imageUpload = async (file) => {
  const formData = new FormData();
  if (file) {
    formData.append("image", file);
  }
  try {
    const response = await axios.post("http://localhost:8084/api/v1/auth/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.secure_url;
  } catch (error) {
    toast.error("Error uploading the image");
    throw error;
  }
};
