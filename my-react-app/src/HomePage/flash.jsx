import React from 'react';
import Slider from 'react-slick';
import Countdown from 'react-countdown';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FlashSale = () => {
  // Sample data for products
  const products = [
    { id: 1, name: 'Product 1', price: '$99.99', image: 'https://via.placeholder.com/300x200?text=Product+1' },
    { id: 2, name: 'Product 2', price: '$79.99', image: 'https://via.placeholder.com/300x200?text=Product+2' },
    { id: 3, name: 'Product 3', price: '$89.99', image: 'https://via.placeholder.com/300x200?text=Product+3' },
    { id: 4, name: 'Product 4', price: '$119.99', image: 'https://via.placeholder.com/300x200?text=Product+4' },
    // Add more products as needed
  ];

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Timer completion handler
  const handleComplete = () => {
    console.log('Flash sale ended!');
  };

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Flash Sale!</h2>
          <p className="text-lg text-gray-600">Hurry up! The sale ends in:</p>
          <Countdown
            date={Date.now() + 1000 * 60 * 60 * 2} // 2 hours from now
            onComplete={handleComplete}
            renderer={({ hours, minutes, seconds }) => (
              <div className="text-2xl font-bold text-red-500">
                {hours}:{minutes}:{seconds}
              </div>
            )}
          />
        </div>

        <Slider {...settings} className="mb-8">
          {products.map((product) => (
            <div key={product.id} className="p-4">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-lg text-gray-600">{product.price}</p>
                  <button className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* View All Products Button */}
        <div className="text-center">
          <a href="/products" className="inline-block bg-red-500 text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-red-600">
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
