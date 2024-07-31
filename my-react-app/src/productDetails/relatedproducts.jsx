import React from "react";

const RelatedProducts = () => {
  return (
    <div className="related-products mt-12 pb-10">
      <h2 className="text-2xl font-bold mb-4 pl-10">Related Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-2">
        {/* Product 1 */}
        <div className="related-product p-2 border rounded-lg shadow-lg">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s"
            className="w-full h-32 object-cover mb-2 rounded-lg"
            alt="Related Product 1"
          />
          <h3 className="text-lg font-semibold">LED Bulb</h3>
          <p className="text-gray-600">$5.00</p>
        </div>
        {/* Product 2 */}
        <div className="related-product p-2 border rounded-lg shadow-lg">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s"
            className="w-full h-32 object-cover mb-2 rounded-lg"
            alt="Related Product 2"
          />
          <h3 className="text-lg font-semibold">LED Strip</h3>
          <p className="text-gray-600">$10.00</p>
        </div>
        {/* Product 3 */}
        <div className="related-product p-2 border rounded-lg shadow-lg">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s"
            className="w-full h-32 object-cover mb-2 rounded-lg"
            alt="Related Product 3"
          />
          <h3 className="text-lg font-semibold">Smart LED</h3>
          <p className="text-gray-600">$20.00</p>
        </div>
        {/* Product 4 */}
        <div className="related-product p-2 border rounded-lg shadow-lg">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s"
            className="w-full h-32 object-cover mb-2 rounded-lg"
            alt="Related Product 4"
          />
          <h3 className="text-lg font-semibold">LED Panel</h3>
          <p className="text-gray-600">$15.00</p>
        </div>
        {/* Product 5 */}
        <div className="related-product p-2 border rounded-lg shadow-lg">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThwSjKNvTa_lx07vLu5A1OSk6u1FB1CKSeA&s"
            className="w-full h-32 object-cover mb-2 rounded-lg"
            alt="Related Product 5"
          />
          <h3 className="text-lg font-semibold">LED Bulb</h3>
          <p className="text-gray-600">$5.00</p>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
