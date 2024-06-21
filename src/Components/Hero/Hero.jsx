import React, { useState } from 'react';
import './Hero.css';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search'; // Import Search icon from Material-UI
import Sale from '../../Pages/Sale';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'; 

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle photo upload for visual search
      // Navigate to visual search results page or process the uploaded image
      navigate(`/sale}`);
    }
  };

  return (
    <div className='hero'>
      <div className='hero-left'>
        {/* Add Search Bar */}
        <form onSubmit={handleSearchSubmit} className='hero-search'>
          <input 
            type='text' 
            placeholder='Search Digital Art...' 
            value={searchQuery} 
            onChange={handleSearchChange} 
            className='search-input'
          />
         
          <label htmlFor='upload-photo' className='upload-button'>
            <PhotoCameraIcon />
            <input
              type='file'
              id='upload-photo'
              style={{ display: 'none' }}
              accept='image/*'
              onChange={handlePhotoUpload}
            />
          </label>
        </form>

        <h2>Welcome to DigiArtHub</h2>
        <div>
          <div className='hand-hand-icon'>
            {/* <p>New</p> */}
            {/* <img src={hand_icon} alt="" /> */}
          </div>
          <p>Sell or Purchase</p>
          <p>Your Digital Art Products</p>
          <h6 className='hero-subtext'>Discover a wide range of digital artworks from talented artists around the world. Whether you're looking to buy unique pieces or sell your own creations, OneStop is your ultimate destination for digital art products. Join our community today and showcase your talent to a global audience.</h6>
        </div>
        
        <Link to="/latest" className='hero-latest-btn'>
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </Link>
      </div>
      <div className='hero-right'>
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
