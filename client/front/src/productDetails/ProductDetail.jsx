import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../nav';
import Room from '../room';
import Modal from '../modal'; // Import the Modal component

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRoom, setShowRoom] = useState(false); // State for controlling modal visibility
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/products/${id}`);
        if (response.data) {
          setProduct(response.data);
        } else {
          setError('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!product) return;

    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        productId: product._id,
        quantity: 1,
        price: product.price,
      });
      Swal.fire({
        title: 'Added to Cart!',
        text: 'This product has been added to your cart.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue adding the product to your cart.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row gap-8">
          {product && product.imageUrl ? (
            <img
              src={`http://localhost:4000/uploads/${product.imageUrl}`}
              alt={product.name}
              className="w-full md:w-1/2 h-auto object-cover rounded-lg"
            />
          ) : (
            <p className="text-center text-gray-600">Image not available</p>
          )}
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-4">{product?.name}</h1>
            <p className="text-xl font-semibold mb-4">${product?.price?.toFixed(2)}</p>
            <p className="mb-4">{product?.description}</p>
            <button
              onClick={addToCart}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Add to Cart
            </button>
            <button
              onClick={() => setShowRoom(true)} // Open the modal
              className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Show  3D  Model
            </button>
          </div>
        </div>
      </div>

      {/* Modal with Room component */}
      <Modal isOpen={showRoom} onClose={() => setShowRoom(false)}>
        {product?.modelUrl && <Room modelUrl={`http://localhost:4000/uploads/${product.modelUrl}`} />}
      </Modal>
    </>
  );
};

export default ProductDetail;
