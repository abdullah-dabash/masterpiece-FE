import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

// Sample data for best-selling products
const bestSellingProducts = [
  { id: 1, name: 'Product 1', price: '$99.99', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s' },
  { id: 2, name: 'Product 2', price: '$79.99', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s' },
  { id: 3, name: 'Product 3', price: '$89.99', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s' },
  { id: 4, name: 'Product 4', price: '$119.99', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s' },
  { id: 5, name: 'Product 5', price: '$149.99', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s' },
  // Add more products as needed
];

const BestSellingProducts = () => {
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

  return (
    <section className="py-10 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Best Selling Products</h2>
        </div>

        <Slider {...settings}>
          {bestSellingProducts.map((product) => (
            <div key={product.id} className="p-4">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-lg text-gray-600">{product.price}</p>
                  <Link to ="/productDetails/product" className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default BestSellingProducts;
