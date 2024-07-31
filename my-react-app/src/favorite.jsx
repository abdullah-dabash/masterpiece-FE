import React, { useState } from 'react';
import Navbar from './nav';
import Footer from './footer';

// Example data for favorite items
const initialFavorites = [
  { id: 1, name: 'High-Quality LED Light', price: 25.00, image: 'https://via.placeholder.com/150', description: 'Bright and energy-efficient LED light.' },
  { id: 2, name: 'Smartphone Stand', price: 15.00, image: 'https://via.placeholder.com/150', description: 'Adjustable stand for smartphones and tablets.' },
];

const Favorites = ({ onAddToCart }) => {
  const [favorites, setFavorites] = useState(initialFavorites);

  const handleAddToCart = (item) => {
    onAddToCart(item);
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md pt-36">
      <h1 className="text-2xl font-bold mb-6">Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-t-lg mb-4" />
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
              </div>
              <button
                onClick={() => handleAddToCart(item)}
                className="mt-auto bg-black text-white rounded-lg py-2 px-4 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Favorites;
