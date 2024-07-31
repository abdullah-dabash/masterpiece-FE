// import React, { useState } from "react";
// import "tailwindcss/tailwind.css";
// import Navbar from "../nav";
// import Footer from "../footer";
// import RelatedProducts from "./relatedproducts";

// const ProductComponent = () => {
//   const [selectedImg, setSelectedImg] = useState("https://example.com/led1.jpg");
//   const [activeTab, setActiveTab] = useState("Description");

//   const handleImgClick = (imgSrc) => {
//     setSelectedImg(imgSrc);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container-fluid min-h-screen pt-10 bg-gray-100">
//         <div className="cart p-6 sm:p-8 md:p-12 rounded-2xl shadow-md bg-white">
//           <div className="flex flex-col md:grid md:grid-cols-3 md:gap-6">
//             {/* Main content for large image and product details */}
//             <div className="md:col-span-2">
//               {/* Large image */}
//               <div className="relative w-full h-60 sm:h-72 md:h-80 mb-6">
//                 <img 
//                   src={selectedImg} 
//                   className="w-full h-full object-contain rounded-sm"
//                   alt="Product"
//                 />
//               </div>
//               {/* Thumbnails for mobile view */}
//               <div className="md:hidden flex flex-row gap-1 mt-4 overflow-x-auto">
//                 <img
//                   src="https://m.media-amazon.com/images/I/815sBbUN7LL._AC_UF894,1000_QL80_.jpg"
//                   className="w-16 h-16 cursor-pointer rounded-sm object-cover"
//                   onClick={() => handleImgClick("https://m.media-amazon.com/images/I/815sBbUN7LL._AC_UF894,1000_QL80_.jpg")}
//                   alt="Thumbnail 1"
//                 />
//                 <img
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s"
//                   className="w-16 h-16 cursor-pointer rounded-sm object-cover"
//                   onClick={() => handleImgClick("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s")}
//                   alt="Thumbnail 2"
//                 />
//                 <img
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s"
//                   className="w-16 h-16 cursor-pointer rounded-sm object-cover"
//                   onClick={() => handleImgClick("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s")}
//                   alt="Thumbnail 3"
//                 />
//                 <img
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s"
//                   className="w-16 h-16 cursor-pointer rounded-sm object-cover"
//                   onClick={() => handleImgClick("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s")}
//                   alt="Thumbnail 4"
//                 />
//               </div>
//               {/* Thumbnails for desktop view */}
//               <div className="hidden md:flex flex-row gap-2 mt-4">
//                 <img
//                   src="https://m.media-amazon.com/images/I/815sBbUN7LL._AC_UF894,1000_QL80_.jpg"
//                   className="w-20 h-20 cursor-pointer rounded-sm object-cover"
//                   onClick={() => handleImgClick("https://m.media-amazon.com/images/I/815sBbUN7LL._AC_UF894,1000_QL80_.jpg")}
//                   alt="Thumbnail 1"
//                 />
//                 <img
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s"
//                   className="w-20 h-20 cursor-pointer rounded-sm object-cover"
//                   onClick={() => handleImgClick("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s")}
//                   alt="Thumbnail 2"
//                 />
//                 <img
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s"
//                   className="w-20 h-20 cursor-pointer rounded-sm object-cover"
//                   onClick={() => handleImgClick("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s")}
//                   alt="Thumbnail 3"
//                 />
//                 <img
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s"
//                   className="w-20 h-20 cursor-pointer rounded-sm object-cover"
//                   onClick={() => handleImgClick("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s")}
//                   alt="Thumbnail 4"
//                 />
//               </div>
//             </div>

