// ProductList.js
import React, { useState, useEffect } from 'react';
import productsData from '../data/Products.json';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Use the data from the imported JSON file
    setProducts(productsData);
  }, []);

  const renderProducts = () => {
    return products.map(product => (
      <div key={product.id} className="product-item">
        <img src={product.imageUrl} alt={product.name} />
        <div className="product-description">
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button className='addtocart' onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    ));
  };

  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="product-container">
        {renderProducts()}
      </div>
    </div>
  );
};

export default ProductList;
