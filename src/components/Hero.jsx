import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Profile3D from './three/Profile3D';

const TYPING_STRINGS = [
  'Full-Stack Engineer',
  'Backend Developer',
  'Spring Boot Expert',
  'System Integrator',
];

function TypingAnimation() {
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_STRINGS[stringIndex];
    let timeout;

    if (!deleting && charIndex < current.length) {
      // Typing
      timeout = setTimeout(() => setCharIndex((prev) => prev + 1), 65);
    } else if (!deleting && charIndex === current.length) {
      // Finished typing, wait before deleting
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      // Deleting
      timeout = setTimeout(() => setCharIndex((prev) => prev - 1), 35);
    } else if (deleting && charIndex === 0) {
      // Finished deleting, move to next string
      timeout = setTimeout(() => {
        setDeleting(false);
        setStringIndex((prev) => (prev + 1) % TYPING_STRINGS.length);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, stringIndex]);

  const displayText = TYPING_STRINGS[stringIndex].slice(0, charIndex);

  return (
    <span style={{ color: '#06b6d4' }}>
      {displayText}
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1.1em',
          background: '#06b6d4',
          marginLeft: '3px',
          verticalAlign: 'middle',
          animation: 'blink 0.8s step-end infinite',
        }}
      />
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}

export default function Hero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '80px',
      }}
    >
      {/* Radial gradient background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 60% 50%, rgba(6,182,212,0.07) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.07) 0%, transparent 50%)',
        zIndex: 1,
      }} />

      <div style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Left: Text Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '0.8rem',
              color: '#f0f6ff',
              letterSpacing: '-0.02em',
            }}
          >
            Hi, I'm{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Shamb
            </span>
            <br />
            <span style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#94a3b8', letterSpacing: '-0.01em' }}>
              Software Engineer
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.2rem, 3vw, 1.75rem)',
              fontWeight: 600,
              color: '#94a3b8',
              marginBottom: '1.5rem',
              lineHeight: 1.4,
            }}
          >
            <TypingAnimation />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              fontSize: '1rem',
              lineHeight: 1.75,
              color: '#94a3b8',
              maxWidth: '520px',
              marginBottom: '2.2rem',
            }}
          >
            A motivated Computer Science graduate specialized in building{' '}
            <strong style={{ color: '#f0f6ff' }}>scalable applications</strong>,{' '}
            <strong style={{ color: '#f0f6ff' }}>high-performance APIs</strong>, and{' '}
            <strong style={{ color: '#f0f6ff' }}>robust data pipelines</strong>.
          </motion.p>

          {/* Tech stack tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.5rem' }}
          >
            {[
              { label: 'Java',            color: '#f59e0b' },
              { label: 'Full-Stack',       color: '#06b6d4' },
              { label: 'Spring Boot',      color: '#10b981' },
              { label: 'React & Angular',  color: '#38bdf8' },
              { label: 'Kafka',            color: '#8b5cf6' },
            ].map((tag) => (
              <motion.span
                key={tag.label}
                whileHover={{ scale: 1.06, borderColor: tag.color }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                style={{
                  padding: '5px 14px',
                  borderRadius: '6px',
                  background: `${tag.color}12`,
                  border: `1px solid ${tag.color}35`,
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: tag.color,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: '0.03em',
                  cursor: 'default',
                  transition: 'border-color 0.2s ease',
                }}
              >
                {tag.label}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(6,182,212,0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('projects')}
              style={{
                padding: '14px 32px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                border: 'none',
                color: 'white',
                fontSize: '0.95rem',
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                cursor: 'pointer',
                letterSpacing: '0.03em',
                transition: 'all 0.3s ease',
              }}
            >
              View Projects
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, borderColor: 'rgba(6,182,212,0.6)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('contact')}
              style={{
                padding: '14px 32px',
                borderRadius: '10px',
                background: 'transparent',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                color: '#06b6d4',
                fontSize: '0.95rem',
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                cursor: 'pointer',
                letterSpacing: '0.03em',
                transition: 'all 0.3s ease',
              }}
            >
              Contact Me
            </motion.button>
          </motion.div>
        </div>

        {/* Right: 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          style={{
            width: '100%',
            height: 'min(520px, 60vw)',
            minHeight: '320px',
            position: 'relative',
          }}
        >
          {/* Glow behind canvas */}
          <div style={{
            position: 'absolute',
            inset: '10%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(6,182,212,0.15) 0%, transparent 70%)',
            filter: 'blur(30px)',
            zIndex: 0,
          }} />
          <Profile3D />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 2,
          cursor: 'pointer',
        }}
        onClick={() => scrollToSection('experience')}
      >
        <span style={{ fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '0.15em', fontFamily: 'monospace' }}>SCROLL</span>
        <div style={{
          width: '24px',
          height: '40px',
          border: '2px solid rgba(6,182,212,0.3)',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '6px',
          marginBottom: '1rem',
        }}>
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            style={{
              width: '4px',
              height: '8px',
              borderRadius: '2px',
              background: '#06b6d4',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['#06b6d4', '#8b5cf6', '#3b82f6'].map((c, i) => (
            <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c, boxShadow: `0 0 8px ${c}` }} />
          ))}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .scroll-indicator {
            position: relative !important;
            bottom: 0 !important;
            left: 0 !important;
            transform: none !important;
            margin: 3rem auto 2rem auto !important;
            order: 3;
            width: fit-content;
            display: flex !important;
          }
          #home {
            height: auto !important;
            min-height: 100vh !important;
            padding-bottom: 3rem !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
          }
          #home > div:first-of-type {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 2rem !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
