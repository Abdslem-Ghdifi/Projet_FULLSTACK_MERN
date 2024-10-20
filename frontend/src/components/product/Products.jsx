import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios'; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/v1/auth/getProduits');
        const data = response.data; // This is your response object
        console.log("Fetched Products:", data); // Check what data is being fetched
        setProducts(data.produits); // Set products state with the 'produits' array
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Function to add product to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };
   // Function to delete a product
   /*const deleteProduct = async (id_p) => {
    try {
      const response = await axios.delete(`/api/v1/auth/deleteProduit/${id_p}`);
      console.log('Product deleted:', response.data);
    } catch (error) {  

      console.error('Error deleting product:', error);
    }
  };*/

  // Function to update a product
  /*const updateProduct = async (productId, updatedData) => {
    try {
        const response = await axios.put(`/api/v1/auth/updateProduit/${productId}`, updatedData);
        setProducts(products.map(product => 
            product.id_p === productId ? { ...product, ...updatedData } : product
        ));
        console.log("Product updated successfully:", response.data);
    } catch (error) {
        console.error("Failed to update product:", error);
    }
};*/

  console.log("Products State:", products); // Log current products state

  return (
    <div className="products-page container">
      <div className="row">
        {products.length > 0 ? (
          products.map((produit) => (
            <div className="col-md-4" key={produit.id_p}>
              <ProductCard produit={produit} addToCart={addToCart} />
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
