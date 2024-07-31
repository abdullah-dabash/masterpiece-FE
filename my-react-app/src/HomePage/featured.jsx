import React from 'react';

export default function Featured() {
    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <div className="relative bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg overflow-hidden">
                <img
                    src="https://wallpaperaccess.com/full/5872521.jpg"
                    alt="Horizon Forbidden West"
                    className="w-full object-cover h-64"
                />
                <div className="absolute top-4 left-4 bg-white text-blue-500 px-4 py-2 rounded-full shadow-md font-bold">EXCLUSIVE</div>
                <div className="absolute top-4 right-4 bg-white text-green-500 px-4 py-2 rounded-full shadow-md font-bold">NEW ARRIVAL</div>
            </div>
            <h2 className="text-3xl font-extrabold text-center mt-6 text-gray-800">Featured 🔥</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
                <div className="relative group transition-transform transform hover:scale-105">
                    <img
                        src="https://i.etsystatic.com/25699268/r/il/ba927c/2733796021/il_fullxfull.2733796021_twh5.jpg"
                        alt="Sonic Mania - Switch"
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow-md">Sold out</span>
                </div>
                <div className="relative group transition-transform transform hover:scale-105">
                    <img
                        src="https://i.pinimg.com/736x/4b/5d/75/4b5d751d859d01b4cbeed60a393d3b47.jpg"
                        alt="Mario Kart 8 Deluxe"
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-4 py-1 rounded-full shadow-md">45 JOD</div>
                </div>
                <div className="relative group transition-transform transform hover:scale-105">
                    <img
                        src="https://amsiot.com/wp-content/uploads/2020/11/blog-lego-light@2x.png"
                        alt="Super Smash Bros"
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-4 py-1 rounded-full shadow-md">45 JOD</div>
                </div>
                <div className="relative group transition-transform transform hover:scale-105">
                    <img
                        src="https://store.yeelight.com/cdn/shop/files/yeelight-smart-panels-2.jpg?v=1697528891"
                        alt="The Legend Of Zelda"
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-4 py-1 rounded-full shadow-md">45 JOD</div>
                </div>
                <div className="relative group transition-transform transform hover:scale-105">
                    <img
                        src="https://www.batna24.com/img2/500/332491_162455.webp?20989284201"
                        alt="Luigi's Mansion 3"
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-4 py-1 rounded-full shadow-md">45 JOD</div>
                </div>
                <div className="relative group transition-transform transform hover:scale-105">
                    <img
                        src="https://i.pinimg.com/originals/94/65/36/946536bc794090f718a88a16b2176106.jpg"
                        alt="Super Mario Odyssey"
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-4 py-1 rounded-full shadow-md">45 JOD</div>
                </div>
                <div className="relative group transition-transform transform hover:scale-105">
                    <img
                        src="https://wallpaperaccess.com/full/9945979.jpg"
                        alt="Super Mario Odyssey"
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-4 py-1 rounded-full shadow-md">45 JOD</div>
                </div>
                <div className="relative group transition-transform transform hover:scale-105">
                    <img
                        src="https://9to5toys.com/wp-content/uploads/sites/5/2022/06/Govee-Glide-Hexa-Pro-wall.jpg?w=1024"
                        alt="Super Mario Odyssey"
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-4 py-1 rounded-full shadow-md">45 JOD</div>
                </div>
            </div>
        </div>
    );
}
