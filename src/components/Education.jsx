import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const education = [
  {
    id: 1,
    degree: 'Bachelor of Engineering in Computer Science (BE-CSE)',
    institution: 'Chitkara University',
    location: 'Himachal Pradesh, India',
    period: 'Aug. 2022 – June 2026',
    status: 'In Progress',
    color: '#10b981',
    icon: '🎓',
    highlights: [
      'Core focus on Data Structures, Algorithms, Operating Systems & Database Management',
      'Actively developing backend engineering skills through industry internships and projects',
      'Contributed to open-source projects and hackathons alongside coursework',
    ],
    tags: ['Computer Science', 'B.E.', 'Full Stack', 'Backend Engineering'],
  },
];

export default function Education() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="education" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
      {/* Background radial */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 40%, rgba(16,185,129,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Section header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
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
            My{' '}
            <span style={{
              background: 'linear-gradient(135deg, #10b981, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Academic</span>{' '}Foundation
          </h2>
          <p style={{ color: '#64748b', maxWidth: '460px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Where the passion for building systems began.
          </p>
        </motion.div>

        {/* Education card */}
        {education.map((edu, index) => (
          <EduCard key={edu.id} edu={edu} index={index} />
        ))}
      </div>
    </section>
  );
}

function EduCard({ edu, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ position: 'relative' }}
    >
      {/* Decorative vertical beam */}
      <div style={{
        position: 'absolute',
        left: '-2rem',
        top: 0,
        bottom: 0,
        width: '2px',
        background: `linear-gradient(180deg, ${edu.color}, transparent)`,
        borderRadius: '1px',
        opacity: 0.4,
      }} />

      <div
        className="glass-card"
        style={{
          padding: '2rem 2.5rem',
          borderColor: `${edu.color}25`,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Top gradient bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: `linear-gradient(90deg, ${edu.color}, #06b6d4, transparent)`,
        }} />

        {/* Corner glow */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '180px', height: '180px',
          background: `radial-gradient(circle, ${edu.color}12 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {/* Icon badge */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25, type: 'spring', stiffness: 200 }}
            style={{
              width: '60px', height: '60px', borderRadius: '14px', flexShrink: 0,
              background: `linear-gradient(135deg, ${edu.color}22, ${edu.color}44)`,
              border: `1.5px solid ${edu.color}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.8rem',
              boxShadow: `0 0 24px ${edu.color}30`,
            }}
          >
            {edu.icon}
          </motion.div>

          {/* Title block */}
          <div style={{ flex: 1, minWidth: '220px' }}>
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.2rem', fontWeight: 800,
              color: '#f0f6ff', letterSpacing: '-0.01em',
              marginBottom: '0.3rem', lineHeight: 1.3,
            }}>{edu.degree}</h3>
            <p style={{ fontSize: '1rem', fontWeight: 600, color: edu.color, marginBottom: '0.3rem' }}>
              {edu.institution}
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>📍 {edu.location}</span>
              <span style={{ color: '#334155', fontSize: '0.7rem' }}>•</span>
              <span style={{
                padding: '2px 10px', borderRadius: '999px',
                background: `${edu.color}18`, border: `1px solid ${edu.color}33`,
                fontSize: '0.72rem', color: edu.color, fontWeight: 600,
                fontFamily: 'monospace',
              }}>{edu.status}</span>
            </div>
          </div>

          {/* Period */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
              {edu.period}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: `linear-gradient(90deg, ${edu.color}40, transparent)`,
          marginBottom: '1.25rem',
        }} />

        {/* Highlights */}
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.5rem' }}>
          {edu.highlights.map((h, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.65 }}
            >
              <span style={{ color: edu.color, marginTop: '3px', flexShrink: 0 }}>▸</span>
              {h}
            </motion.li>
          ))}
        </ul>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {edu.tags.map((tag) => (
            <span key={tag} style={{
              padding: '4px 12px', borderRadius: '6px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontSize: '0.72rem', color: '#94a3b8',
              fontFamily: 'monospace', letterSpacing: '0.03em',
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
