import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function LogoShape() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.4;
      meshRef.current.rotation.y = t * 0.6;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshDistortMaterial
        color="#06b6d4"
        speed={2}
        distort={0.4}
        radius={1}
        emissive="#06b6d4"
        emissiveIntensity={0.5}
        wireframe
      />
    </mesh>
  );
}

export default function Logo3D() {
  return (
    <div style={{ width: '40px', height: '40px' }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
          <LogoShape />
        </Float>
      </Canvas>
    </div>
  );
}
