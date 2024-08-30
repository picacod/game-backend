import React, { useEffect, useState } from 'react';
import HomeContent from './HomeContent';
import Aos from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import vid from '../../../assets/intro.mp4'
import logo from '../../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Hero() {

  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isBooked, setBooked] = useState(false);
  const user_id = sessionStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user_id) {
      setLoggedIn(true);
      checkIfPreordered();  // Check if the user has already pre-ordered
    } else {
      setLoggedIn(false);
    }
  }, [user_id]);

  const checkIfPreordered = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/check_preorder/', {
        params: {
          user_id: user_id // Include user ID as a query parameter
        }
      });
      if (response.data.preordered) {
        setBooked(true);
      } else {
        setBooked(false);
      }
    } catch (error) {
      console.error("Error checking pre-order status:", error);
    }
  };

  const handleBooking = async () => {
    if (isLoggedIn) {
      try {
        const response = await axios.post('http://localhost:8000/api/preorder/', {
          user_id: user_id // Include user ID in the request body
        });
        if (response.data.message === 'Pre-order successful.') {
          alert('Booked successfully');
          setBooked(true);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error during booking:", error);
        alert('An error occurred while booking.');
      }
    } else {
      navigate('/login');
    }
  };
  
  return (

    <div>
      <div style={{ position: 'relative', height: '100vh' }}>
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source src={vid} type="video/mp4" />
          Your browser does not support the video
        </video>

        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 10), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 10))',
          zIndex: 1,
        }}></div>

        <div className="container h-100" style={{ position: 'relative', zIndex: 2 }}>
          <div className='h-100 d-flex flex-column align-items-center justify-content-center text-light'>
            {/* <h1   style={{ fontSize: '5rem', fontFamily: 'fantasy', color: 'yellow' }}>Ancient Shadows</h1> */}
            <img data-aos="fade-up" width={700} className='img-fluid' src={logo} alt="" />

            <h1 data-aos="fade-down" className='mb-4 fw-bold' style={{ fontSize: '2rem' }}>Available for PS5 and PC</h1>
            <h5 data-aos="fade-down" >Experience entertainment blockbusters , Ancient Shadows.</h5>
            <div data-aos="fade-down"
              className={`d-${isMobile ? 'grid' : 'flex'} gap-2 mt-2`}
              style={{ width: isMobile ? '100%' : 'auto' }}>
              <button className='btn btn-lg btn-outline-light rounded-0'>Watch the trailer</button>
              {
                isBooked ? 
                <button className='btn btn-lg btn-warning rounded-0' >Ordered</button> :
                <button className='btn btn-lg btn-outline-light rounded-0' onClick={handleBooking}>PRE-ORDER NOW</button> 
              }
            </div>
            <p data-aos="fade-down" className='mt-2 text-warning'>AVAILABLE 12 - 8 - 2026</p>

          </div>
        </div>
      </div>
      <HomeContent />
    </div>
  );
}

export default Hero;