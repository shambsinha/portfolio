import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';



const contactLinks = [
  {
    label: 'Email',
    value: 'shambsinha@gmail.com',
    href: 'mailto:shambsinha@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    color: '#06b6d4',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/shambsinha',
    href: 'https://www.linkedin.com/in/shambsinha',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
      </svg>
    ),
    color: '#3b82f6',
  },
  {
    label: 'GitHub',
    value: 'github.com/shambsinha',
    href: 'https://github.com/shambsinha',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: '#8b5cf6',
  },
];



function ContactLink({ link, index, inView }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (link.label === 'Email') {
      navigator.clipboard.writeText(link.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <motion.a
      href={link.href}
      target={link.label !== 'Email' ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      whileHover={{ scale: 1.02, borderColor: `${link.color}44` }}
      onClick={link.label === 'Email' ? handleCopy : undefined}
      style={{
        display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem',
        borderRadius: '12px', background: 'rgba(13,21,38,0.6)', border: `1px solid ${link.color}18`,
        textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer',
      }}
    >
      <div style={{
        width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
        background: `${link.color}15`, border: `1px solid ${link.color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: link.color,
      }}>{link.icon}</div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '2px' }}>{link.label}</p>
        <p style={{ fontSize: '0.88rem', color: '#94a3b8', fontFamily: 'monospace' }}>{link.value}</p>
      </div>
      {copied && (
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ fontSize: '0.72rem', color: '#10b981', fontFamily: 'monospace' }}>
          ✓ Copied!
        </motion.span>
      )}
      <span style={{ color: link.color, opacity: 0.6, fontSize: '0.9rem' }}>→</span>
    </motion.a>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="contact" style={{ padding: '6rem 0 0', position: 'relative', zIndex: 2 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>

          <h2 className="font-grotesk" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#f0f6ff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Let's <span className="text-gradient-cyan">Connect</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Open to new opportunities, collaborations, and interesting conversations about backend engineering and distributed systems.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{ maxWidth: '600px', margin: '0 auto 5rem' }}>
          <h3 style={{ fontSize: '0.85rem', fontFamily: 'monospace', color: '#475569', letterSpacing: '0.1em', marginBottom: '1.5rem', textAlign: 'center' }}>GET IN TOUCH</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {contactLinks.map((link, i) => <ContactLink key={link.label} link={link} index={i} inView={inView} />)}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '2rem 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px', color: 'white' }}>S</div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: '#f0f6ff', fontSize: '0.95rem' }}>Shamb</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#475569', fontFamily: 'monospace' }}>
            © 2025 · Built with React + Three.js + Framer Motion
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {contactLinks.map((link) => (
              <motion.a key={link.label} href={link.href} target={link.label !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer"
                whileHover={{ color: link.color, scale: 1.1 }}
                style={{ color: '#475569', textDecoration: 'none', fontSize: '0.78rem', transition: 'color 0.2s ease' }}>
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
