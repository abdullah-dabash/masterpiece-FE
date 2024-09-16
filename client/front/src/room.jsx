// src/components/Room.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Model = ({ url }) => {
  const { scene } = useGLTF(url);

  if (!scene) {
    console.error('Model scene not available');
    return null;
  }

  return <primitive object={scene} scale={[1, 1,1]} />; // Adjust the scale as needed
};

const Room = ({ modelUrl }) => {
  return (
    <Canvas style={{ height: '500px', width: '100%' }} camera={{ position: [0, 1, 3], fov: 50 }}>
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={1} // Adjust the minimum zoom distance
        maxDistance={10} // Adjust the maximum zoom distance
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Model url={modelUrl} />
    </Canvas>
  );
};

export default Room;
