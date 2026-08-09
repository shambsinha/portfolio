import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

const certificationData = [
  {
    name: 'Oracle Agentic AI Certified Foundations Associate',
    issuer: 'Oracle',
    date: 'July 2026',
    link: 'https://drive.google.com/file/d/1Yjj5w91AyQuptm6ihFMRHcheOYxkD3Sx/view?usp=sharing',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.3 6.2 11 2l1.7 4.2c.4 1 .9 1.5 1.9 1.9L19 10l-4.4 1.9c-1 .4-1.5.9-1.9 1.9L11 18l-1.7-4.2c-.4-1-.9-1.5-1.9-1.9L3 10l4.4-1.9c1-.4 1.5-.9 1.9-1.9Z" />
        <path d="m14 17 1-2 2-1-2-1-1-2-1 2-2 1 2 1 1 2Z" />
      </svg>
    ),
    color: '#f59e0b',
  },
  {
    name: 'Oracle Cloud Infrastructure 2025 Certified Developer Professional',
    issuer: 'Oracle',
    date: 'October 2025',
    link: 'https://drive.google.com/file/d/1LhOR0O2ZEllydhA09Z8sLjwV3xZGLSc4/view?usp=drive_link',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4.435c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5 7.5-3.358 7.5-7.5-3.358-7.5-7.5-7.5zm0 12.3c-2.651 0-4.8-2.149-4.8-4.8s2.149-4.8 4.8-4.8 4.8 2.149 4.8 4.8-2.149 4.8-4.8 4.8z"/>
      </svg>
    ),
    color: '#f59e0b',
  },
  {
    name: 'Oracle Cloud Infrastructure 2025 Certified DevOps Professional',
    issuer: 'Oracle',
    date: 'October 2025',
    link: 'https://drive.google.com/file/d/13BfXnusU-h3o-yEVIL0kWM7XVqzPwRbk/view?usp=drive_link',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    color: '#f59e0b',
  },
  {
    name: 'Oracle Cloud Infrastructure 2025 Certified Data Science Professional',
    issuer: 'Oracle',
    date: 'October 2025',
    link: 'https://drive.google.com/file/d/1XATR_Wd_pvJxZSS59uFLeNIbV3Wlz8kf/view?usp=drive_link',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    color: '#f59e0b',
  },
  {
    name: 'Introduction to OpenShift Applications (DO101)',
    issuer: 'Red Hat',
    date: 'May 2023',
    link: 'https://drive.google.com/file/d/1mu9jjGEVYR17oDZOa2MM3bM24QTOkMVS/view?usp=drive_link',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
      </svg>
    ),
    color: '#ef4444',
  },
  {
    name: 'Red Hat System Administration I (RH124)',
    issuer: 'Red Hat',
    date: 'May 2023',
    link: 'https://drive.google.com/file/d/1uUqCf557sl4KifEhBVmgzOAD0Y0-YxHh/view?usp=drive_link',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6" y2="6.01" />
        <line x1="6" y1="18" x2="6" y2="18.01" />
      </svg>
    ),
    color: '#ef4444',
  },
  {
    name: 'Google Cloud Study Jams Campaign',
    issuer: 'Google Developer Student Clubs',
    date: 'October 2023',
    link: 'https://drive.google.com/file/d/1CKCE2nAUCO7Y-QMf0G0sBr9O6KcryF7U/view?usp=drive_link',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
    color: '#3b82f6',
  },
  {
    name: 'Marketing Intern Certificate',
    issuer: 'Bleep Education',
    date: 'February 2026',
    link: 'https://drive.google.com/file/d/1kg2QQXKo_GdJgABlF8cwH4iehLoYMDfc/view?usp=drive_link',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    ),
    color: '#10b981',
  },
  {
    name: 'Ecell Ambassador Program',
    issuer: 'Coincent & IIT Roorkee',
    date: 'March 2023',
    link: 'https://drive.google.com/file/d/1du1Ja8Sz6Sn_R6ypvpctw__FxJhw81Au/view?usp=drive_link',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    color: '#6366f1',
  },
];

function CertCard({ cert, index }) {
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
    setTilt({ x: -dy * 10, y: dx * 10 });
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
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="glass-card glass-card-hover"
        style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          borderColor: `${cert.color}20`,
          position: 'relative',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Dynamic Glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${cert.color}15 0%, transparent 60%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '12px', flexShrink: 0,
            background: `${cert.color}15`, border: `1px solid ${cert.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem',
            boxShadow: `0 0 20px ${cert.color}18`,
          }}>{cert.icon}</div>
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontSize: '1rem', fontWeight: 700, color: '#f0f6ff',
              lineHeight: 1.4, marginBottom: '0.5rem', fontFamily: "'Space Grotesk', sans-serif"
            }}>{cert.name}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: cert.color }}>{cert.issuer}</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>{cert.date}</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', position: 'relative', zIndex: 1 }}>
          <motion.a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, background: `${cert.color}25` }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', borderRadius: '8px',
              background: `${cert.color}15`, border: `1px solid ${cert.color}30`,
              color: cert.color, fontSize: '0.82rem', fontWeight: 700,
              textDecoration: 'none', transition: 'all 0.2s ease',
            }}
          >
            View Credential
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Certifications() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="certifications" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 70% 50%, rgba(139,92,246,0.04) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >

          <h2 className="font-grotesk" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#f0f6ff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Certifications & <span className="text-gradient-purple">Achievements</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            A collection of professional certifications and academic milestones that validate my technical expertise.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {certificationData.map((cert, i) => (
            <CertCard key={i} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
