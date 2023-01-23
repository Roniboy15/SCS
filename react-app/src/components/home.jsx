import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage2 from '../images/night.jpg';
import backgroundImage1 from '../images/night.jpg';

const Home = () => {
  const [backgroundImage, setBackgroundImage] = useState(backgroundImage1);
  const nav =  useNavigate();

  useEffect(() => {
    const currentTime = new Date().getHours();
    if (currentTime >= 18 || currentTime <= 6) {
      setBackgroundImage(backgroundImage2);
    } else {
      setBackgroundImage(backgroundImage1);
    }
  }, []);

  return (
    <div className='h-screen' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className=''>
        <div className=''>

        </div>
        <h1 className="text-4xl text-teal-50 font-semibold">Swiss Cleaning Service</h1>
      </div>
      <p>We are on time like a Swiss watch fast like a Swiss train this makes money laundering our domain</p>
      <button onClick={()=>{nav("/order")}}>Order</button>
    </div>
    
  );
}

export default Home;
