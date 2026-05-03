import './index.css';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Education from './components/Education';
import FreelanceWork from './components/FreelanceWork';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import BackgroundScene from './components/three/BackgroundScene';

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#030712',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        style={{
          width: '48px', height: '48px', borderRadius: '12px',
          border: '3px solid rgba(6,182,212,0.15)',
          borderTop: '3px solid #06b6d4',
        }}
      />
      <p style={{ color: '#94a3b8', fontFamily: 'monospace', fontSize: '0.85rem', letterSpacing: '0.15em' }}>
        INITIALIZING...
      </p>
    </motion.div>
  );
}

function SectionDivider({ color1 = '#06b6d4', color2 = '#8b5cf6' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, transparent, ${color1}33)` }} />
      <div style={{ padding: '0 1rem', display: 'flex', gap: '6px' }}>
        {[color1, color2, '#3b82f6'].map((c, i) => (
          <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: c, boxShadow: `0 0 6px ${c}` }} />
        ))}
      </div>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${color2}33, transparent)` }} />
    </div>
  );
}

export default function App() {
  return (
    <div className="noise-overlay" style={{ background: '#030712', minHeight: '100vh' }}>
      {/* Fixed 3D background */}
      <BackgroundScene />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Suspense fallback={<LoadingScreen />}>
          <main>
            <Hero />
            <Experience />
            <SectionDivider color1="#10b981" color2="#06b6d4" />
            <Education />
            <SectionDivider color1="#f59e0b" color2="#10b981" />
            <FreelanceWork />
            <SectionDivider color1="#8b5cf6" color2="#06b6d4" />
            <Projects />
            <SectionDivider />
            <Skills />
            <SectionDivider color1="#8b5cf6" color2="#06b6d4" />
            <Certifications />
            <SectionDivider color1="#10b981" color2="#06b6d4" />
            <Contact />
          </main>
        </Suspense>
      </div>
    </div>
  );
}
