import React, { useState } from 'react';
import Navbar from './nav';
import Footer from './footer';

const CartComponent = () => {
  const [couponCode, setCouponCode] = useState('');
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'High-Quality LED Light', price: 25.00, quantity: 2, image: 'https://via.placeholder.com/150', description: 'A bright LED light with adjustable brightness.' },
    { id: 2, name: 'Smartphone Stand', price: 15.00, quantity: 1, image: 'https://via.placeholder.com/150', description: 'A sturdy stand for your smartphone.' },
  ]);

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems(cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return subtotal;
  };

  const subtotal = calculateTotal();
  const discount = couponCode === 'SAVE10' ? 0.10 * subtotal : 0;
  const total = subtotal - discount;

  return (
    <>
    <Navbar/>
    <div className="container mx-auto my-10 p-6 sm:p-8 bg-gray-100 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Cart Items */}
      <div className="bg-white p-6 rounded-lg shadow-sm col-span-1 md:col-span-2">
        <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
        <div className="grid grid-cols-1 gap-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
              <div className="flex-1">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="hover:bg-red-600 bg-red-600  rounded-r-md px-3 py-1 text-black rounded-l-md  "
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-t border-b border-gray-300">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="hover:bg-red-600 bg-red-600  rounded-r-md px-3 py-1 text-black"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-lg font-medium ml-4">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
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
            className="flex-1 border border-gray-300 rounded-md py-2 px-4"
          />
          <button className="hover:bg-red-600 bg-red-600  text-white rounded-md px-4 py-2 font-semibold">
            Apply
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm col-span-1 md:col-span-2 lg:col-span-1">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex flex-col space-y-4 mb-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <h3 className="text-lg font-semibold mb-2">Products in Cart</h3>
          <ul className="space-y-2">
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
        <button className="hover:bg-red-600 bg-red-600 text-white w-full rounded-md py-2 font-semibold">
          Checkout
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CartComponent;
