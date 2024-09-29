import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useFloating, offset, shift } from '@floating-ui/react';
import { motion } from 'framer-motion';

// BestSellingProducts Component
const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const reference = useRef(null);
  const { x, y, strategy, refs } = useFloating({
    placement: 'top',
    middleware: [offset(10), shift()],
  });

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products/all');
        setProducts(response.data);
      } catch (error) {
        setError(`Error fetching products: ${error.message}`);
      }
    };

    fetchProducts();
  }, []);

  const handleMouseEnter = (product) => {
    setCurrentProduct(product);
  };

  const handleMouseLeave = () => {
    setCurrentProduct(null);
  };

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
          {products.map((product) => (
            <div key={product._id} className="p-4 relative">
              <motion.div
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                ref={reference}
                onMouseEnter={() => handleMouseEnter(product)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={`http://localhost:4000/uploads/${product.imageUrl}`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-lg text-gray-600">{product.price}</p>
                  <Link to={`/productDetails/${product._id}`} className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
                    Buy Now
                  </Link>
                </div>
              </motion.div>

              {currentProduct?._id === product._id && (
                <div
                  ref={refs.floating}
                  style={{
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                    background: 'rgba(0, 0, 0, 0.75)',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '8px',
                    zIndex: 10,
                    transition: 'opacity 0.3s ease',
                    opacity: currentProduct ? 1 : 0,
                  }}
                >
                  <p className="font-bold">{currentProduct.name}</p>
                  <p>{currentProduct.price}</p>
                </div>
              )}
            </div>
          ))}
        </Slider>

        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>
    </section>
  );
};

export default BestSellingProducts;