//             {/* Product details */}
//             <div className="md:col-span-1">
//               <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold italic text-black mb-4">High-Quality LED Light</h1>
//               <div className="reviews flex items-center mb-4">
//                 <i className="fas fa-star text-black"></i>
//                 <i className="fas fa-star text-black"></i>
//                 <i className="fas fa-star text-black"></i>
//                 <i className="fas fa-star-half-alt text-black"></i>
//                 <i className="far fa-star text-black"></i>
//                 <p className="text-gray-500 ml-2">150 reviews</p>
//               </div>
//               <div className="price mb-4">
//                 <span className="text-xl sm:text-2xl font-bold mr-2">$25.00</span>
//                 <span className="line-through text-gray-500 text-sm sm:text-lg">$30.00</span>
//               </div>
//               <div className="mb-4">
//                 <h5 className="text-base sm:text-lg mb-2">Quantity</h5>
//                 <select className="quantity custom-select w-full sm:w-48 cursor-pointer">
//                   <option>1</option>
//                   <option>2</option>
//                   <option>3</option>
//                   <option>4</option>
//                 </select>
//               </div>
//               <div id="product" className="product-inf mt-4">
//                 <ul className="flex list-none mb-4">
//                   <li
//                     className={`p-3 sm:p-4 rounded-lg cursor-pointer ${activeTab === "Description" ? "border-b-4 border-black bg-gray-300" : ""}`}
//                     onClick={() => setActiveTab("Description")}
//                   >
//                     <span className="text-base sm:text-lg font-medium text-black">Product Description</span>
//                   </li>
//                   <li
//                     className={`p-3 sm:p-4 rounded-lg cursor-pointer ${activeTab === "Details" ? "border-b-4 border-black bg-gray-300" : ""}`}
//                     onClick={() => setActiveTab("Details")}
//                   >
//                     <span className="text-base sm:text-lg font-medium text-black">Product Details</span>
//                   </li>
//                 </ul>
//                 <div className="tabs-content" style={{ minHeight: '100px', transition: 'min-height 0.3s ease' }}>
//                   {activeTab === "Description" && (
//                     <div id="Description">
//                       <p>This high-quality LED light is perfect for any setting, offering bright and efficient illumination.</p>
//                     </div>
//                   )}
//                   {activeTab === "Details" && (
//                     <div id="Details">
//                       <p>Details: Power: 10W, Color Temperature: 6000K, Lifespan: 50,000 hours.</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="buttons mt-6 flex flex-col sm:flex-row gap-4">
//                 <a href="#" className="custom-btn bg-red-500 text-white w-full sm:w-48 text-center text-lg rounded-full py-2 font-medium transition-opacity duration-300 hover:bg-red-600">
//                   Add To Cart <i className="fas fa-angle-right ml-2"></i>
//                 </a>
//                 <a href="#" className="custom-btn bg-red-500 text-white w-full sm:w-48 text-center text-lg rounded-full py-2 font-medium transition-opacity duration-300 hover:bg-red-600">
//                   Buy Now <i className="fas fa-angle-right ml-2"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         <RelatedProducts />
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ProductComponent;
import React, { useState } from "react";
import Navbar from "../nav";
import Footer from "../footer";
import RelatedProducts from "./relatedproducts";

export default function Widget() {
  const [selectedImage, setSelectedImage] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s");
  const [quantity, setQuantity] = useState(2); // Initialize quantity state

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s",
  ];

  const handleQuantityChange = (delta) => {
    setQuantity(prevQuantity => Math.max(prevQuantity + delta, 1)); // Ensure quantity is at least 1
  };

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
          <h2 className="text-2xl font-bold text-foreground pt-6">PS5 CONTROLLER</h2>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">★★★★☆</span>
            <span className="text-muted-foreground ml-2">(150 Reviews)</span>
          </div>
          <p className="text-xl font-semibold text-primary mt-2">$192.00</p>
          <p className="text-muted-foreground mt-2">In Stock</p>
          <div className="mt-4">
            <label htmlFor="quantity" className="block text-muted-foreground">Colours:</label>
            <div className="flex items-center space-x-2 mt-1">
              <span className="w-6 h-6 bg-black rounded-full"></span>
              <span className="w-6 h-6 bg-white rounded-full"></span>
            </div>
          </div>
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
            <button className="bg-red-500 text-white rounded-md p-2 ml-2">Buy Now</button>
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
