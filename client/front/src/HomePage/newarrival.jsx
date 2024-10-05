import React from 'react';

const NewArrival = () => {
  return (
    <div className="bg-white px-4 py-12 text-zinc-50 pb-20"> {/* Removed min-h-screen */}
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        New Arrival
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Large Image */}
        <div className="md:col-span-2 relative overflow-hidden rounded-lg">
          <img
            src="https://m.media-amazon.com/images/I/71BO5OYWvaL._AC_UF1000,1000_QL80_.jpg"
            alt="Large"
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
          />
        </div>

        {/* Side Images */}
        <div className="flex flex-col gap-4">
          <img
            src="https://duet-cdn.vox-cdn.com/thumbor/0x0:3200x2133/640x427/filters:focal(1600x1067:1601x1068):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/25204530/Razer_Aether_Monitor_Light_Bar_Render_07__1_.jpg"
            alt="Top Side"
            className="w-full h-1/2 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 rounded-lg"
          />
          <img
            src="https://www.zdnet.com/a/img/resize/3d27b95f71415c55749cd306ca450114fc81a336/2024/03/06/4970dfb7-eb2f-469c-a36d-5bff2d459bc0/lume-cube-tube-light-mini.jpg?auto=webp&fit=crop&height=360&width=640"
            alt="Bottom Side"
            className="w-full h-1/2 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default NewArrival; // Changed to default export
