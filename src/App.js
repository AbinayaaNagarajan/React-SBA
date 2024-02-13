// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import './App.css'; 
import axios from 'axios'

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider className="banner-slider" {...settings}>
      {/* Add your banner/slider items here */}
      <div>
        <img src="https://t3.ftcdn.net/jpg/03/47/39/04/360_F_347390410_yWGfLwNcJXoHcQqFgZ4gzYoIjZB6DR81.jpg" alt="Banner 1" />
      </div>
      <div>
      <img src="https://t3.ftcdn.net/jpg/03/47/39/04/360_F_347390410_yWGfLwNcJXoHcQqFgZ4gzYoIjZB6DR81.jpg" alt="Banner 1" /> 
      </div>
      <div>
        <img src="https://t3.ftcdn.net/jpg/03/47/39/04/360_F_347390410_yWGfLwNcJXoHcQqFgZ4gzYoIjZB6DR81.jpg" alt="Banner 1" />
      </div>
      <div>
      <img src="https://t3.ftcdn.net/jpg/03/47/39/04/360_F_347390410_yWGfLwNcJXoHcQqFgZ4gzYoIjZB6DR81.jpg" alt="Banner 1" /> 
      </div>
      {/* Add more banners as needed */}
    </Slider>
  );
};


const App = () => {
  const [cart, setCart] = useState([]);
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    // Make an API request when the component mounts
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=a64671dc')
      .then(response => {
        // Update state with the retrieved movie data
        setMovieData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  return (
    <Router>
      <div className="app">
        <nav className="side-navigation">
          <ul>
            <li><Link to="/" exact className="nav-link" activeclassName="active">Home</Link></li>
            <li><Link to="/products" className="nav-link" activeclassName="active">Products</Link></li>
            <li><Link to="/cart" className="nav-link" activeclassName="active">Shopping Cart</Link></li>
          </ul>
        </nav>
        <div className="main-layout">
          <Routes>
            <Route path="/products" element={<ProductList addToCart={addToCart} />} />
            <Route path="/cart" element={<ShoppingCart cart={cart} removeFromCart={removeFromCart} />} />
            <Route path="/" element={
            <>
              <h2>Welcome to the Shopping Website</h2>
              <BannerSlider />
              {movieData && (
                  <div>
                    <h3>Movie Data</h3>
                    <pre>{JSON.stringify(movieData, null, 2)}</pre>
                  </div>
                )}
            </>
          } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
