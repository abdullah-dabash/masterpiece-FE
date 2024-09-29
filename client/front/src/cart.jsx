import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './nav';
import Footer from './footer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CartComponent = () => {
  const [couponCode, setCouponCode] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setCartItems(response.data);
      } catch (error) {
        setError('Error fetching cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleQuantityChange = async (id, delta) => {
    const item = cartItems.find(item => item._id === id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/cart/update/${id}`, {
        quantity: newQuantity
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCartItems(response.data.cart);
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:5000/api/cart/remove/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCartItems(response.data.cart);
      Swal.fire('Removed!', 'Item has been removed from your cart.', 'success');
    } catch (error) {
      console.error('Error removing item:', error);
      Swal.fire('Error!', 'Failed to remove item from cart.', 'error');
    }
  };

  const handleClearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete('http://localhost:5000/api/cart/clear', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCartItems(response.data.cart);
      Swal.fire('Cleared!', 'Your cart has been cleared.', 'success');
    } catch (error) {
      console.error('Error clearing cart:', error);
      Swal.fire('Error!', 'Failed to clear cart.', 'error');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.productId.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return total + (price * quantity);
    }, 0);
  };

  const subtotal = calculateTotal();
  const discount = couponCode === 'SAVE10' ? 0.10 * subtotal : 0;
  const total = subtotal - discount;

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      Swal.fire('Not logged in', 'Please log in to proceed to checkout.', 'warning');
      return;
    }

    if (cartItems.length === 0) {
      Swal.fire('Cart is empty', 'Please add items to your cart before proceeding to checkout.', 'info');
      return;
    }

    navigate('/Payment');
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 p-6 sm:p-8 bg-white rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="bg-white p-6 rounded-lg shadow-sm col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-black">Cart Items</h2>
          <div className="grid grid-cols-1 gap-6">
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <div key={item._id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                  <img 
                    src={`http://localhost:4000/uploads/${item.productId.imageUrl}`} 
                    alt={item.productId.name} 
                    className="w-24 h-24 object-cover rounded-md mr-4" 
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-black">{item.productId.name}</h3>
                    <p className="text-black mb-2">{item.productId.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(item._id, -1)}
                          className="bg-black text-white rounded-l-md px-3 py-1"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-t border-b border-gray-300">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item._id, 1)}
                          className="bg-black text-white rounded-r-md px-3 py-1"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="ml-4 text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-lg font-medium text-black flex-shrink-0 ml-4">
                        ${(item.productId.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-black">No items in the cart</p>
            )}
          </div>
          {/* Clear Cart Button */}
          <div className="mt-6">
            <button
              onClick={handleClearCart}
              className="bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm col-span-1">
          <h2 className="text-xl font-semibold mb-4 text-black">Cart Summary</h2>
          <div className="flex justify-between mb-4 text-black">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between mb-4 text-black">
              <span>Discount:</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between mb-4 font-semibold text-black">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            Checkout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartComponent;
