import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, formData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-60"
        onClick={onClose}
      ></div>
      <div className="relative bg-white bg-opacity-80 p-8 rounded-lg shadow-xl z-10 w-full max-w-md mx-4 sm:mx-8">
        <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Form Submitted</h3>
        <p className="text-gray-700 mb-4">Here are the details you submitted:</p>
        <ul className="list-disc pl-5 mb-4 text-gray-600">
          <li><strong>Item Picture:</strong> {formData.itemPictureName}</li>
          <li><strong>Item Name:</strong> {formData.itemName}</li>
          <li><strong>Item Preferred Price:</strong> {formData.itemPreferredPrice}</li>
          <li><strong>Item Tax PAGS:</strong> {formData.itemTaxPAGS}</li>
          <li><strong>Item Tax TAGS:</strong> {formData.itemTaxTAGS}</li>
        </ul>
        <p className="text-gray-700 mb-4">Your request will be processed shortly.</p>
        <button
          onClick={onClose}
          className="bg-silver hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const JoinPage = () => {
  const [formData, setFormData] = useState({
    itemPicture: null,
    itemPictureName: '',
    itemName: '',
    itemPreferredPrice: '',
    itemTaxPAGS: '',
    itemTaxTAGS: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'itemPicture' && files.length > 0) {
      setFormData({
        ...formData,
        itemPicture: files[0],
        itemPictureName: files[0].name
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Show the modal
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      itemPicture: null,
      itemPictureName: '',
      itemName: '',
      itemPreferredPrice: '',
      itemTaxPAGS: '',
      itemTaxTAGS: ''
    });
    setCurrentStep(1); // Reset step to 1 after closing modal
  };

  return (
    <div className="relative top-[100px] join-page flex items-center justify-center bg-no-repeat bg-center bg-cover" style={{ backgroundImage: 'url(/path-to-your-background-image.jpg)' }}>
      <div className={`w-full max-w-lg p-8 bg-opacity-10 shadow-lg rounded-lg backdrop-blur-md ${isModalOpen ? 'opacity-30' : 'opacity-100'}`}>
        <h2 className="text-3xl font-bold mb-8 text-center text-gradient bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 bg-clip-text text-transparent">
          Join Now
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <div>
              <label className="block text-sm font-medium text-white">Item Picture</label>
              <input
                type="file"
                name="itemPicture"
                accept="image/*"
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent text-white"
              />
              {formData.itemPicture && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(formData.itemPicture)}
                    alt="Preview"
                    className="w-full h-auto rounded-md"
                  />
                </div>
              )}
              <label className="block text-sm font-medium text-white mt-4">Item Name</label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent text-white"
              />
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <label className="block text-sm font-medium text-white">Item Preferred Price</label>
              <input
                type="number"
                name="itemPreferredPrice"
                value={formData.itemPreferredPrice}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent text-white"
              />
              <label className="block text-sm font-medium text-white mt-4">Item Tax PAGS</label>
              <input
                type="text"
                name="itemTaxPAGS"
                value={formData.itemTaxPAGS}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent text-white"
              />
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <label className="block text-sm font-medium text-white">Item Tax TAGS</label>
              <input
                type="text"
                name="itemTaxTAGS"
                value={formData.itemTaxTAGS}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent text-white"
              />
            </div>
          )}
          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
              >
                Previous
              </button>
            )}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:from-gray-500 hover:via-gray-600 hover:to-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} formData={formData} />
    </div>
  );
};

export default JoinPage;
