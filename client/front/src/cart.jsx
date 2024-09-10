import React, { useState, useEffect } from 'react';
import Navbar from './nav';
import Footer from './footer';
import Swal from 'sweetalert2'; // For notifications

const CartComponent = () => {
  const [couponCode, setCouponCode] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cart', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched cart items:', data); // Log data to check its structure
          setCartItems(data);
        } else {
          console.error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
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
      const response = await fetch(`http://localhost:5000/api/cart/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: newQuantity })
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCartItems(updatedCart.cart);
      } else {
        console.error('Failed to update item quantity');
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/remove/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCartItems(updatedCart.cart);
        Swal.fire('Removed!', 'Item has been removed from your cart.', 'success');
      } else {
        Swal.fire('Error!', 'Failed to remove item from cart.', 'error');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      Swal.fire('Error!', 'Failed to remove item from cart.', 'error');
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => {
      const price = parseFloat(item.productId.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return total + (price * quantity);
    }, 0);
    return subtotal;
  };

  const subtotal = calculateTotal();
  const discount = couponCode === 'SAVE10' ? 0.10 * subtotal : 0;
  const total = subtotal - discount;

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 p-6 sm:p-8 bg-gray-100 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="bg-white p-6 rounded-lg shadow-sm col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
          <div className="grid grid-cols-1 gap-6">
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <div key={item._id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                  <img src={item.productId.image} alt={item.productId.name} className="w-24 h-24 object-cover rounded-md mr-4" />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{item.productId.name}</h3>
                    <p className="text-gray-600 mb-2">{item.productId.description}</p>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(item._id, -1)}
                        className="hover:bg-red-600 bg-red-600 text-white rounded-r-md px-3 py-1"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-t border-b border-gray-300">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, 1)}
                        className="hover:bg-red-600 bg-red-600 text-white rounded-r-md px-3 py-1"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-lg font-medium ml-4">${(item.productId.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="ml-4 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
          </div>
        </div>

        {/* Apply Coupon Code */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Apply Coupon Code</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={couponCode}
              onChange={handleCouponChange}
              placeholder="Enter coupon code"
              className="flex-1 p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={() => Swal.fire(`Coupon applied: ${couponCode === 'SAVE10' ? '10% off!' : 'Invalid coupon'}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm col-span-1">
          <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Discount:</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between mb-4 font-semibold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => Swal.fire('Checkout functionality is not yet implemented.')}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
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
