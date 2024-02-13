// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
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
        <img src="https://png.pngtree.com/background/20210709/original/pngtree-movie-film-background-banner-design-picture-image_612258.jpg" alt="Banner 1" />
      </div>
      <div>
      <img src="https://png.pngtree.com/background/20210709/original/pngtree-movie-film-background-banner-design-picture-image_612258.jpg" alt="Banner 1" /> 
      </div>
      <div>
        <img src="https://png.pngtree.com/background/20210709/original/pngtree-movie-film-background-banner-design-picture-image_612258.jpg" alt="Banner 1" />
      </div>
      <div>
      <img src="https://png.pngtree.com/background/20210709/original/pngtree-movie-film-background-banner-design-picture-image_612258.jpg" alt="Banner 1" /> 
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
            <li><NavLink to="/" className="nav-link" >Home</NavLink></li>
            <li><NavLink to="/Movies" className="nav-link" >Movies</NavLink></li>
            <li><NavLink to="/Favorites" className="nav-link" >Favorite Movies</NavLink></li>
          </ul>
        </nav>
        <div className="main-layout">
          <Routes>
            <Route path="/Movies" element={<ProductList addToCart={addToCart} />} />
            <Route path="/Favorites" element={<ShoppingCart cart={cart} removeFromCart={removeFromCart} />} />
            <Route path="/" element={
            <>
              <h2>Watch Your Favorite Movies Here</h2>
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
