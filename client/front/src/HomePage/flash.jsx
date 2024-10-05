import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { Gamepad, Lightbulb, Monitor, Cable } from 'lucide-react';

const AnimatedIcon = ({ Icon, position, delay }) => {
  const ref = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() - delay;
    ref.current.position.y = position[1] + Math.sin(t * 2) * 0.1;
    ref.current.rotation.y = Math.sin(t) * 0.1;
  });

  return (
    <motion.group 
      ref={ref} 
      position={position}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Html transform>
        <Icon size={32} color="#000000" />
      </Html>
    </motion.group>
  );
};

const ProductCube = ({ position, color, delay }) => {
  const ref = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() - delay;
    ref.current.rotation.x = Math.sin(t) * 0.2;
    ref.current.rotation.y = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <motion.mesh 
      ref={ref} 
      position={position}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial color={color} />
    </motion.mesh>
  );
};

const AnimatedShowcase = () => {
  const ref = useRef();

  return (
    <group ref={ref}>
      <ProductCube position={[-2, 0, 0]} color="#ff6b6b" delay={0} />
      <ProductCube position={[2, 0, 0]} color="#4ecdc4" delay={0.2} />
      <ProductCube position={[0, 2, 0]} color="#45b7d1" delay={0.4} />
      <ProductCube position={[0, -2, 0]} color="#f9ca24" delay={0.6} />

      <AnimatedIcon Icon={Gamepad} position={[-1.5, 1.5, 0]} delay={0.8} />
      <AnimatedIcon Icon={Lightbulb} position={[1.5, 1.5, 0]} delay={1} />
      <AnimatedIcon Icon={Monitor} position={[-1.5, -1.5, 0]} delay={1.2} />
      <AnimatedIcon Icon={Cable} position={[1.5, -1.5, 0]} delay={1.4} />

      <Text
        position={[0, 3, 0]}
        fontSize={0.5}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        Gaming Paradise
      </Text>
    </group>
  );
};

const FlashSale = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black">Discover Our Gaming Universe</h2>
          <p className="text-lg text-gray-700">Scroll to explore our amazing products</p>
        </div>
        <div className="h-[600px] rounded-lg overflow-hidden shadow-2xl">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedShowcase />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
