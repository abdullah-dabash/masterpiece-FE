// import React, { useState, useEffect } from 'react';

// const images = [
//   'https://cdn.dribbble.com/users/15687/screenshots/17621179/media/c849516059bc0f412251d67a4f97743b.png?resize=400x0',
//   // 'https://p.turbosquid.com/ts-thumb/Nm/tVoAPW/T6/gamingroomtrial1/png/1654431962/1920x1080/fit_q87/5da086b03f0822f636cd2c35aa6706bce89144ed/gamingroomtrial1.jpg',
//   // 'https://moewalls.com/wp-content/uploads/2022/09/gaming-room-studio-thumb.jpg',
//   'https://cdna.artstation.com/p/marketplace/presentation_assets/001/480/188/large/file.jpg?1642323188',
// ];

// const HeroSection = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
//     }, 3000); // Change image every 3 seconds

//     return () => clearInterval(timer); // Cleanup interval on component unmount
//   }, []);

//   return (
//     <section className="relative flex flex-col md:flex-row pt-28 md:pt-16">
//       {/* Image Slider */}
//       <div className="w-full relative">
//         <div className="relative overflow-hidden">
//           <div className="slider-images flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
//             {images.map((image, index) => (
//               <div key={index} className="w-full flex-shrink-0">
//                 <img
//                   src={image}
//                   alt={`Slide ${index + 1}`}
//                   className="w-full h-96 object-cover md:h-[500px]" // Responsive height
//                   style={{ width: '100%', height: '580px' }} // Ensuring image covers container
//                 />
//               </div>
//             ))}
//           </div>
//           <a href="#" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
//             Shop Now
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import React, { useRef, useEffect } from 'react';
import headervid from "../assets/vid.mp4";

const HeroSection = () => {
  // Create a ref to access the video element
  const videoRef = useRef(null);

  // Use effect to set the playback rate when the component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 3; // Set the desired playback speed
    }
  }, []);

  return (
    <section className="relative flex flex-col md:flex-row pt-28 md:pt-16">
      {/* Video Section */}
      <div className="w-full relative">
        <div className="relative overflow-hidden">
          <video
            ref={videoRef}
            src={headervid}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-96 object-cover md:h-[500px]"
            style={{ width: '100%', height: '580px', objectFit: 'cover' }}
          >
            Your browser does not support the video tag.
          </video>
          <a href="#" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
