import React, { useState } from 'react';
import Footer from '../footer';
import Navbar from '../nav';
import Swal from 'sweetalert2'; // Import SweetAlert2 for notifications

const RoomRenovation = () => {
  const [image, setImage] = useState(null);
  const [wallHeight, setWallHeight] = useState('');
  const [wallWidth, setWallWidth] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Save the file object directly
  };

  const handleHeightChange = (e) => {
    setWallHeight(e.target.value);
  };

  const handleWidthChange = (e) => {
    setWallWidth(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('roomImage', image);
    formData.append('wallHeight', wallHeight);
    formData.append('wallWidth', wallWidth);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);

    try {
      const response = await fetch('http://localhost:5000/api/renovation', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your room renovation request has been submitted.',
          confirmButtonText: 'OK'
        });
        // Clear the form after successful submission
        setImage(null);
        setWallHeight('');
        setWallWidth('');
        setName('');
        setEmail('');
        setPhone('');
      } else {
        const result = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.message || 'Something went wrong. Please try again later.'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.'
      });
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-100 py-10 px-4 pt-32">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Room Renovation</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div>
              <label htmlFor="roomImage" className="block text-lg font-medium text-gray-700 mb-2">Upload an Image of Your Room</label>
              <input
                type="file"
                id="roomImage"
                name="roomImage"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {/* Image Preview */}
              {image && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(image)} // Use the URL for the image preview
                    alt="Room preview"
                    className="w-full h-auto object-cover rounded-md shadow-md"
                  />
                </div>
              )}
            </div>

            {/* Wall Dimensions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Height Input */}
              <div>
                <label htmlFor="wallHeight" className="block text-lg font-medium text-gray-700 mb-2">Wall Height (in feet)</label>
                <input
                  type="number"
                  id="wallHeight"
                  name="wallHeight"
                  placeholder="Enter wall height"
                  value={wallHeight}
                  onChange={handleHeightChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Width Input */}
              <div>
                <label htmlFor="wallWidth" className="block text-lg font-medium text-gray-700 mb-2">Wall Width (in feet)</label>
                <input
                  type="number"
                  id="wallWidth"
                  name="wallWidth"
                  placeholder="Enter wall width"
                  value={wallWidth}
                  onChange={handleWidthChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* User Information */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Design My 3D Model
              </button>
            </div>
          </form>

          {/* Renovated Rooms Gallery */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Renovated Rooms Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-md shadow-md overflow-hidden">
                <img
                  src="https://twinkly.com/cdn/shop/articles/blogpost-gamingroom.jpg?v=1680345581" // Replace with actual image URL
                  alt="Renovated Room 1"
                  className="w-full h-40 object-cover"
                />
              </div>
              {/* Card 2 */}
              <div className="bg-white rounded-md shadow-md overflow-hidden">
                <img
                  src="https://www.leetdesk.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Fleetdesk%2F5faf0a70-6e31-4675-97a1-6aa8310b4309_led-gaming-zimmer-beleuchtung.jpg%3Fauto%3Dcompress%2Cformat&w=3840&q=75" // Replace with actual image URL
                  alt="Renovated Room 2"
                  className="w-full h-40 object-cover"
                />
              </div>
              {/* Card 3 */}
              <div className="bg-white rounded-md shadow-md overflow-hidden">
                <img
                  src="https://th.bing.com/th/id/OIP.DGQDyUX8vRMu5czW79zVJgHaE_?rs=1&pid=ImgDetMain" // Replace with actual image URL
                  alt="Renovated Room 3"
                  className="w-full h-40 object-cover"
                />
              </div>
              {/* Card 4 */}
              <div className="bg-white rounded-md shadow-md overflow-hidden">
                <img
                  src="https://th.bing.com/th/id/OIP.lqbLBkRxv91DozY7HINDrwHaJQ?w=736&h=920&rs=1&pid=ImgDetMain" // Replace with actual image URL
                  alt="Renovated Room 4"
                  className="w-full h-40 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default RoomRenovation;