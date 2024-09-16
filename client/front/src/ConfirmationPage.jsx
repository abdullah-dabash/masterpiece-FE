import React from 'react';
import Navbar from './nav';
import Footer from './footer';

const ConfirmationPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 p-6 sm:p-8 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Thank You!</h2>
        <p className="mb-4">Your payment was successful. Your order has been placed.</p>
        <p className="mb-4">You will receive an email confirmation shortly.</p>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmationPage;
