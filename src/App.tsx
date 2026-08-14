import { useState, useEffect, useRef } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Project = {
  id: string
  title: string
  tagline: string
  description: string
  role: string
  challenge: string
  learned: string
  tags: string[]
  image: string
  accent: string
  links?: { label: string; href: string }[]
  featured?: boolean
}

type DesignItem = {
  title: string
  category: string
  description: string
  image: string
  tags: string[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 'glow-diaries',
    title: 'Glow Diaries',
    tagline: 'An interactive journaling web app for self-reflection',
    description:
      'An independent full-stack web application that blends interactive journaling with a skincare-inspired visual language. Built using AI-assisted development techniques and modern web technologies to explore how apps can feel personal and warm.',
    role: 'Sole developer and designer — concept, architecture, UI design, and implementation.',
    challenge:
      'Designing an interface that felt emotionally inviting while maintaining technical robustness and responsive behavior across devices.',
    learned:
      'How to leverage AI-assisted development workflows to accelerate prototyping; the importance of cohesive visual identity in user engagement.',
    tags: ['HTML', 'CSS', 'JavaScript', 'AI-assisted dev', 'UI Design'],
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop&auto=format',
    accent: '#F0A585',
    links: [
      { label: 'Live Demo', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
    featured: true,
  },
  {
    id: 'mood-melt',
    title: 'Mood Melt',
    tagline: 'Mental wellness app built with Technovation',
    description:
      'A mental wellness application developed as part of the Technovation program, designed to help users track emotional states and discover coping strategies. User-tested with approximately 25 participants to refine UX flows and feature priorities.',
    role: 'Front-end developer and UI/UX designer — TypeScript implementation, Figma prototyping, and user research facilitation.',
    challenge:
      'Translating sensitive wellness concepts into a UI that feels safe and approachable without being clinical or condescending.',
    learned:
      'User testing methodology, iterative design under real feedback, and the value of accessibility considerations in mental health contexts.',
    tags: ['TypeScript', 'CSS', 'Figma', 'UX Research', 'Technovation'],
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=500&fit=crop&auto=format',
    accent: '#A8C5DA',
    links: [
      { label: 'Live Demo', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
    featured: true,
  },
  {
    id: 'astronomy-website',
    title: 'Interactive Astronomy Website',
    tagline: 'Educational space exploration for young learners',
    description:
      'An educational interactive website built to make astronomy approachable and exciting for elementary-school students. Features animated planetary orbits, clickable constellation guides, and quiz elements to reinforce learning.',
    role: 'Full designer and developer — content architecture, CSS animations, and interactive JavaScript components.',
    challenge:
      'Balancing scientific accuracy with age-appropriate visuals and vocabulary, and making dense subject matter digestible through interaction.',
    learned:
      'CSS animation techniques, designing for non-adult audiences, and how interactivity dramatically improves content retention.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Educational Design', 'Animation'],
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=500&fit=crop&auto=format',
    accent: '#7B9ED9',
    links: [
      { label: 'Live Demo', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
    featured: true,
  },
  {
    id: 'cpp-projects',
    title: 'C++ Programming Projects',
    tagline: 'Algorithms, OOP, recursion & problem solving',
    description:
      'A collection of C++ programs demonstrating mastery of core computer science concepts: object-oriented design patterns, recursive algorithms, searching and sorting implementations (quicksort, mergesort, binary search), and structured problem-solving approaches.',
    role: 'Sole programmer — algorithm design, implementation, testing, and documentation.',
    challenge:
      'Understanding the deep mechanics of memory management and algorithm complexity rather than relying on high-level abstractions.',
    learned:
      'How low-level thinking about performance and data structures shapes the way I approach all programming, regardless of language.',
    tags: ['C++', 'Algorithms', 'OOP', 'Data Structures', 'Recursion'],
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop&auto=format',
    accent: '#9B8EC4',
    links: [
      { label: 'GitHub', href: '#' },
    ],
    featured: true,
  },
]

const DESIGN_ITEMS: DesignItem[] = [
  {
    title: 'Yearbook — Editorial Spreads',
    category: 'Print Design',
    description: 'Three-plus years of editorial layout work for the school yearbook — designing page spreads, photo compositions, typography hierarchies, and thematic visual systems that document school culture.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=700&h=460&fit=crop&auto=format',
    tags: ['Layout', 'Typography', 'Editorial', 'Photography'],
  },
  {
    title: 'Figma UI Prototypes',
    category: 'UI/UX Design',
    description: 'High-fidelity mockups and interactive prototypes created in Figma for app concepts including Mood Melt. Component libraries, auto-layout grids, and prototype flows for user testing.',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=700&h=460&fit=crop&auto=format',
    tags: ['Figma', 'Prototyping', 'Components', 'UI Systems'],
  },
  {
    title: 'Digital Art & Illustration',
    category: 'Digital Art',
    description: 'Personal digital artwork exploring character illustration, texture studies, and atmospheric compositions — developed through Art, Design & Technology coursework and independent practice.',
    image: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=700&h=460&fit=crop&auto=format',
    tags: ['Digital Illustration', 'Procreate', 'Color Theory'],
  },
  {
    title: 'Creative Coding & Interactive Art',
    category: 'Creative Technology',
    description: 'Explorations at the intersection of code and visual art — generative patterns, interactive canvases, and browser-based experiences created through p5.js and CSS experiments.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&h=460&fit=crop&auto=format',
    tags: ['p5.js', 'CSS Art', 'Generative', 'Interactive'],
  },
  {
    title: 'Brand & Graphic Design',
    category: 'Graphic Design',
    description: 'Logos, posters, and identity systems for school events and personal projects — applying design thinking principles to communicate clearly and memorably.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=700&h=460&fit=crop&auto=format',
    tags: ['Branding', 'Identity', 'Poster Design', 'Typography'],
  },
  {
    title: 'Design Thinking Projects',
    category: 'Process & Research',
    description: 'Rapid prototyping exercises and design thinking sprints — user research, ideation, low-fi wireframing, and iterative refinement applied to real problems.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=460&fit=crop&auto=format',
    tags: ['Design Thinking', 'Wireframing', 'Research', 'Prototyping'],
  },
]

const SKILLS = [
  { lang: 'C++', level: 'Proficient', note: 'DSA, OOP, Algorithms' },
  { lang: 'JavaScript', level: 'Proficient', note: 'WCTC Credential' },
  { lang: 'HTML & CSS', level: 'Proficient', note: 'WCTC Credential' },
  { lang: 'TypeScript', level: 'Proficient', note: 'App Development' },
  { lang: 'Java', level: 'Learning', note: 'Data Structures & Algorithms' },
  { lang: 'Python', level: 'Learning', note: 'Currently Exploring' },
]

const EXPERIMENTS = [
  {
    title: 'Cursor Bloom',
    desc: 'An ambient dot-grid that responds to pointer position — a small study in radial masking and motion.',
    tags: ['CSS', 'React', 'Interaction'],
    links: [] as { label: string; href: string }[],
  },
  {
    title: 'CSS-only Generative Pattern',
    desc: 'Geometric tiling experiments built entirely from CSS custom properties and clip-path composition.',
    tags: ['CSS Art', 'Generative', 'No-JS'],
    links: [] as { label: string; href: string }[],
  },
  {
    title: 'AI Prompt-to-Component',
    desc: 'Rapid UI component generation using LLM prompting — exploring AI-assisted workflows for front-end speed.',
    tags: ['AI-assisted', 'Prototyping', 'React'],
    links: [] as { label: string; href: string }[],
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavBar({ active, onNav }: { active: string; onNav: (s: string) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const sections = ['Home', 'Projects', 'Design', 'About', 'Education', 'Contact']

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (s: string) => {
    onNav(s)
    setMenuOpen(false)
    const el = document.getElementById(s.toLowerCase())
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.3s, box-shadow 0.3s',
        background: scrolled ? 'rgba(250,250,248,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 var(--border)' : 'none',
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Wordmark */}
        <button
          onClick={() => handleNav('Home')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'Fraunces, serif',
            fontSize: 20,
            fontWeight: 500,
            color: 'var(--foreground)',
            letterSpacing: '-0.02em',
          }}
        >
          Lilian Lee
        </button>

        {/* Desktop links */}
        <ul
          style={{
            display: 'flex',
            gap: 0,
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
          className="hidden-mobile"
        >
          {sections.map((s) => (
            <li key={s}>
              <button
                onClick={() => handleNav(s)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 14,
                  fontWeight: active === s ? 600 : 400,
                  color: active === s ? 'var(--primary)' : 'var(--muted-foreground)',
                  letterSpacing: '0.01em',
                  position: 'relative',
                }}
              >
                {s}
                {active === s && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 2,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: 'var(--primary)',
                    }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 22,
                height: 1.5,
                background: 'var(--foreground)',
                transition: 'all 0.2s',
                transformOrigin: 'center',
                transform:
                  menuOpen
                    ? i === 0
                      ? 'translateY(6.5px) rotate(45deg)'
                      : i === 2
                      ? 'translateY(-6.5px) rotate(-45deg)'
                      : 'scaleX(0)'
                    : 'none',
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div
          style={{
            background: 'var(--background)',
            borderTop: '1px solid var(--border)',
            padding: '16px 24px 24px',
          }}
        >
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => handleNav(s)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '12px 0',
                fontFamily: 'Outfit, sans-serif',
                fontSize: 18,
                fontWeight: active === s ? 600 : 400,
                color: active === s ? 'var(--primary)' : 'var(--foreground)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

function Hero({ onNav }: { onNav: (s: string) => void }) {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        maxWidth: 1200,
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Background accent blob */}
      <div
        style={{
          position: 'fixed',
          top: '15%',
          right: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,98,58,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 12,
            letterSpacing: '0.12em',
            color: 'var(--primary)',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          Portfolio · 2025
        </p>

        <h1
          style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(52px, 8vw, 112px)',
            fontWeight: 500,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: 'var(--foreground)',
            margin: '0 0 32px',
            maxWidth: 900,
          }}
        >
          Lilian
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>Lee</em>
        </h1>

        <p
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(17px, 2.2vw, 22px)',
            fontWeight: 300,
            lineHeight: 1.65,
            color: 'var(--muted-foreground)',
            maxWidth: 560,
            marginBottom: 48,
          }}
        >
          Software developer, graphic designer, and creative technologist.
          I build things that feel as good as they work — from C++ algorithms
          to interactive web experiences to editorial layouts.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => {
              onNav('Projects')
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              padding: '14px 32px',
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
              border: 'none',
              borderRadius: 'var(--radius)',
              fontFamily: 'Outfit, sans-serif',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#d4552f'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--primary)'
            }}
          >
            View Projects
          </button>
          <button
            onClick={() => {
              onNav('Contact')
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              padding: '14px 32px',
              background: 'transparent',
              color: 'var(--foreground)',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius)',
              fontFamily: 'Outfit, sans-serif',
              fontSize: 15,
              fontWeight: 500,
              cursor: 'pointer',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)'
              e.currentTarget.style.color = 'var(--primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--foreground)'
            }}
          >
            Get in Touch
          </button>
        </div>

        {/* Credential pills */}
        <div
          style={{
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
            marginTop: 64,
            paddingTop: 40,
            borderTop: '1px solid var(--border)',
          }}
        >
          {[
            'WCTC HTML & CSS',
            'WCTC JavaScript',
            'Technovation',
            'Art, Design & Technology',
            'Data Structures & Algorithms',
          ].map((c) => (
            <span
              key={c}
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: 11,
                letterSpacing: '0.06em',
                padding: '5px 12px',
                background: 'var(--secondary)',
                color: 'var(--muted-foreground)',
                borderRadius: 100,
                textTransform: 'uppercase',
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article
      style={{
        background: 'var(--card)',
        borderRadius: 'calc(var(--radius) + 6px)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(28,28,26,0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 240, background: project.accent, overflow: 'hidden' }}>
        <img
          src={project.image}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.92 }}
          loading="lazy"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, transparent 40%, ${project.accent}cc 100%)`,
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: '28px 28px 0' }}>
        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {project.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: 10,
                letterSpacing: '0.08em',
                padding: '3px 10px',
                background: 'var(--background)',
                color: 'var(--muted-foreground)',
                borderRadius: 100,
                border: '1px solid var(--border)',
                textTransform: 'uppercase',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <h3
          style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: 'var(--foreground)',
            margin: '0 0 8px',
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 14,
            color: 'var(--muted-foreground)',
            margin: '0 0 16px',
            fontStyle: 'italic',
          }}
        >
          {project.tagline}
        </p>
        <p
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 15,
            lineHeight: 1.7,
            color: 'var(--card-foreground)',
            margin: '0 0 0',
            opacity: 0.85,
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Expandable details */}
      <div
        style={{
          maxHeight: expanded ? 400 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
        }}
      >
        <div style={{ padding: '20px 28px' }}>
          {[
            { label: 'My Role', text: project.role },
            { label: 'Challenge', text: project.challenge },
            { label: 'What I Learned', text: project.learned },
          ].map(({ label, text }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <p
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--primary)',
                  margin: '0 0 4px',
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: 'var(--card-foreground)',
                  margin: 0,
                }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      {project.links && project.links.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 10,
            padding: '16px 28px',
            borderTop: '1px solid var(--border)',
          }}
        >
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'Outfit, sans-serif',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.18s',
                background: link.label === 'Live Demo' ? 'var(--primary)' : 'var(--secondary)',
                color: link.label === 'Live Demo' ? 'var(--primary-foreground)' : 'var(--foreground)',
                border: '1.5px solid',
                borderColor: link.label === 'Live Demo' ? 'var(--primary)' : 'var(--border)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                if (link.label === 'Live Demo') {
                  el.style.background = '#d4552f'
                  el.style.borderColor = '#d4552f'
                } else {
                  el.style.borderColor = 'var(--primary)'
                  el.style.color = 'var(--primary)'
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                if (link.label === 'Live Demo') {
                  el.style.background = 'var(--primary)'
                  el.style.borderColor = 'var(--primary)'
                } else {
                  el.style.borderColor = 'var(--border)'
                  el.style.color = 'var(--foreground)'
                }
              }}
            >
              {link.label === 'Live Demo' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              )}
              {link.label === 'GitHub' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              )}
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          width: '100%',
          padding: '16px 28px',
          background: 'none',
          border: 'none',
          borderTop: '1px solid var(--border)',
          cursor: 'pointer',
          fontFamily: 'Outfit, sans-serif',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--primary)',
          textAlign: 'left',
        }}
      >
        {expanded ? 'Show less' : 'Role, challenges & learnings'}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          style={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s',
            marginLeft: 'auto',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </article>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <SectionHeader
        eyebrow="Featured Work"
        title="Projects"
        subtitle="Selected programming and development projects — from web apps to systems-level C++ work."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
          gap: 24,
        }}
      >
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}

function DesignSection() {
  const [activeFilter, setActiveFilter] = useState('All')
  const categories = ['All', ...Array.from(new Set(DESIGN_ITEMS.map((d) => d.category)))]
  const filtered =
    activeFilter === 'All' ? DESIGN_ITEMS : DESIGN_ITEMS.filter((d) => d.category === activeFilter)

  return (
    <section
      id="design"
      style={{
        padding: '100px 24px',
        background: 'var(--secondary)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Design Work"
          title="Design"
          subtitle="Three-plus years of graphic design, UI/UX, digital art, and creative technology work."
        />

        {/* Filter pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveFilter(c)}
              style={{
                padding: '8px 18px',
                borderRadius: 100,
                border: '1.5px solid',
                borderColor: activeFilter === c ? 'var(--primary)' : 'var(--border)',
                background: activeFilter === c ? 'var(--primary)' : 'transparent',
                color: activeFilter === c ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                fontFamily: 'Outfit, sans-serif',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.18s',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Design grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: 20,
          }}
        >
          {filtered.map((item) => (
            <div
              key={item.title}
              style={{
                background: 'var(--background)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(28,28,26,0.09)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ height: 200, background: '#ddd', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
              <div style={{ padding: '20px 22px 24px' }}>
                <span
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--primary)',
                  }}
                >
                  {item.category}
                </span>
                <h4
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: 20,
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    margin: '6px 0 10px',
                    color: 'var(--foreground)',
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: 'var(--muted-foreground)',
                    margin: '0 0 14px',
                  }}
                >
                  {item.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'DM Mono, monospace',
                        fontSize: 10,
                        letterSpacing: '0.06em',
                        padding: '3px 9px',
                        background: 'var(--secondary)',
                        color: 'var(--muted-foreground)',
                        borderRadius: 100,
                        textTransform: 'uppercase',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperimentsSection() {
  return (
    <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <SectionHeader
        eyebrow="Experiments"
        title="Building to Learn"
        subtitle="Small projects, explorations, and prototypes built to understand new technologies firsthand."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: 16,
        }}
      >
        {EXPERIMENTS.map((exp) => (
          <div
            key={exp.title}
            style={{
              padding: '28px',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              background: 'var(--background)',
              transition: 'border-color 0.2s, background 0.2s',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)'
              e.currentTarget.style.background = 'var(--card)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.background = 'var(--background)'
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'var(--secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                fontSize: 18,
              }}
            >
              🧪
            </div>
            <h4
              style={{
                fontFamily: 'Fraunces, serif',
                fontSize: 19,
                fontWeight: 500,
                letterSpacing: '-0.02em',
                margin: '0 0 8px',
              }}
            >
              {exp.title}
            </h4>
            <p
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 14,
                lineHeight: 1.65,
                color: 'var(--muted-foreground)',
                margin: '0 0 16px',
              }}
            >
              {exp.desc}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: exp.links && exp.links.length > 0 ? 14 : 0 }}>
              {exp.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 10,
                    letterSpacing: '0.06em',
                    padding: '3px 9px',
                    background: 'var(--secondary)',
                    color: 'var(--muted-foreground)',
                    borderRadius: 100,
                    textTransform: 'uppercase',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            {exp.links && exp.links.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {exp.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      padding: '7px 14px',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: 12,
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.18s',
                      background: link.label === 'Live Demo' ? 'var(--primary)' : 'var(--secondary)',
                      color: link.label === 'Live Demo' ? 'var(--primary-foreground)' : 'var(--foreground)',
                      border: '1.5px solid',
                      borderColor: link.label === 'Live Demo' ? 'var(--primary)' : 'var(--border)',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      if (link.label === 'Live Demo') {
                        el.style.background = '#d4552f'
                        el.style.borderColor = '#d4552f'
                      } else {
                        el.style.borderColor = 'var(--primary)'
                        el.style.color = 'var(--primary)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      if (link.label === 'Live Demo') {
                        el.style.background = 'var(--primary)'
                        el.style.borderColor = 'var(--primary)'
                      } else {
                        el.style.borderColor = 'var(--border)'
                        el.style.color = 'var(--foreground)'
                      }
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section
      id="about"
      style={{
        padding: '100px 24px',
        borderTop: '1px solid var(--border)',
        background: 'var(--card)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
          gap: 80,
          alignItems: 'start',
        }}
      >
        {/* Bio */}
        <div>
          <p
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 11,
              letterSpacing: '0.12em',
              color: 'var(--primary)',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            About Me
          </p>
          <h2
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: '0 0 28px',
            }}
          >
            Code, design,
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>curiosity.</em>
          </h2>
          <p
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 16,
              lineHeight: 1.75,
              color: 'var(--muted-foreground)',
              marginBottom: 20,
            }}
          >
            I'm a high-school student with a genuine passion for building things that sit at the
            intersection of technology and design. Whether I'm tracing through a sorting algorithm
            in C++, prototyping a UI in Figma, or laying out an editorial page spread for yearbook,
            I bring the same attention to craft and detail.
          </p>
          <p
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 16,
              lineHeight: 1.75,
              color: 'var(--muted-foreground)',
              marginBottom: 20,
            }}
          >
            I hold WCTC credentials in HTML & CSS and JavaScript, and I'm currently diving deep
            into Data Structures and Algorithms in Java. Through Technovation, I've had the chance
            to take a real product from Figma prototype to user-tested app — an experience that
            showed me how much I love the full cycle of building.
          </p>
          <p
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 16,
              lineHeight: 1.75,
              color: 'var(--muted-foreground)',
            }}
          >
            My graphic design background — three-plus years through yearbook and Art, Design &
            Technology — shapes how I write code. I care about the details that most people won't
            notice but will feel.
          </p>
        </div>

        {/* Skills */}
        <div>
          <p
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 11,
              letterSpacing: '0.12em',
              color: 'var(--muted-foreground)',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            Technical Skills
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {SKILLS.map((s) => (
              <div
                key={s.lang}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  background: 'var(--background)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: 15,
                      fontWeight: 600,
                      color: 'var(--foreground)',
                    }}
                  >
                    {s.lang}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: 13,
                      color: 'var(--muted-foreground)',
                      marginLeft: 10,
                    }}
                  >
                    {s.note}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 10,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '3px 10px',
                    borderRadius: 100,
                    background: s.level === 'Proficient' ? 'rgba(232,98,58,0.1)' : 'var(--secondary)',
                    color: s.level === 'Proficient' ? 'var(--primary)' : 'var(--muted-foreground)',
                  }}
                >
                  {s.level}
                </span>
              </div>
            ))}
          </div>

          {/* Education & Activities */}
          <p
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 11,
              letterSpacing: '0.12em',
              color: 'var(--muted-foreground)',
              textTransform: 'uppercase',
              marginTop: 36,
              marginBottom: 16,
            }}
          >
            Education & Activities
          </p>
          {[
            { item: 'WCTC — HTML & CSS Credential', sub: 'Formal coursework + industry credential' },
            { item: 'WCTC — JavaScript Credential', sub: 'Formal coursework + industry credential' },
            { item: 'Technovation', sub: 'App development program' },
            { item: 'Art, Design & Technology', sub: 'Digital art, creative coding, design thinking' },
            { item: 'Yearbook Club', sub: '3+ years · editorial layout and photography' },
            { item: 'Data Structures & Algorithms', sub: 'Java · currently enrolled' },
          ].map(({ item, sub }) => (
            <div
              key={item}
              style={{
                padding: '12px 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <p
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--foreground)',
                  margin: '0 0 2px',
                }}
              >
                {item}
              </p>
              <p
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 12,
                  color: 'var(--muted-foreground)',
                  margin: 0,
                }}
              >
                {sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EducationSection() {
  const schools = [
    {
      name: 'Hamtilon High School',
      type: 'Secondary Education',
      years: '2025 – Present',
      description:
        'College-preparatory coursework with a focus on computer science, mathematics, and the arts. Active in extracurriculars that span both technical and creative disciplines.',
      credentials: [
        { title: 'Data Structures & Algorithms (Java)', detail: 'Currently enrolled — linked lists, trees, recursion, searching & sorting' },
        { title: 'Art, Design & Technology', detail: 'Digital art, creative coding, interactive art, design thinking, rapid prototyping' },
        { title: 'Computer Science / C++ Programming', detail: 'OOP, algorithms, problem solving, recursion, data structures' },
      ],
      accent: '#7B9ED9',
    },
    {
      name: 'Stanford University Online High School',
      type: 'Secondary Education',
      years: '2025 – Present',
      description:
        'College-preparatory coursework with a focus on computer science, mathematics, and the arts. Active in extracurriculars that span both technical and creative disciplines.',
      credentials: [
        { title: 'Data Structures & Algorithms (Java)', detail: 'Currently enrolled — linked lists, trees, recursion, searching & sorting' },
        { title: 'Art, Design & Technology', detail: 'Digital art, creative coding, interactive art, design thinking, rapid prototyping' },
        { title: 'Computer Science / C++ Programming', detail: 'OOP, algorithms, problem solving, recursion, data structures' },
      ],
      accent: '#7B9ED9',
    },
    {
      name: 'Waukesha County Technical College (WCTC)',
      type: 'Dual Enrollment / Continuing Education',
      years: '2024 – Present',
      description:
        'Completed formal college-level coursework and earned industry-recognized credentials while still in high school through WCTC\'s dual enrollment program.',
      credentials: [
        { title: 'HTML & CSS Credential', detail: 'Web page structure, semantic markup, CSS layout, responsive design' },
        { title: 'JavaScript Credential', detail: 'DOM manipulation, event handling, ES6+, interactive web programming' },
      ],
      accent: '#E8623A',
    }
  ]

  const activities = [
    {
      name: 'Yearbook Club',
      role: 'Designer & Photographer',
      years: '3+ years',
      desc: 'Editorial layout, photo curation, typography, and visual storytelling for the annual school yearbook.',
      icon: '📸',
    },
    {
      name: 'Technovation',
      role: 'Developer & UX Designer',
      years: 'Active participant',
      desc: 'International app development program for young women. Built Mood Melt from concept through user-tested prototype.',
      icon: '🚀',
    },
    {
      name: 'Independent Projects',
      role: 'Self-directed learner',
      years: 'Ongoing',
      desc: 'Building side projects and experiments outside the classroom to explore new technologies, AI tools, and design concepts.',
      icon: '💡',
    },
  ]

  return (
    <section
      id="education"
      style={{
        padding: '100px 24px',
        borderTop: '1px solid var(--border)',
        background: 'var(--background)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Background"
          title="Education"
          subtitle="Formal credentials, coursework, and the extracurriculars where a lot of the real learning happens."
        />

        {/* Schools */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 72 }}>
          {schools.map((school) => (
            <div
              key={school.name}
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'calc(var(--radius) + 4px)',
                overflow: 'hidden',
                background: 'var(--card)',
              }}
            >
              {/* Header bar */}
              <div
                style={{
                  padding: '28px 32px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 10,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: school.accent,
                    }}
                  >
                    {school.type}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'Fraunces, serif',
                      fontSize: 'clamp(20px, 3vw, 26px)',
                      fontWeight: 500,
                      letterSpacing: '-0.02em',
                      margin: '6px 0 8px',
                      color: 'var(--foreground)',
                    }}
                  >
                    {school.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: 'var(--muted-foreground)',
                      margin: 0,
                      maxWidth: 600,
                    }}
                  >
                    {school.description}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 12,
                    color: 'var(--muted-foreground)',
                    whiteSpace: 'nowrap',
                    paddingTop: 4,
                  }}
                >
                  {school.years}
                </span>
              </div>

              {/* Credentials / Courses */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                  gap: 0,
                }}
              >
                {school.credentials.map((cred, i) => (
                  <div
                    key={cred.title}
                    style={{
                      padding: '20px 28px',
                      borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
                      borderBottom: i < school.credentials.length - 2 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: school.accent,
                          marginTop: 7,
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <p
                          style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: 14,
                            fontWeight: 600,
                            color: 'var(--foreground)',
                            margin: '0 0 4px',
                          }}
                        >
                          {cred.title}
                        </p>
                        <p
                          style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: 13,
                            lineHeight: 1.6,
                            color: 'var(--muted-foreground)',
                            margin: 0,
                          }}
                        >
                          {cred.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Activities & Involvement */}
        <div>
          <p
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 11,
              letterSpacing: '0.12em',
              color: 'var(--muted-foreground)',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            Activities & Involvement
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
              gap: 16,
            }}
          >
            {activities.map((act) => (
              <div
                key={act.name}
                style={{
                  padding: '24px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  background: 'var(--background)',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{act.icon}</span>
                  <span
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 10,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--muted-foreground)',
                      padding: '3px 10px',
                      background: 'var(--secondary)',
                      borderRadius: 100,
                    }}
                  >
                    {act.years}
                  </span>
                </div>
                <h4
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: 20,
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    margin: '0 0 4px',
                    color: 'var(--foreground)',
                  }}
                >
                  {act.name}
                </h4>
                <p
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 10,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--primary)',
                    margin: '0 0 10px',
                  }}
                >
                  {act.role}
                </p>
                <p
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: 'var(--muted-foreground)',
                    margin: 0,
                  }}
                >
                  {act.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'var(--background)',
    border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'Outfit, sans-serif',
    fontSize: 15,
    color: 'var(--foreground)',
    outline: 'none',
    transition: 'border-color 0.18s',
    boxSizing: 'border-box' as const,
  }

  return (
    <section
      id="contact"
      style={{
        padding: '100px 24px 120px',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          maxWidth: 640,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 11,
            letterSpacing: '0.12em',
            color: 'var(--primary)',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          Get in Touch
        </p>
        <h2
          style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: '0 0 16px',
          }}
        >
          Let's connect
        </h2>
        <p
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 16,
            lineHeight: 1.7,
            color: 'var(--muted-foreground)',
            marginBottom: 48,
          }}
        >
          Open to internship opportunities, collaborations, and conversations
          about design, development, or anything in between.
        </p>

        {sent ? (
          <div
            style={{
              padding: '40px',
              background: 'var(--card)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>✉️</div>
            <h3
              style={{
                fontFamily: 'Fraunces, serif',
                fontSize: 24,
                fontWeight: 500,
                margin: '0 0 8px',
              }}
            >
              Message sent!
            </h3>
            <p
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 15,
                color: 'var(--muted-foreground)',
                margin: 0,
              }}
            >
              Thanks for reaching out — I'll be in touch soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--muted-foreground)',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  Name
                </label>
                <input
                  style={inputStyle}
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              </div>
              <div>
                <label
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--muted-foreground)',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  Email
                </label>
                <input
                  style={inputStyle}
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              </div>
            </div>
            <div>
              <label
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--muted-foreground)',
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                Message
              </label>
              <textarea
                style={{ ...inputStyle, height: 140, resize: 'vertical' }}
                required
                placeholder="What would you like to talk about?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '15px',
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'Outfit, sans-serif',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.18s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#d4552f')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--primary)')}
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

function Footer({ onNav }: { onNav: (s: string) => void }) {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '32px 24px',
        background: 'var(--foreground)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 16,
            fontWeight: 500,
            color: 'var(--background)',
          }}
        >
          Lilian Lee
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Projects', 'Design', 'About', 'Education', 'Contact'].map((s) => (
            <button
              key={s}
              onClick={() => {
                onNav(s)
                document.getElementById(s.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Outfit, sans-serif',
                fontSize: 13,
                color: 'rgba(250,250,248,0.5)',
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(250,250,248,0.9)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250,250,248,0.5)')}
            >
              {s}
            </button>
          ))}
        </div>
        <span
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 11,
            color: 'rgba(250,250,248,0.35)',
            letterSpacing: '0.06em',
          }}
        >
          © 2025 Lilian Lee
        </span>
      </div>
    </footer>
  )
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <div style={{ marginBottom: 56 }}>
      <p
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: 11,
          letterSpacing: '0.12em',
          color: 'var(--primary)',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        {eyebrow}
      </p>
      <h2
        style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 'clamp(40px, 6vw, 64px)',
          fontWeight: 500,
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          margin: '0 0 16px',
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 16,
          lineHeight: 1.7,
          color: 'var(--muted-foreground)',
          maxWidth: 520,
        }}
      >
        {subtitle}
      </p>
    </div>
  )
}

// ─── Scroll-spy hook ──────────────────────────────────────────────────────────

function useActiveSection() {
  const [active, setActive] = useState('Home')
  useEffect(() => {
    const sections = ['home', 'projects', 'design', 'about', 'education', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1))
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

// ─── Mobile CSS hack ──────────────────────────────────────────────────────────

const mobileStyle = `
  @media (max-width: 640px) {
    .hidden-mobile { display: none !important; }
    .show-mobile { display: flex !important; }
  }
  @media (min-width: 641px) {
    .show-mobile { display: none !important; }
  }
`

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const active = useActiveSection()
  const [navActive, setNavActive] = useState('Home')

  const handleNav = (s: string) => setNavActive(s)

  return (
    <>
      <style>{mobileStyle}</style>
      <NavBar active={navActive || active} onNav={handleNav} />
      <main>
        <Hero onNav={handleNav} />
        <ProjectsSection />
        <DesignSection />
        <ExperimentsSection />
        <AboutSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer onNav={handleNav} />
    </>
  )
}
