import React, { useEffect, useState } from "react";
import Navbar from "../nav";
import Footer from "../footer";
import RelatedProducts from "./relatedproducts";

export default function Widget() {
  const [selectedImage, setSelectedImage] = useState("https://m.media-amazon.com/images/I/71uOp2Lo+cS._AC_UF894,1000_QL80_.jpg");
  const [quantity, setQuantity] = useState(2); // Initialize quantity state

  const images = [
    "https://m.media-amazon.com/images/I/71uOp2Lo+cS._AC_UF894,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/81kQORlMMuS._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/71DK4nIytuS._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/61tPMUJZ01L._AC_SX679_.jpg",
  ];

  const handleQuantityChange = (delta) => {
    setQuantity(prevQuantity => Math.max(prevQuantity + delta, 1)); // Ensure quantity is at least 1
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row bg-background p-6 pt-28 rounded-lg shadow-md">
        <div className="flex-none w-1/2 lg:w-1/3">
          <img src={selectedImage} alt="Selected Controller" className="w-full rounded-lg" />
          <div className="flex space-x-6 mt-4"> {/* Increased space-x value */}
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Controller ${index + 1}`}
                className={`w-16 h-16 rounded-lg cursor-pointer ${selectedImage === image ? 'transform scale-125' : ''}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 lg:ml-6">
          <h2 className="text-2xl font-bold text-foreground pt-6">YUNBO 12V White LED Strip Lights Narrow 4mm Width Super Thin</h2>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">★★★★☆</span>
            <span className="text-muted-foreground ml-2">(150 Reviews)</span>
          </div>
          <p className="text-xl font-semibold text-primary mt-2">$192.00</p>
          <p className="text-muted-foreground mt-2">In Stock</p>
          {/* <div className="mt-4">
            <label htmlFor="quantity" className="block text-muted-foreground">Colours:</label>
            <div className="flex items-center space-x-2 mt-1">
              <span className="w-6 h-6 bg-black rounded-full"></span>
              <span className="w-6 h-6 bg-white rounded-full"></span>
            </div>
          </div> */}
          <div className="flex items-center mt-4">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="hover:bg-red-600 bg-red-600 rounded-l-md px-3 py-1 text-white"
            >
              -
            </button>
            <span className="px-4 py-1 border-t border-b border-gray-300">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="hover:bg-red-600 bg-red-600 rounded-r-md px-3 py-1 text-white"
            >
              +
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white rounded-md p-2 ml-2">Buy Now</button>
          </div>
          <div className="mt-4">
            <p className="text-muted-foreground text-sm">Free Delivery</p>
            <p className="text-muted-foreground text-sm">Return Delivery</p>
          </div>
        </div>
      </div>
      <RelatedProducts />
      <Footer />
    </>
  );
}
