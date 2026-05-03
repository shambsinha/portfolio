import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    id: 1,
    name: 'Tripzy',
    tagline: 'Hotel & Flight Booking Platform',
    description:
      'A full-stack travel booking application enabling users to search, compare, and book flights and hotels. Features real-time seat availability, dynamic pricing engine, and a microservice-based reservation workflow with distributed transaction management.',
    tech: ['Java', 'Spring Boot', 'React', 'MySQL', 'Spring Cloud', 'REST APIs', 'JWT Auth'],
    color: '#06b6d4',
    gradientFrom: 'rgba(6,182,212,0.15)',
    gradientTo: 'rgba(59,130,246,0.05)',
    icon: '✈️',
    features: ['Real-time inventory sync', 'Distributed booking flow', 'Payment gateway integration', 'Multi-city search'],
    github: 'https://github.com/shambsinha',
    live: null,
    badge: 'Full Stack',
  },
  {
    id: 2,
    name: 'Quantfit',
    tagline: 'AI-Powered Fitness Tracker',
    description:
      'A real-time fitness tracking application that leverages the MediaPipe ML library for computer vision-based exercise rep counting. Uses pose estimation to detect body landmarks and accurately count repetitions for various exercises without wearables.',
    tech: ['Python', 'MediaPipe', 'React', 'OpenCV', 'TensorFlow Lite', 'FastAPI', 'WebSockets'],
    color: '#8b5cf6',
    gradientFrom: 'rgba(139,92,246,0.15)',
    gradientTo: 'rgba(236,72,153,0.05)',
    icon: '💪',
    features: ['MediaPipe pose estimation', 'Real-time rep counting', 'Live webcam feed', 'Exercise library'],
    github: 'https://github.com/shambsinha',
    live: 'https://quantfit.vercel.app/',
    badge: 'ML / AI',
  },
  {
    id: 3,
    name: 'SkillLink',
    tagline: 'Service Provider Web Application',
    description:
      'Developed a full-stack task management web application integrating MongoDB for efficient data storage and retrieval. Implemented secure OTP-based authentication using NodeMailer to enhance user verification and security — enabling a trusted service-provider marketplace.',
    tech: ['JavaScript', 'EJS', 'CSS', 'NodeMailer', 'MongoDB', 'Node.js', 'Express'],
    color: '#10b981',
    gradientFrom: 'rgba(16,185,129,0.15)',
    gradientTo: 'rgba(6,182,212,0.04)',
    icon: '🔗',
    features: ['OTP-based authentication', 'MongoDB data layer', 'Service provider listings', 'Task management flow'],
    github: 'https://github.com/shambsinha',
    live: 'https://skill-link-3jtd.onrender.com/',
    date: 'June 2024',
    badge: 'Full Stack',
  },
];

function TiltCard({ project }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 12, y: dx * 12 });
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setGlowPos({ x: 50, y: 50 });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: '1500px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        style={{
          position: 'relative',
          borderRadius: '20px',
          background: 'rgba(13, 21, 38, 0.8)',
          border: `1px solid ${project.color}22`,
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          cursor: 'default',
        }}
      >
        {/* Dynamic mouse glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${project.color}15 0%, transparent 60%)`,
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'background 0.1s ease',
        }} />

        {/* Top accent bar */}
        <div style={{
          height: '3px',
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
        }} />

        {/* Header area */}
        <div style={{
          padding: '2rem 2rem 1.5rem',
          background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '2rem' }}>{project.icon}</span>
                <div>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#f0f6ff',
                    letterSpacing: '-0.02em',
                  }}>{project.name}</h3>
                  <p style={{ fontSize: '0.82rem', color: project.color, fontWeight: 500, marginTop: '2px' }}>
                    {project.tagline}
                  </p>
                </div>
              </div>
            </div>
            <span style={{
              padding: '4px 14px',
              borderRadius: '999px',
              background: `${project.color}18`,
              border: `1px solid ${project.color}44`,
              fontSize: '0.72rem',
              color: project.color,
              fontWeight: 600,
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
            }}>{project.badge}</span>
          </div>

          <p style={{
            fontSize: '0.88rem',
            color: '#94a3b8',
            lineHeight: 1.7,
          }}>{project.description}</p>
        </div>

        {/* Features */}
        <div style={{ padding: '0 2rem 1.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{
            height: '1px',
            background: `linear-gradient(90deg, ${project.color}33, transparent)`,
            marginBottom: '1.25rem',
          }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
            {project.features.map((f) => (
              <span key={f} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                fontSize: '0.75rem',
                color: '#64748b',
              }}>
                <span style={{ color: project.color, fontSize: '0.6rem' }}>●</span>
                {f}
              </span>
            ))}
          </div>

          {/* Tech stack */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.7rem', color: '#475569', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
              TECH STACK
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.tech.map((t) => (
                <span key={t} style={{
                  padding: '3px 10px',
                  borderRadius: '4px',
                  background: `${project.color}12`,
                  border: `1px solid ${project.color}25`,
                  fontSize: '0.72rem',
                  color: project.color,
                  fontFamily: 'monospace',
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: `0 0 20px ${project.color}44` }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                borderRadius: '8px',
                background: `linear-gradient(135deg, ${project.color}22, ${project.color}11)`,
                border: `1px solid ${project.color}44`,
                color: project.color,
                fontSize: '0.82rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </motion.a>
            {project.live ? (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 24px ${project.color}55, 0 6px 24px rgba(0,0,0,0.4)`,
                  y: -2,
                }}
                whileTap={{ scale: 0.97, y: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 22px',
                  borderRadius: '8px',
                  background: `linear-gradient(135deg, ${project.color}, ${project.color}bb)`,
                  border: 'none',
                  color: '#030712',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  cursor: 'pointer',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                View Project
              </motion.a>
            ) : (
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: '#475569',
                  fontSize: '0.78rem',
                  cursor: 'not-allowed',
                }}
              >
                🔒 Demo Soon
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="projects" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 20% 60%, rgba(6,182,212,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >

          <h2
            className="font-grotesk"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800,
              color: '#f0f6ff',
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            Things I've{' '}
            <span className="text-gradient-purple">Built</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Architecting scalable solutions and interactive experiences with modern engineering standards.
          </p>
        </motion.div>

        {/* Project cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: '2rem',
        }}>
          {projects.map((p) => (
            <TiltCard key={p.id} project={p} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="minmax"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
