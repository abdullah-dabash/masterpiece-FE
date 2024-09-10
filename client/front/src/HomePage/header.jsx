import { Link } from 'react-router-dom';
import React, { useRef, useEffect } from 'react';
import headervid from "../assets/0810(1).mp4";

const HeroSection = () => {
  // Create a ref to access the video element
  const videoRef = useRef(null);

  // Use effect to set the playback rate when the component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1; // Set the desired playback speed
    }
  }, []);

  return (
    <section className="relative flex flex-col md:flex-row  ">
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
          <Link to="/products">
            <button className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
