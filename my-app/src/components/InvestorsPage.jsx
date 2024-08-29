// src/InvestorsPage.js
import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const InvestorsPage = () => {
  useEffect(() => {
    gsap.fromTo(".card", 
      { rotationY: 0, scale: 0.9, opacity: 0.5 }, 
      { rotationY: 360, scale: 1, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power2.out" }
    );
  }, []);

  const cards = [
    {
      gameplayLink: "https://example.com/gameplay1",
      gameName: "Game 1",
      gameId: "12345",
      steamId: "STEAM123",
      minFundingReq: "$500",
    },
    {
      gameplayLink: "https://example.com/gameplay2",
      gameName: "Game 2",
      gameId: "67890",
      steamId: "STEAM456",
      minFundingReq: "$1000",
    },
    {
      gameplayLink: "https://example.com/gameplay3",
      gameName: "Game 3",
      gameId: "54321",
      steamId: "STEAM789",
      minFundingReq: "$1500",
    },
  ];

  return (
    <div className="investors-page flex flex-wrap gap-6 justify-center min-h-screen p-10">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="card w-80 h-96 perspective-1000 flex items-center justify-center"
        >
          <div className="inner-card w-full h-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 rounded-lg shadow-lg transform transition-transform duration-500 hover:rotate-y-15 hover:scale-105">
            <div className="p-6 flex flex-col items-center text-white">
              <h3 className="text-xl font-semibold mb-2">{card.gameName}</h3>
              <p className="mb-2"><strong>Gameplay Link:</strong> <a href={card.gameplayLink} className="text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">{card.gameplayLink}</a></p>
              <p className="mb-2"><strong>Game ID:</strong> {card.gameId}</p>
              <p className="mb-2"><strong>Steam ID:</strong> {card.steamId}</p>
              <p className="mb-4"><strong>Min Funding Req:</strong> {card.minFundingReq}</p>
              <div className="flex gap-4">
                <button className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300">
                  Partially Fund
                </button>
                <button className="bg-blue-300 hover:bg-blue-400 text-gray-900 font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300">
                  Complete Fund
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvestorsPage;
