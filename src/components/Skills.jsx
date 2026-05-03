import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useInView } from 'framer-motion';

const skills = [
  { name: 'Java', level: 95, icon: '☕', color: '#f59e0b', category: 'Backend' },
  { name: 'Spring Boot', level: 92, icon: '🍃', color: '#10b981', category: 'Backend' },
  { name: 'SQL', level: 88, icon: '🗄️', color: '#3b82f6', category: 'Database' },
  { name: 'React', level: 80, icon: '⚛️', color: '#06b6d4', category: 'Frontend' },
  { name: 'AWS', level: 78, icon: '☁️', color: '#f97316', category: 'Cloud' },
  { name: 'Kafka', level: 82, icon: '📨', color: '#8b5cf6', category: 'Messaging' },
  { name: 'MariaDB', level: 85, icon: '🐬', color: '#06b6d4', category: 'Database' },
  { name: 'Docker', level: 80, icon: '🐳', color: '#2563eb', category: 'DevOps' },
];

const additionalSkills = [
  'Microservices', 'REST APIs', 'Git', 'JUnit', 'Mockito',
  'Spring Security', 'Maven', 'Linux', 'Agile / Scrum', 'SonarQube',
  'OpenAPI', 'Redis', 'CI/CD', 'Hibernate', 'JWT',
];

function FloatingSphere({ position, color, speed }) {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * speed + position[0]) * 0.3;
    meshRef.current.rotation.y = t * 0.5;
  });
  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} wireframe transparent opacity={0.7} />
    </mesh>
  );
}

function SkillsOrbit() {
  const groupRef = useRef();
  useFrame(({ clock }) => { groupRef.current.rotation.y = clock.getElapsedTime() * 0.12; });
  const orbits = skills.map((skill, i) => {
    const angle = (i / skills.length) * Math.PI * 2;
    return { position: [Math.cos(angle) * 2.5, Math.sin(angle * 0.5) * 0.6, Math.sin(angle) * 2.5], color: skill.color, speed: 0.3 + i * 0.05 };
  });
  return (
    <group ref={groupRef}>
      {orbits.map((orb, i) => <FloatingSphere key={i} position={orb.position} color={orb.color} speed={orb.speed} />)}
      <mesh><sphereGeometry args={[0.6, 16, 16]} /><meshStandardMaterial color="#0a1628" metalness={0.9} roughness={0.1} emissive="#06b6d4" emissiveIntensity={0.2} /></mesh>
      <mesh><sphereGeometry args={[0.62, 16, 16]} /><meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.15} /></mesh>
      <mesh rotation={[0.3, 0, 0]}><torusGeometry args={[2.5, 0.008, 8, 80]} /><meshBasicMaterial color="#06b6d4" transparent opacity={0.12} /></mesh>
    </group>
  );
}

function SkillBar({ skill, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      className="glass-card-hover"
      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(13,21,38,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}
    >
      <span style={{ fontSize: '1.4rem' }}>{skill.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f0f6ff', fontFamily: "'Space Grotesk', sans-serif" }}>{skill.name}</span>
          <span style={{ fontSize: '0.72rem', color: skill.color, fontFamily: 'monospace' }}>{skill.level}%</span>
        </div>
        <div style={{ height: '5px', borderRadius: '999px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : {}}
            transition={{ duration: 1, delay: 0.3 + index * 0.07, ease: 'easeOut' }}
            style={{ height: '100%', borderRadius: '999px', background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`, boxShadow: `0 0 8px ${skill.color}66` }}
          />
        </div>
      </div>
      <span style={{ padding: '2px 8px', borderRadius: '4px', background: `${skill.color}18`, fontSize: '0.65rem', color: skill.color, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{skill.category}</span>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="skills" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <motion.div ref={titleRef} initial={{ opacity: 0, y: 30 }} animate={titleInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>

          <h2 className="font-grotesk" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#f0f6ff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            My <span className="text-gradient-cyan">Tech Arsenal</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Technologies I wield to build scalable, fault-tolerant systems.
          </p>
        </motion.div>

        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '3rem' }}>
          <div style={{ height: '380px', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '20%', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(6,182,212,0.1) 0%, transparent 70%)', filter: 'blur(20px)' }} />
            <Canvas camera={{ position: [0, 2, 8], fov: 50 }} gl={{ alpha: true, antialias: false }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.5} />
              <pointLight position={[5, 5, 5]} intensity={1} color="#06b6d4" />
              <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />
              <SkillsOrbit />
            </Canvas>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {skills.map((skill, i) => <SkillBar key={skill.name} skill={skill} index={i} inView={inView} />)}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
          <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#475569', letterSpacing: '0.15em', fontFamily: 'monospace', marginBottom: '1.25rem' }}>ADDITIONAL TECHNOLOGIES</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem' }}>
            {additionalSkills.map((skill, i) => (
              <motion.span key={skill} initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.5 + i * 0.04 }} whileHover={{ scale: 1.08 }}
                style={{ padding: '6px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'monospace', cursor: 'default' }}>
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
