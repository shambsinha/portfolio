import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 800 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.02;
      pointsRef.current.rotation.x = t * 0.01;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#f0f6ff"
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.3}
        />
      </Points>
    </group>
  );
}

function FloatingNodes({ count = 60 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 15,
      ],
      speed: Math.random() * 0.003 + 0.001,
      offset: Math.random() * Math.PI * 2,
      scale: Math.random() * 0.08 + 0.03,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    particles.forEach((p, i) => {
      const x = p.position[0];
      const y = p.position[1] + Math.sin(t * p.speed * 100 + p.offset) * 0.5;
      const z = p.position[2];
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#06b6d4" transparent opacity={0.15} />
    </instancedMesh>
  );
}

function DataLines({ count = 20 }) {
  const lines = useMemo(() => {
    return Array.from({ length: count }, () => {
      const startX = (Math.random() - 0.5) * 30;
      const startY = (Math.random() - 0.5) * 20;
      const startZ = (Math.random() - 0.5) * 10;
      const endX = startX + (Math.random() - 0.5) * 8;
      const endY = startY + (Math.random() - 0.5) * 8;
      const endZ = startZ + (Math.random() - 0.5) * 4;
      const points = [
        new THREE.Vector3(startX, startY, startZ),
        new THREE.Vector3(endX, endY, endZ),
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return geometry;
    });
  }, [count]);

  return (
    <>
      {lines.map((geo, i) => (
        <line key={i}>
          <primitive object={geo} attach="geometry" />
          <lineBasicMaterial
            color={i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#06b6d4' : '#3b82f6'}
            transparent
            opacity={0.07}
          />
        </line>
      ))}
    </>
  );
}

function GridPlane() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.position.y = -8 + Math.sin(clock.getElapsedTime() * 0.1) * 0.3;
  });

  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(40, 40, 20, 20);
    return g;
  }, []);

  return (
    <mesh ref={ref} geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
      <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.04} />
    </mesh>
  );
}

export default function BackgroundScene() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Particles />
        <FloatingNodes count={50} />
        <DataLines count={25} />
        <GridPlane />
      </Canvas>
    </div>
  );
}
