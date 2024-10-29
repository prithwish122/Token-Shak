// src/InvestorsPage.js
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { BrowserProvider, ethers } from 'ethers'
import tokenShak from '../contractInfo/TokenShak.json'

const contractAddress = "0x966a1B74BB212B6eDa327c10ba4a48d15a43f3bF";
const InvestorsPage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [walletInput, setWalletInput] = useState("");

  useEffect(() => {
    gsap.fromTo(".card",
      { rotationY: 0, scale: 0.9, opacity: 0.5 },
      { rotationY: 360, scale: 1, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power2.out" }
    );
  }, []);

  const cards = [
    {
      gameplayLink: "https://example.com/Galaxy",
      gameName: "GALAXY",
      gameId: "12345",
      steamId: "STEAM123",
      minFundingReq: "$50",
      walletAddress: "0xfB8ae9808D84BF601f2Ef6178Da51a612bD046D0",
      bgGradient: "from-green-400 via-blue-500 to-purple-600",
    },
    {
      gameplayLink: "https://example.com/gameplay2",
      gameName: "PVT",
      gameId: "67890",
      steamId: "STEAM456",
      minFundingReq: "$100",
      walletAddress: "0xe1b3df92a983bD27c4798867A1F425B3fA7c71a8",
      bgGradient: "from-pink-400 via-red-500 to-yellow-600",
    },
    {
      gameplayLink: "https://example.com/gameplay3",
      gameName: "Game 3",
      gameId: "54321",
      steamId: "STEAM789",
      minFundingReq: "$1500",
      walletAddress: "0x789...ghi",
      bgGradient: "from-teal-400 via-green-500 to-blue-600",
    },
  ];

  const handleBuyClick = (card) => {
    setSelectedCard(card);
  };

  const handleClosePopup = () => {
    setSelectedCard(null);
    setWalletInput("");
  };

  const handlePay = async () => {
    const amount = (selectedCard.minFundingReq).replaceAll(/\W*/g, '')
    console.log("this is truth", amount)
    // Handle the payment logic here
    console.log("Entered Wallet Address:", walletInput);
    console.log("Card Info:", selectedCard);
    console.log("amount", amount);
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner()
    const movieRev = new ethers.Contract(contractAddress, tokenShak.abi, signer)
    // mint();
    
    await (await movieRev.transfer(selectedCard.walletAddress, ethers.parseUnits(amount.toString(), 18))).wait();
    handleClosePopup();
    
    alert('Transaction Complete!!');
  };

  return (
    <div className="investors-page flex flex-wrap gap-6 justify-center min-h-screen p-10">
      {cards.map((card, index) => (
        <div
          key={index}
          className="card w-80 h-96 perspective-1000 flex items-center justify-center"
        >
          <div className={`inner-card w-full h-full bg-gradient-to-r ${card.bgGradient} rounded-lg shadow-lg transform transition-transform duration-500 hover:rotate-y-15 hover:scale-105`}>
            <div className="p-6 flex flex-col items-center text-white">
              <h3 className="text-xl font-semibold mb-2">{card.gameName}</h3>
              <p className="mb-2"><strong>Token Link:</strong> <a href={card.gameplayLink} className="text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">{card.gameplayLink}</a></p>
              <p className="mb-2"><strong>Token ID:</strong> {card.gameId}</p>
              <p className="mb-2"><strong>Block Exploerer ID:</strong> {card.steamId}</p>
              <p className="mb-2"><strong>Wallet Address:</strong> {card.walletAddress.slice(0, 6) + "..." + card.walletAddress.slice(-4)}</p>
              <p className="mb-4"><strong>Min Funding Req:</strong> {card.minFundingReq}</p>
              <button
                className="bg-blue-300 hover:bg-blue-400 text-gray-900 font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                onClick={() => handleBuyClick(card)}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}

      {selectedCard && (
        <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="popup-inner bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Transaction</h2>
            {/* <input
              type="text"
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              value={walletInput}
              onChange={(e) => setWalletInput(e.target.value)}
              placeholder="Enter your wallet address"
            /> */}
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                onClick={handlePay}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestorsPage;
