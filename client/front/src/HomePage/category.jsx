import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber'; // Add useFrame here
import { OrbitControls, Text } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { motion } from 'framer-motion-3d';
import { easing } from 'maath';

// Sample data for categories
const categories = [
  { id: 1, name: 'LED strips', logo: 'https://static.vecteezy.com/system/resources/previews/036/323/329/original/grow-light-led-strip-colored-icon-or-logo-element-vector.jpg' },
  { id: 2, name: 'LED panels', logo: 'https://eu-cdn.nanoleaf.me/assets/img/products/shapes/owl/triangles/smk/9pk/2-floating-nanoleaf-shapes-light-panels-triangles-starter-kit@1x.png' },
  { id: 3, name: 'Posters', logo: 'https://i.ebayimg.com/images/g/OmIAAOSw2G5kT3LU/s-l1200.webp' },
  { id: 4, name: 'Chairs', logo: 'https://workspace.com.pk/wp-content/uploads/2023/03/gaming-chair-post-07-700x700-1.jpg' },
  { id: 5, name: 'Desks', logo: 'https://images.thdstatic.com/productImages/b13f63d9-af2d-462f-a503-2b942b750214/svn/black-carbon-fiber-bestier-gaming-desks-d471z-gamd-31_600.jpg' },
];

const fallbackTextureUrl = 'https://workspace.com.pk/wp-content/uploads/2023/03/gaming-chair-post-07-700x700-1.jpg'; // Placeholder image

const Room = () => {
  const floorTexture = useLoader(TextureLoader, '/textures/textures.png');
  const wallTexture = useLoader(TextureLoader, '/textures/wall.png');

  return (
    <>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>

      {/* Walls */}
      <mesh position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      {/* Category Objects */}
      {categories.map((category, index) => (
        <CategoryObject
          key={category.id}
          category={category}
          position={[
            Math.cos((index / categories.length) * Math.PI * 2) * 3,
            Math.sin((index / categories.length) * Math.PI * 2) * 0.5,
            Math.sin((index / categories.length) * Math.PI * 2) * 3
          ]}
        />
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </>
  );
};

const CategoryObject = ({ category, position }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState(null);
  const [loadingError, setLoadingError] = useState(false);

  // Load the texture
  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(
      category.logo,
      (loadedTexture) => {
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
        setLoadingError(true); // Set loading error state
      }
    );
  }, [category.logo]);

  // Use fallback texture if loading failed
  const finalTexture = loadingError ? new TextureLoader().load(fallbackTextureUrl) : texture;

  useFrame((state, delta) => {
    if (meshRef.current) {
      easing.damp3(meshRef.current.position, [
        position[0],
        position[1] + (hovered ? 0.5 : 0),
        position[2]
      ], 0.5, delta);

      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <motion.mesh
      ref={meshRef}
      position={position}
      scale={hovered ? 1.2 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      whileHover={{ scale: 1.2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={finalTexture} />
      <Text
        position={[0, -0.7, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {category.name}
      </Text>
    </motion.mesh>
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
