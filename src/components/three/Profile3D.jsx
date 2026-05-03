import { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import profilePhoto from '../../assets/profile.png';

// Pre-generate random data outside to ensure strict render purity
const GLASS_PANELS_DATA = [0, 1, 2, 3].map((i) => ({
  id: i,
  position: [
    Math.cos(i * Math.PI / 2) * 3,
    Math.sin(i * Math.PI / 2) * 3,
    -1
  ],
  rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
  rotation2: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
}));

const NODES_DATA = Array.from({ length: 25 }).map((_, i) => ({
  id: i,
  position: [
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 8,
    -2.5
  ],
  speed: 1 + Math.random(),
  color: i % 2 === 0 ? "#06b6d4" : "#8b5cf6",
}));

function AmbientSurroundings() {
  const groupRef = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Tech Core */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[0, 0, -2]}>
          <icosahedronGeometry args={[2.5, 1]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.05} wireframe />
        </mesh>
      </Float>

      {/* Orbiting Glass Panels (UI/UX style) */}
      {GLASS_PANELS_DATA.map((panel) => (
        <Float key={panel.id} speed={2} rotationIntensity={2} position={panel.position}>
          <mesh rotation={panel.rotation}>
            <boxGeometry args={[1.2, 0.8, 0.02]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.12} />
          </mesh>
          <mesh rotation={panel.rotation2}>
            <boxGeometry args={[1.22, 0.82, 0.01]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.05} wireframe />
          </mesh>
        </Float>
      ))}
      
      {/* Data Nodes Cluster */}
      {NODES_DATA.map((node) => (
        <Float key={`node-${node.id}`} speed={node.speed} position={node.position}>
          <mesh>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.6} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function Profile3D() {
  const [hover, setHover] = useState(false);
  
  // Parallax tilt logic
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(y, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setHover(false);
  }, [x, y]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Background 3D Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <AmbientSurroundings />
        </Canvas>
      </div>

      {/* Profile Photo Card */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          perspective: "1000px",
          zIndex: 1,
          cursor: 'pointer',
        }}
      >
        <div style={{
          position: 'relative',
          width: 'min(300px, 60vw)',
          height: 'min(300px, 60vw)',
          borderRadius: '50%',
          padding: '8px',
          background: 'rgba(13, 21, 38, 0.4)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Real Photo */}
          <img
            src={profilePhoto}
            alt="Profile"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
              filter: hover ? 'brightness(1.1) contrast(1.05)' : 'brightness(1)',
              transition: 'filter 0.3s ease',
            }}
          />

          {/* UI Scanning Line */}
          <motion.div
            animate={{
              top: ["-10%", "110%"],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              left: 0, right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)',
              boxShadow: '0 0 15px #06b6d4',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />

          {/* Dynamic Shine/Glow Effect */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
              opacity: hover ? 1 : 0,
              pointerEvents: 'none',
              mixBlendMode: 'screen',
            }}
          />
        </div>

        {/* Floating UI Elements */}
        {hover && (
          <>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                position: 'absolute',
                top: '10%',
                right: '-40px',
                padding: '4px 10px',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '4px',
                color: '#06b6d4',
                fontSize: '0.65rem',
                fontFamily: 'monospace',
                backdropFilter: 'blur(5px)',
              }}
            >
              SYS_ACTIVE
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                position: 'absolute',
                bottom: '20%',
                left: '-40px',
                padding: '4px 10px',
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '4px',
                color: '#8b5cf6',
                fontSize: '0.65rem',
                fontFamily: 'monospace',
                backdropFilter: 'blur(5px)',
              }}
            >
              ENCRYPT_ON
            </motion.div>
          </>
        )}

        {/* Layered Glow Rings */}
        <div style={{
          position: 'absolute',
          inset: '-15px',
          borderRadius: '50%',
          border: '1px solid rgba(6, 182, 212, 0.15)',
          opacity: 0.5,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          inset: '-30px',
          borderRadius: '50%',
          border: '1px solid rgba(139, 92, 246, 0.1)',
          opacity: 0.3,
          pointerEvents: 'none',
          animation: 'pulse 4s infinite ease-in-out',
        }} />
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
