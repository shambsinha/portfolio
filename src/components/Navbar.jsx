import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo3D from './three/Logo3D';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Freelance', href: '#freelance' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'experience', 'education', 'freelance', 'projects', 'skills', 'certifications', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 2rem',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.4s ease',
          background: scrolled ? 'rgba(3, 7, 18, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(6, 182, 212, 0.1)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          whileHover={{ scale: 1.05 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <Logo3D />
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '1.1rem',
            color: '#f0f6ff',
            letterSpacing: '0.02em',
          }}>Shamb<span style={{ color: '#06b6d4' }}>.</span></span>
        </motion.a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="hidden-mobile">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              whileHover={{ color: '#06b6d4' }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 500,
                color: activeSection === link.href.replace('#', '') ? '#06b6d4' : '#94a3b8',
                textDecoration: 'none',
                letterSpacing: '0.03em',
                transition: 'color 0.2s ease',
                position: 'relative',
              }}
            >
              {link.label}
              {activeSection === link.href.replace('#', '') && (
                <motion.span
                  layoutId="navUnderline"
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
                    borderRadius: '1px',
                    boxShadow: '0 0 8px #06b6d4',
                  }}
                />
              )}
            </motion.a>
          ))}
          <motion.a
            href="mailto:shambsinha@gmail.com"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(6,182,212,0.5)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(139,92,246,0.15))',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              color: '#06b6d4',
              fontSize: '0.8rem',
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.05em',
              transition: 'all 0.3s ease',
            }}
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{
                rotate: menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                y: menuOpen ? (i === 0 ? 10 : i === 2 ? -10 : 0) : 0,
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
              style={{
                display: 'block',
                width: '24px',
                height: '2px',
                background: '#06b6d4',
                borderRadius: '1px',
              }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '72px',
              left: 0,
              right: 0,
              background: 'rgba(3, 7, 18, 0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(6, 182, 212, 0.15)',
              zIndex: 999,
              padding: '1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  color: activeSection === link.href.replace('#', '') ? '#06b6d4' : '#94a3b8',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <span style={{ color: '#06b6d4', fontFamily: 'monospace', marginRight: '8px' }}>0{i + 1}.</span>
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
