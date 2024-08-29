import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(".hero-title", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });
    gsap.fromTo(".hero-button", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, delay: 0.5, duration: 1 });
  }, []);

  const handleJoinNow = () => {
    navigate('/join'); // Redirect to JoinPage
  };

  const handleInvest = () => {
    navigate('/investors'); // Redirect to InvestorsPage
  };

  return (
    <div className="hero-section flex items-center justify-center h-[80vh] bg-transparent overflow-hidden">
      <div className="text-center">
        <h1
          className="hero-title text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Buy, Sell, Bid & Earn
        </h1>
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={handleJoinNow}
            className="hero-button bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Join Now
          </button>
          <button
            onClick={handleInvest}
            className="hero-button bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Invest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
