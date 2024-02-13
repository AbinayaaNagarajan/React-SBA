// ShoppingCart.js
import React from 'react';

const ShoppingCart = ({ cart, removeFromCart }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="shopping-cart">
      <h2>Favorite Movies</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            <img src={item.imageUrl} alt={item.name}  style={{ width: '100px', height: '100px' }} />
            <div>
              <h3>{item.name}</h3>
             {/*<p>${item.price}</p>*/ } 
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <p>List of Movies to be watched for upcoming week: {cart.length}</p>
       {/*<p>Total Amount: ${calculateTotal().toFixed(2)}</p>*/ } 
      </div>
    </div>
  );
};

export default ShoppingCart;
