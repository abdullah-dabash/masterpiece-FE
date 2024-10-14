import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { motion } from 'framer-motion-3d';
import { easing } from 'maath';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Nano Leaf', modelFile: '/assets/nano_leaf.glb', scale: 0.5 },
  { id: 2, name: 'panels', modelFile: '/assets/CherrySign.glb', scale: 4 },
  { id: 3, name: 'accessories', modelFile: '/assets/razerSpeakers.glb', scale: 0.02 },
  { id: 4, name: 'chairs', modelFile: '/assets/typingChair.glb', scale: 1.5 },
  { id: 5, name: 'desks', modelFile: '/assets/gaming_desk_rog.glb', scale: 1 },
];

const Room = () => {
  const floorTexture = useLoader(TextureLoader, '/textures/textures.png');
  const wallTexture = useLoader(TextureLoader, '/textures/wall.png');

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>

      <mesh position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      {categories.map((category, index) => (
        <CategoryObject
          key={category.id}
          category={category}
          position={[
            Math.cos((index / categories.length) * Math.PI * 2) * 3,
            0,
            Math.sin((index / categories.length) * Math.PI * 2) * 3,
          ]}
        />
      ))}

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </>
  );
};

const CategoryObject = ({ category, position }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      category.modelFile,
      (gltf) => {
        gltf.scene.scale.set(category.scale, category.scale, category.scale);
        setModel(gltf.scene);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading GLTF model:', error);
        setLoading(false);
      }
    );
  }, [category.modelFile, category.scale]);

  const handleClick = () => {
    navigate(`/products?category=${category.name}`);
  };

  useFrame((state, delta) => {
    if (meshRef.current) {
      easing.damp3(
        meshRef.current.position,
        [position[0], position[1] + (hovered ? 0.5 : 0), position[2]],
        0.5,
        delta
      );
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <motion.group
      ref={meshRef}
      position={position}
      scale={hovered ? 1.5 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      {loading ? (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      ) : model ? (
        <primitive object={model} />
      ) : (
        <meshStandardMaterial color="red" />
      )}
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {category.name}
      </Text>
    </motion.group>
  );
};

const BrowseByCategory = () => {
  return (
    <section className="py-10 bg-black text-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Explore Your 3D Gaming Room</h2>
          <p className="mt-2">Hover over the objects to see categories</p>
        </div>
        <div className="h-[600px] rounded-lg overflow-hidden shadow-2xl">
          <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
            <OrbitControls enableZoom={false} />
            <Room />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
