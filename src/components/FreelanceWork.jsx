import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const freelanceWork = [
  {
    id: 1,
    title: 'Corporate Website — Future Technologies',
    role: 'Freelance Full Stack Developer',
    period: '2026',
    color: '#f59e0b',
    gradientFrom: 'rgba(245,158,11,0.12)',
    gradientTo: 'rgba(251,191,36,0.03)',
    icon: '⚡',
    badge: 'Freelance',
    liveUrl: 'https://future-technologies-gray.vercel.app/',
    summary:
      'Architected and delivered the complete digital presence for Future Technologies — a premier industrial service provider specialising in Online UPS Repairing, Sales & Servicing, and VFD Drive Repairing. The site is engineered to reflect their hallmark reliability and deep technical expertise in power infrastructure, serving clients across industrial and commercial sectors.',
    highlights: [
      'Designed a premium, fully responsive corporate portal with a professional dark theme to establish immediate brand authority',
      'Built reusable React component library with glassmorphic service cards, animated stat counters, and smooth section transitions',
      'Implemented SEO-optimised pages covering UPS Repairing, Sales & Servicing, and VFD Drive Repairing verticals',
      'Deployed to Vercel with CI/CD pipeline — achieving sub-2s load times via code splitting and lazy loading',
    ],
    tech: ['React', 'Vite', 'Framer Motion', 'Tailwind CSS', 'Vercel', 'SEO'],
    services: ['UPS Repairing', 'Sales & Servicing', 'VFD Drive Repairing', 'Power Infrastructure'],
  },
];

function ServiceChip({ label, color }) {
  return (
    <span style={{
      display: 'flex', alignItems: 'center', gap: '5px',
      padding: '4px 12px', borderRadius: '6px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      fontSize: '0.75rem', color: '#64748b',
    }}>
      <span style={{ color, fontSize: '0.55rem' }}>●</span>
      {label}
    </span>
  );
}

export default function FreelanceWork() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="freelance" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
      {/* Background radial */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 70% 40%, rgba(245,158,11,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 2rem' }}>
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
              fontWeight: 800, color: '#f0f6ff',
              letterSpacing: '-0.02em', marginBottom: '1rem',
            }}
          >
            Clients I've{' '}
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Delivered For</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Building professional digital presences for real-world businesses beyond the 9–5.
          </p>
        </motion.div>

        {/* Cards */}
        {freelanceWork.map((work, i) => (
          <FreelanceCard key={work.id} work={work} index={i} />
        ))}
      </div>
    </section>
  );
}

function FreelanceCard({ work, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div style={{
        borderRadius: '20px',
        background: 'rgba(13,21,38,0.8)',
        border: `1px solid ${work.color}20`,
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Animated corner glow */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '300px', height: '300px',
          background: `radial-gradient(circle, ${work.color}10 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />

        {/* Top accent bar */}
        <div style={{
          height: '3px',
          background: `linear-gradient(90deg, ${work.color}, #f97316, transparent)`,
        }} />

        {/* Header */}
        <div style={{
          padding: '2rem 2rem 1.5rem',
          background: `linear-gradient(135deg, ${work.gradientFrom}, ${work.gradientTo})`,
          position: 'relative', zIndex: 1,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              {/* Icon */}
              <div style={{
                width: '52px', height: '52px', borderRadius: '12px', flexShrink: 0,
                background: `${work.color}20`, border: `1.5px solid ${work.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem', boxShadow: `0 0 20px ${work.color}25`,
              }}>{work.icon}</div>
              <div>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.25rem', fontWeight: 800, color: '#f0f6ff',
                  letterSpacing: '-0.01em', marginBottom: '0.25rem', lineHeight: 1.3,
                }}>{work.title}</h3>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.85rem', color: work.color, fontWeight: 500 }}>{work.role}</span>
                  <span style={{
                    padding: '2px 10px', borderRadius: '999px',
                    background: `${work.color}18`, border: `1px solid ${work.color}33`,
                    fontSize: '0.7rem', color: work.color, fontWeight: 600,
                    fontFamily: 'monospace',
                  }}>{work.badge}</span>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace' }}>{work.period}</p>
            </div>
          </div>

          <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.75 }}>{work.summary}</p>
        </div>

        {/* Body */}
        <div style={{ padding: '0 2rem 2rem', position: 'relative', zIndex: 1 }}>
          {/* Divider */}
          <div style={{ height: '1px', background: `linear-gradient(90deg, ${work.color}44, transparent)`, marginBottom: '1.5rem' }} />

          {/* Highlights */}
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
            {work.highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.1 }}
                style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.65 }}
              >
                <span style={{ color: work.color, marginTop: '3px', flexShrink: 0 }}>▸</span>
                {h}
              </motion.li>
            ))}
          </ul>

          {/* Services covered */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.7rem', color: '#475569', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
              SERVICES COVERED
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {work.services.map((s) => <ServiceChip key={s} label={s} color={work.color} />)}
            </div>
          </div>

          {/* Tech stack */}
          <div style={{ marginBottom: '1.75rem' }}>
            <p style={{ fontSize: '0.7rem', color: '#475569', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
              TECH STACK
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {work.tech.map((t) => (
                <span key={t} style={{
                  padding: '3px 10px', borderRadius: '4px',
                  background: `${work.color}12`, border: `1px solid ${work.color}28`,
                  fontSize: '0.72rem', color: work.color, fontFamily: 'monospace',
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Live Site CTA — primary amber button */}
            <motion.a
              href={work.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 28px ${work.color}66, 0 8px 32px rgba(0,0,0,0.4)`,
                y: -2,
              }}
              whileTap={{ scale: 0.97, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '11px 26px', borderRadius: '10px',
                background: `linear-gradient(135deg, ${work.color}, #f97316)`,
                border: 'none',
                color: '#0a0f1e', fontSize: '0.88rem', fontWeight: 700,
                textDecoration: 'none', letterSpacing: '0.02em',
                cursor: 'pointer',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Visit Live Site
            </motion.a>

            {/* Secondary info chip */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '11px 18px', borderRadius: '10px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: '#64748b', fontSize: '0.8rem',
            }}>
              <span style={{ fontSize: '0.9rem' }}>🌐</span>
              future-technologies-gray.vercel.app
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
