import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ServerRack() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.4;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
  });

  // Individual server units
  const servers = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      y: -1.2 + i * 0.45,
      color: i === 2 ? '#06b6d4' : i === 4 ? '#8b5cf6' : '#1e3a5f',
      emissive: i === 2 ? '#06b6d4' : i === 4 ? '#8b5cf6' : '#1e3a5f',
      emissiveIntensity: i === 2 ? 0.5 : i === 4 ? 0.4 : 0.1,
    })), []
  );

  return (
    <group ref={groupRef} scale={[1.1, 1.1, 1.1]}>
      {/* Rack housing */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 3.2, 0.9]} />
        <meshStandardMaterial
          color="#0a1628"
          metalness={0.8}
          roughness={0.2}
          emissive="#06b6d4"
          emissiveIntensity={0.02}
        />
      </mesh>

      {/* Server units */}
      {servers.map((s, i) => (
        <group key={i} position={[0, s.y, 0.46]}>
          <mesh>
            <boxGeometry args={[1.85, 0.38, 0.04]} />
            <meshStandardMaterial
              color={s.color}
              metalness={0.6}
              roughness={0.3}
              emissive={s.emissive}
              emissiveIntensity={s.emissiveIntensity}
            />
          </mesh>
          {/* LED indicators */}
          {[0, 1, 2].map((j) => (
            <mesh key={j} position={[-0.7 + j * 0.15, 0, 0.03]}>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshStandardMaterial
                color={j === 0 ? '#10b981' : j === 1 ? '#06b6d4' : '#f59e0b'}
                emissive={j === 0 ? '#10b981' : j === 1 ? '#06b6d4' : '#f59e0b'}
                emissiveIntensity={1.5}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Decorative rings */}
      {[-0.8, 0, 0.8].map((z, i) => (
        <mesh key={i} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.6, 0.012, 16, 60]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.6}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function OrbitingOrbs() {
  const groupRef = useRef();
  useFrame(({ clock }) => {
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.5;
  });

  const orbs = useMemo(() => [
    { angle: 0, r: 2.5, color: '#06b6d4', size: 0.12 },
    { angle: Math.PI * 0.6, r: 2.8, color: '#8b5cf6', size: 0.09 },
    { angle: Math.PI * 1.2, r: 2.3, color: '#3b82f6', size: 0.11 },
    { angle: Math.PI * 1.8, r: 2.6, color: '#10b981', size: 0.07 },
  ], []);

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={[Math.cos(orb.angle) * orb.r, Math.sin(orb.angle * 0.5) * 0.5, Math.sin(orb.angle) * orb.r]}>
          <sphereGeometry args={[orb.size, 16, 16]} />
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}
      {/* Orbit ring */}
      <mesh rotation={[0.2, 0, 0]}>
        <torusGeometry args={[2.6, 0.006, 8, 80]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function CoreSphere() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    meshRef.current.rotation.z = clock.getElapsedTime() * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[0, 0, -0.5]}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#0d1526"
          wireframe={false}
          metalness={0.9}
          roughness={0.1}
          emissive="#1a3060"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, 0, -0.5]}>
        <icosahedronGeometry args={[1.52, 1]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.2} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#06b6d4" />
      <pointLight position={[-5, -3, 3]} intensity={0.8} color="#8b5cf6" />
      <spotLight position={[0, 8, 4]} intensity={1.5} color="#3b82f6" />

      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
        <ServerRack />
      </Float>
      <OrbitingOrbs />
      <CoreSphere />
    </Canvas>
  );
}
