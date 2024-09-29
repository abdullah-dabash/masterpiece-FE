import React from 'react';
import { Monitor, Zap, CreditCard, Box } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
    <Icon className="w-24 h-24 mb-4 text-black" /> {/* Increased icon size further */}
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-center text-sm">{description}</p>
  </div>
);

const HighEndFeatures = () => {
  const features = [
    {
      icon: Monitor,
      title: "Premium Gaming Gear",
      description: "Shop the latest high-end gaming equipment for your ultimate setup."
    },
    {
      icon: Box, // Using Box icon instead of Cube
      title: "3D Room Design",
      description: "Visualize your perfect gaming space with our 3D room design service."
    },
    {
      icon: Zap,
      title: "Fast Shipping",
      description: "Get your gear quickly with our expedited shipping options."
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Enjoy now and pay later with our easy installment plans."
    }
  ];

  return (
    <div className="bg-white text-black p-8 pb-40">
      <h2 className="text-3xl font-bold text-center mb-8">Why Choose HighEnd.com</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default HighEndFeatures;
