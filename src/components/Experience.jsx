import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const experiences = [
  {
    id: 1,
    role: 'Software Engineer Associate',
    company: 'PeopleHum Technologies',
    period: 'Jan 2026 – Apr 2026',
    location: 'Mumbai, Maharashtra',
    type: 'Internship',
    color: '#06b6d4',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    highlights: [
      'Worked within a 140+ microservice ecosystem built on Core Java and the Spring Boot framework',
      'Developed and integrated RESTful APIs consumed by multiple internal services in the HR platform',
      'Implemented message-driven event flows with Apache Kafka for asynchronous data processing',
      'Optimized MariaDB queries and contributed to schema design improvements for key modules',
      'Participated in agile sprints and code reviews, contributing to zero-downtime deployment goals',
    ],
    tags: ['Java', 'Spring Boot', 'Kafka', 'MariaDB', 'Docker', 'AWS', 'Microservices'],
    credentialLink: 'https://drive.google.com/file/d/1LhOR0O2ZEllydhA09Z8sLjwV3xZGLSc4/view?usp=drive_link',
  },
  {
    id: 2,
    role: 'Full Stack Developer',
    company: 'Infosys Springboard',
    period: 'Nov 2024 – Jan 2025',
    location: 'Remote',
    type: 'Internship',
    color: '#8b5cf6',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    highlights: [
      'Acted as Scrum Master for a cross-functional team, enforcing code reliability through rigorous PR reviews',
      'Built full-stack features with Spring Boot backend and React frontend, integrated end-to-end',
      'Implemented automated testing pipelines (JUnit, Mockito) to enforce reliability and reduce regression bugs',
      'Introduced ESLint and SonarQube to ensure code standards across 3 parallel feature branches',
      'Delivered bi-weekly stakeholder demos and maintained sprint velocity consistently above 90%',
    ],
    tags: ['Angular', 'Bootstrap', 'TypeScript', 'REST APIs', 'Scrum', 'Agile' ],
    credentialLink: 'https://drive.google.com/file/d/1Li3ObI8IKvFEKyXljxB9SYIEJITXMicM/view?usp=drive_link',
  },
];

function TimelineCard({ exp, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className="timeline-item"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        display: 'flex',
        gap: '2rem',
        position: 'relative',
        paddingBottom: '3rem',
      }}
    >
      {/* Timeline dot and connector */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: `linear-gradient(135deg, ${exp.color}22, ${exp.color}44)`,
            border: `2px solid ${exp.color}66`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            boxShadow: `0 0 20px ${exp.color}33`,
            position: 'relative',
            zIndex: 1,
            flexShrink: 0,
          }}
        >
          {exp.icon}
        </motion.div>
        {index < experiences.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              width: '2px',
              flex: 1,
              background: `linear-gradient(180deg, ${exp.color}88, transparent)`,
              transformOrigin: 'top',
              marginTop: '8px',
              minHeight: '60px',
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="glass-card glass-card-hover"
        style={{
          flex: 1,
          padding: '1.75rem',
          marginBottom: '0.5rem',
          borderColor: `${exp.color}20`,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div>
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#f0f6ff',
              marginBottom: '0.25rem',
            }}>
              {exp.role}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                color: exp.color,
                fontWeight: 600,
                fontSize: '0.95rem',
              }}>{exp.company}</span>
              <span style={{
                padding: '2px 10px',
                borderRadius: '999px',
                background: `${exp.color}18`,
                border: `1px solid ${exp.color}33`,
                fontSize: '0.7rem',
                color: exp.color,
                fontWeight: 500,
              }}>{exp.type}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', fontFamily: 'monospace' }}>{exp.period}</p>
            <p style={{ fontSize: '0.78rem', color: '#64748b' }}>{exp.location}</p>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: `linear-gradient(90deg, ${exp.color}33, transparent)`,
          marginBottom: '1rem',
        }} />

        {/* Highlights */}
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
          {exp.highlights.map((h, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              style={{
                display: 'flex',
                gap: '10px',
                fontSize: '0.88rem',
                color: '#94a3b8',
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: exp.color, marginTop: '2px', flexShrink: 0 }}>▸</span>
              {h}
            </motion.li>
          ))}
        </ul>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: exp.credentialLink ? '1.5rem' : 0 }}>
          {exp.tags.map((tag) => (
            <span key={tag} style={{
              padding: '4px 12px',
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontSize: '0.72rem',
              color: '#94a3b8',
              fontFamily: 'monospace',
              letterSpacing: '0.03em',
            }}>{tag}</span>
          ))}
        </div>

        {/* View Credential Button */}
        {exp.credentialLink && (
          <div style={{ marginTop: '1rem' }}>
            <motion.a
              href={exp.credentialLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, background: `${exp.color}25` }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px', borderRadius: '8px',
                background: `${exp.color}15`, border: `1px solid ${exp.color}30`,
                color: exp.color, fontSize: '0.82rem', fontWeight: 700,
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
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="experience" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
      {/* Section background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 80% 30%, rgba(139,92,246,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Section Header */}
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
            Where I've{' '}
            <span className="text-gradient-cyan">Worked</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Crafting scalable backend systems and driving engineering excellence across diverse teams.
          </p>
        </motion.div>

        {/* Timeline */}
        <div>
          {experiences.map((exp, i) => (
            <TimelineCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .timeline-item {
            gap: 1rem !important;
          }
          .timeline-item > div:first-child {
            width: 40px !important;
          }
          .timeline-item > div:first-child > div:first-child {
            width: 36px !important;
            height: 36px !important;
            font-size: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
