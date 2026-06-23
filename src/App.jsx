import { useState, useEffect, useRef } from "react";

const ME = {
  name: "Ian Otieno",
  initials: "O.I",
  role: "Software Developer Trainee",
  tagline: "Building code. Securing networks. Creating the future.",
  location: "Mombasa, Kenya",
  email: "odhiamian74@example.com",
  github: "github.com/13getid",
  linkedin: "www.linkedin.com/in/ian-otieno-b52927332",
  about: [
    "I'm a software developer trainee on a deliberate path — one that doesn't stop at writing code. My roadmap stretches across three interconnected disciplines: software development, network engineering, and cybersecurity.",
    "I believe the most dangerous and valuable technologist is one who understands how systems are built, how they talk to each other, and how they break. That intersection is where I'm headed.",
    "Outside the technical stack I'm a creative technologist — someone who sees design, storytelling, and engineering as the same conversation. Every project I touch should feel as good as it functions.",
  ],
};

const ROADMAP = [
  {
    phase: "NOW",
    title: "Software Developer Trainee",
    desc: "Learning the fundamentals — HTML, CSS, JavaScript, Python, and AI-assisted development with tools like Windsurf and Claude.",
    skills: ["HTML & CSS", "JavaScript", "Python", "Git", "AI Tools"],
    status: "active",
    icon: "⬡",
  },
  {
    phase: "NEXT",
    title: "Network Engineering",
    desc: "Pursuing CCNA certification. Understanding how data moves — routing, switching, TCP/IP, subnetting, and network architecture.",
    skills: ["CCNA", "TCP/IP", "Routing", "Switching", "Subnetting"],
    status: "building",
    icon: "◈",
  },
  {
    phase: "AHEAD",
    title: "Cybersecurity",
    desc: "Ethical hacking, penetration testing, and security engineering. Learning to think like an attacker to defend like a pro.",
    skills: ["Ethical Hacking", "Pen Testing", "CompTIA Sec+", "OSINT", "CTF"],
    status: "planned",
    icon: "◇",
  },
  {
    phase: "ALWAYS",
    title: "Creative Technologist",
    desc: "Merging design thinking with engineering. Building things that don't just work — they feel remarkable.",
    skills: ["UI/UX", "Web Design", "Branding", "Motion", "Storytelling"],
    status: "core",
    icon: "✦",
  },
];

const SKILLS = [
  { name: "HTML & CSS", pct: 85, cat: "Development" },
  { name: "JavaScript", pct: 65, cat: "Development" },
  { name: "Python", pct: 60, cat: "Development" },
  { name: "Networking Fundamentals", pct: 50, cat: "Networks" },
  { name: "Linux CLI", pct: 55, cat: "Systems" },
  { name: "UI / UX Design", pct: 70, cat: "Creative" },
  { name: "AI-Assisted Dev", pct: 80, cat: "Tools" },
  { name: "Cybersecurity Basics", pct: 40, cat: "Security" },
];

const INTERESTS = [
  { icon: "🖥️", label: "Web Development" },
  { icon: "🔐", label: "Cybersecurity" },
  { icon: "🌐", label: "Network Engineering" },
  { icon: "🤖", label: "AI & Machine Learning" },
  { icon: "🎨", label: "Creative Design" },
  { icon: "⚡", label: "CTF Challenges" },
  { icon: "📡", label: "Open Source" },
  { icon: "🛡️", label: "Ethical Hacking" },
];

/* ============================================================
   HOOKS
   ============================================================ */
function useTypewriter(text, speed = 60, start = true) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!start) return;
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);
  return displayed;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ============================================================
   COMPONENTS
   ============================================================ */

// Animated section wrapper
function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.8s ${delay}s ease, transform 0.8s ${delay}s ease`,
      }}
    >
      {children}
    </div>
  );
}

// Section label
function Label({ n, text }) {
  return (
    <p style={{
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: "0.68rem",
      color: "#3ddc5a",
      letterSpacing: "0.4em",
      textTransform: "uppercase",
      marginBottom: "0.7rem",
    }}>
      [ {n} — {text} ]
    </p>
  );
}

// Divider
function Divider() {
  return (
    <div style={{
      width: 60, height: 2,
      background: "linear-gradient(90deg, #3ddc5a, transparent)",
      margin: "0.8rem 0 2.8rem",
    }} />
  );
}

// Skill bar
function Bar({ name, pct, cat, delay }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: "1.4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#e8f5ea" }}>{name}</span>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "#7aab82", letterSpacing: "0.1em" }}>{cat}</span>
          <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.68rem", color: "#3ddc5a" }}>{pct}%</span>
        </div>
      </div>
      <div style={{ height: 3, background: "rgba(45,138,62,0.12)", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: visible ? `${pct}%` : "0%",
          background: "linear-gradient(90deg, #1a4a24, #3ddc5a)",
          boxShadow: "0 0 8px rgba(0,255,68,0.25)",
          transition: `width 1.4s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
        }} />
      </div>
    </div>
  );
}

// Roadmap card
function RoadCard({ item, index }) {
  const [ref, visible] = useInView();
  const statusColor = {
    active: "#3ddc5a",
    building: "#7aab82",
    planned: "#2d8a3e",
    core: "#3ddc5a",
  }[item.status];

  const statusLabel = {
    active: "● IN PROGRESS",
    building: "◎ NEXT UP",
    planned: "○ PLANNED",
    core: "★ CORE",
  }[item.status];

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ${index * 0.15}s ease, transform 0.7s ${index * 0.15}s ease`,
        border: `1px solid ${item.status === "active" ? "rgba(61,220,90,0.4)" : "rgba(45,138,62,0.2)"}`,
        padding: "2rem",
        background: item.status === "active" ? "rgba(26,74,36,0.2)" : "rgba(2,10,4,0.6)",
        position: "relative",
        overflow: "hidden",
        clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
      }}
    >
      {/* Phase badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <span style={{
          fontFamily: "'Share Tech Mono',monospace",
          fontSize: "0.62rem",
          color: statusColor,
          letterSpacing: "0.25em",
        }}>{statusLabel}</span>
        <span style={{ fontSize: "1.6rem" }}>{item.icon}</span>
      </div>

      <p style={{
        fontFamily: "'Share Tech Mono',monospace",
        fontSize: "0.6rem",
        color: "rgba(122,171,130,0.5)",
        letterSpacing: "0.3em",
        marginBottom: "0.4rem",
      }}>{item.phase}</p>

      <h3 style={{
        fontFamily: "'Orbitron',monospace",
        fontSize: "1rem",
        fontWeight: 700,
        color: "#e8f5ea",
        marginBottom: "0.9rem",
        letterSpacing: "0.05em",
      }}>{item.title}</h3>

      <p style={{ color: "#7aab82", fontSize: "0.92rem", lineHeight: 1.75, marginBottom: "1.2rem", fontWeight: 300 }}>
        {item.desc}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {item.skills.map(s => (
          <span key={s} style={{
            fontFamily: "'Share Tech Mono',monospace",
            fontSize: "0.6rem",
            color: statusColor,
            border: `1px solid ${statusColor}44`,
            padding: "0.18rem 0.65rem",
            letterSpacing: "0.08em",
          }}>{s}</span>
        ))}
      </div>

      {/* Active glow top border */}
      {item.status === "active" && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, #3ddc5a, transparent)",
        }} />
      )}
    </div>
  );
}

/* ============================================================
   MAIN APP
   ============================================================ */
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const typed = useTypewriter(ME.tagline, 55, true);

  // Track active nav section
  useEffect(() => {
    const sections = ["hero", "about", "roadmap", "skills", "interests", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setFormState({ name: "", email: "", message: "" });
  }

  const navLinks = ["about", "roadmap", "skills", "interests", "contact"];

  // Shared section styles
  const sectionStyle = {
    position: "relative",
    zIndex: 1,
    maxWidth: 1200,
    margin: "0 auto",
    padding: "6rem 4rem",
  };

  const h2Style = {
    fontFamily: "'Orbitron', monospace",
    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
    fontWeight: 700,
    lineHeight: 1.1,
    marginBottom: "0.6rem",
  };

  return (
    <div style={{
      background: "#020a04",
      color: "#e8f5ea",
      fontFamily: "'Rajdhani', sans-serif",
      fontSize: 18,
      lineHeight: 1.7,
      overflowX: "hidden",
      minHeight: "100vh",
    }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&family=Share+Tech+Mono&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        a { text-decoration: none; color: inherit; }
        ::selection { background: rgba(61,220,90,0.3); }

        /* Grid background */
        body::before {
          content:'';
          position:fixed; inset:0;
          background-image:
            linear-gradient(rgba(45,138,62,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,138,62,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events:none; z-index:0;
        }

        /* Scanline */
        body::after {
          content:'';
          position:fixed; inset:0;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.016) 2px, rgba(0,0,0,0.016) 4px);
          pointer-events:none; z-index:800;
        }

        @keyframes glowPulse {
          0%,100% { text-shadow: 0 0 20px rgba(0,255,68,0.3); }
          50% { text-shadow: 0 0 60px rgba(0,255,68,0.8), 0 0 100px rgba(0,255,68,0.3); }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes float {
          0%,100% { transform:translateY(0); }
          50% { transform:translateY(-8px); }
        }
        @keyframes scanMove {
          from { transform: translateY(-100%); }
          to   { transform: translateY(100vh); }
        }

        .nav-link { transition: color 0.3s; position: relative; }
        .nav-link::after {
          content:''; position:absolute; bottom:-3px; left:0;
          width:0; height:1px; background:#3ddc5a;
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: #3ddc5a !important; }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: #3ddc5a !important; }
        .nav-link.active::after { width: 100%; }

        .skill-card-hover {
          transition: border-color 0.4s, background 0.4s, transform 0.3s;
        }
        .skill-card-hover:hover {
          border-color: rgba(61,220,90,0.45) !important;
          background: rgba(26,74,36,0.2) !important;
          transform: translateY(-4px);
        }

        .interest-hover {
          transition: all 0.3s;
          cursor: default;
        }
        .interest-hover:hover {
          border-color: #3ddc5a !important;
          background: rgba(61,220,90,0.06) !important;
          transform: translateY(-5px);
        }

        .btn-primary-hover {
          transition: all 0.3s;
        }
        .btn-primary-hover:hover {
          background: #ffffff !important;
          box-shadow: 0 0 30px rgba(0,255,68,0.3);
        }

        .btn-sec-hover {
          transition: all 0.3s;
        }
        .btn-sec-hover:hover {
          background: rgba(45,138,62,0.15) !important;
          border-color: #3ddc5a !important;
        }

        .contact-link-hover {
          transition: color 0.3s;
        }
        .contact-link-hover:hover { color: #3ddc5a !important; }

        @media (max-width: 768px) {
          .hero-section { padding: 0 2rem !important; }
          .main-section { padding: 5rem 1.5rem !important; }
          .two-col { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .roadmap-grid { grid-template-columns: 1fr !important; }
          .interests-grid { grid-template-columns: repeat(2,1fr) !important; }
          .nav-desktop { display: none !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* Corner decorations */}
      {["tl","tr","bl","br"].map(pos => (
        <div key={pos} style={{
          position: "fixed", width: 50, height: 50, zIndex: 100, pointerEvents: "none",
          top: pos.includes("t") ? "1.2rem" : "auto",
          bottom: pos.includes("b") ? "1.2rem" : "auto",
          left: pos.includes("l") ? "1.2rem" : "auto",
          right: pos.includes("r") ? "1.2rem" : "auto",
          borderTop: pos.includes("t") ? "1px solid #2d8a3e" : "none",
          borderBottom: pos.includes("b") ? "1px solid #2d8a3e" : "none",
          borderLeft: pos.includes("l") ? "1px solid #2d8a3e" : "none",
          borderRight: pos.includes("r") ? "1px solid #2d8a3e" : "none",
        }} />
      ))}

      {/* Scanning line effect */}
      <div style={{
        position: "fixed", left: 0, right: 0, height: 2, zIndex: 50, pointerEvents: "none",
        background: "linear-gradient(90deg, transparent, rgba(61,220,90,0.15), transparent)",
        animation: "scanMove 8s linear infinite",
      }} />

      {/* ==================== NAVIGATION ==================== */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1.1rem 3rem",
        background: "linear-gradient(180deg, rgba(2,10,4,0.97) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(45,138,62,0.15)",
      }}>
        <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.95rem", fontWeight: 900, color: "#3ddc5a", letterSpacing: "0.3em" }}>
          {ME.initials}<span style={{ color: "#e8f5ea" }}>_</span>
          <span style={{ animation: "blink 1s step-end infinite", display: "inline-block" }}>|</span>
        </div>

        {/* Desktop nav */}
        <ul className="nav-desktop" style={{ display: "flex", gap: "2.2rem", listStyle: "none" }}>
          {navLinks.map(l => (
            <li key={l}>
              <a href={`#${l}`} className={`nav-link ${activeSection === l ? "active" : ""}`}
                style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", color: "#7aab82", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button className="nav-mobile-btn" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "1px solid #2d8a3e", color: "#3ddc5a", padding: "0.4rem 0.8rem", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", cursor: "pointer" }}>
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          position: "fixed", top: "3.5rem", left: 0, right: 0, zIndex: 490,
          background: "rgba(2,10,4,0.98)", borderBottom: "1px solid rgba(45,138,62,0.2)",
          padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.2rem",
        }}>
          {navLinks.map(l => (
            <a key={l} href={`#${l}`} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.8rem", color: "#7aab82", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              {l}
            </a>
          ))}
        </div>
      )}

      {/* ==================== HERO ==================== */}
      <section id="hero" className="hero-section" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "0 6rem",
        position: "relative", zIndex: 1,
      }}>
        <p style={{
          fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem",
          color: "#3ddc5a", letterSpacing: "0.35em", textTransform: "uppercase",
          marginBottom: "1.5rem",
          animation: "fadeUp 0.8s 0.2s both",
        }}>
          <span style={{ color: "#1a4a24" }}>// </span>
          {ME.location} — Portfolio 2026
        </p>

        <h1 style={{
          fontFamily: "'Orbitron',monospace",
          fontSize: "clamp(3rem, 8vw, 7rem)",
          fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em",
          animation: "fadeUp 0.8s 0.4s both",
          marginBottom: "0.2rem",
        }}>
          <span style={{ display: "block", color: "#e8f5ea" }}>{ME.name}</span>
          <span style={{
            display: "block", color: "transparent",
            WebkitTextStroke: "2px #3ddc5a",
            animation: "glowPulse 3s 1.2s ease-in-out infinite",
          }}>Dev.</span>
        </h1>

        <p style={{
          fontFamily: "'Share Tech Mono',monospace",
          fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
          color: "#7aab82", letterSpacing: "0.08em",
          margin: "2rem 0 2.8rem", maxWidth: 560,
          animation: "fadeUp 0.8s 0.6s both",
          minHeight: "1.5em",
        }}>
          {typed}<span style={{ animation: "blink 0.8s step-end infinite" }}>_</span>
        </p>

        <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", animation: "fadeUp 0.8s 0.8s both" }}>
          <a href="#roadmap" className="btn-primary-hover" style={{
            fontFamily: "'Share Tech Mono',monospace", fontSize: "0.75rem",
            letterSpacing: "0.15em", textTransform: "uppercase",
            background: "#3ddc5a", color: "#020a04",
            padding: "0.9rem 2.2rem",
            clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
          }}>
            View My Roadmap
          </a>
          <a href="#contact" className="btn-sec-hover" style={{
            fontFamily: "'Share Tech Mono',monospace", fontSize: "0.75rem",
            letterSpacing: "0.15em", textTransform: "uppercase",
            background: "transparent", color: "#3ddc5a",
            padding: "0.9rem 2.2rem",
            border: "1px solid #2d8a3e",
            clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
          }}>
            Get In Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "3rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          animation: "float 2.5s ease-in-out infinite",
        }}>
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "#2d8a3e", letterSpacing: "0.2em" }}>SCROLL</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, #2d8a3e, transparent)" }} />
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="main-section" style={sectionStyle}>
        <Reveal>
          <Label n="01" text="Profile" />
          <h2 style={h2Style}>About <span style={{ color: "#3ddc5a" }}>Me</span></h2>
          <Divider />
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "5rem", alignItems: "center" }}>
            <div>
              {ME.about.map((p, i) => (
                <p key={i} style={{ color: "#7aab82", marginBottom: "1.2rem", fontWeight: 300 }}
                  dangerouslySetInnerHTML={{ __html: p.replace(/software developer trainee|network engineering|cybersecurity|creative technologist|AI-assisted development/gi, m => `<strong style="color:#e8f5ea;font-weight:600">${m}</strong>`) }}
                />
              ))}

              {/* Identity tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "1.8rem" }}>
                {["Software Dev", "Network Eng", "Cybersecurity", "Creative Tech"].map(t => (
                  <span key={t} style={{
                    fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem",
                    color: "#3ddc5a", border: "1px solid rgba(61,220,90,0.3)",
                    padding: "0.3rem 0.9rem", letterSpacing: "0.1em",
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(45,138,62,0.1)", border: "1px solid rgba(61,220,90,0.12)" }}>
              {[
                { n: "4", label: "Disciplines" },
                { n: "1+", label: "Year Training" },
                { n: "∞", label: "Curiosity" },
                { n: "0", label: "Quit Attempts" },
              ].map(s => (
                <div key={s.label} style={{ background: "#020a04", padding: "2rem 1.2rem", textAlign: "center", transition: "background 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(26,74,36,0.3)"}
                  onMouseLeave={e => e.currentTarget.style.background = "#020a04"}>
                  <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "2.4rem", fontWeight: 900, color: "#3ddc5a", display: "block", textShadow: "0 0 20px rgba(0,255,68,0.25)" }}>{s.n}</span>
                  <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "#7aab82", letterSpacing: "0.18em", textTransform: "uppercase" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ==================== ROADMAP ==================== */}
      <section id="roadmap" style={{ ...sectionStyle, maxWidth: "100%", background: "rgba(10,26,14,0.4)", padding: "6rem 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 4rem" }}>
          <Reveal>
            <Label n="02" text="Journey" />
            <h2 style={h2Style}>My <span style={{ color: "#3ddc5a" }}>Roadmap</span></h2>
            <Divider />
          </Reveal>
          <div className="roadmap-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem" }}>
            {ROADMAP.map((item, i) => <RoadCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* ==================== SKILLS ==================== */}
      <section id="skills" className="main-section" style={sectionStyle}>
        <Reveal>
          <Label n="03" text="Capabilities" />
          <h2 style={h2Style}>Skills & <span style={{ color: "#3ddc5a" }}>Progress</span></h2>
          <Divider />
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
            <div>
              {SKILLS.slice(0, 4).map((s, i) => <Bar key={s.name} {...s} delay={i * 0.1} />)}
            </div>
            <div>
              {SKILLS.slice(4).map((s, i) => <Bar key={s.name} {...s} delay={i * 0.1} />)}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ==================== INTERESTS ==================== */}
      <section id="interests" style={{ ...sectionStyle, maxWidth: "100%", background: "rgba(10,26,14,0.3)", padding: "6rem 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 4rem" }}>
          <Reveal>
            <Label n="04" text="Passions" />
            <h2 style={h2Style}>What I <span style={{ color: "#3ddc5a" }}>Love</span></h2>
            <Divider />
            <div className="interests-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
              {INTERESTS.map((item, i) => (
                <div key={item.label} className="interest-hover" style={{
                  border: "1px solid rgba(45,138,62,0.18)",
                  padding: "1.5rem 1rem", textAlign: "center",
                  background: "rgba(2,10,4,0.5)",
                  opacity: 0, animation: `fadeUp 0.6s ${0.1 + i * 0.08}s both`,
                }}>
                  <span style={{ fontSize: "1.8rem", display: "block", marginBottom: "0.6rem" }}>{item.icon}</span>
                  <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: "#7aab82", letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="main-section" style={{ ...sectionStyle, borderTop: "1px solid rgba(45,138,62,0.1)" }}>
        <Reveal>
          <Label n="05" text="Connect" />
          <h2 style={h2Style}>Get In <span style={{ color: "#3ddc5a" }}>Touch</span></h2>
          <Divider />
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }}>

            <div>
              <p style={{ color: "#7aab82", marginBottom: "2rem", fontWeight: 300 }}>
                Whether it's a project, a collaboration, a question about networking, or just a conversation about cybersecurity — my inbox is open.
              </p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  { icon: "✉", label: ME.email, href: `mailto:${ME.email}` },
                  { icon: "◈", label: ME.github, href: `https://${ME.github}` },
                  { icon: "⬡", label: ME.linkedin, href: `https://${ME.linkedin}` },
                ].map(l => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                    className="contact-link-hover"
                    style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#7aab82", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.76rem", padding: "0.9rem 0", borderBottom: "1px solid rgba(45,138,62,0.1)" }}>
                    <span style={{ fontSize: "1rem" }}>{l.icon}</span> {l.label}
                  </a>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {[
                { id: "name", label: "Name", type: "text", placeholder: "Your full name" },
                { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              ].map(f => (
                <div key={f.id}>
                  <label style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: "#2d8a3e", letterSpacing: "0.22em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={formState[f.id]}
                    onChange={e => setFormState(p => ({ ...p, [f.id]: e.target.value }))}
                    required
                    style={{ width: "100%", background: "rgba(10,26,14,0.85)", border: "1px solid rgba(45,138,62,0.22)", color: "#e8f5ea", fontFamily: "'Rajdhani',sans-serif", fontSize: "1rem", padding: "0.85rem 1.1rem", outline: "none", transition: "border-color 0.3s" }}
                    onFocus={e => e.target.style.borderColor = "#3ddc5a"}
                    onBlur={e => e.target.style.borderColor = "rgba(45,138,62,0.22)"} />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: "#2d8a3e", letterSpacing: "0.22em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Message</label>
                <textarea rows={5} placeholder="Tell me what you're working on..." value={formState.message}
                  onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                  required
                  style={{ width: "100%", background: "rgba(10,26,14,0.85)", border: "1px solid rgba(45,138,62,0.22)", color: "#e8f5ea", fontFamily: "'Rajdhani',sans-serif", fontSize: "1rem", padding: "0.85rem 1.1rem", outline: "none", resize: "none", transition: "border-color 0.3s" }}
                  onFocus={e => e.target.style.borderColor = "#3ddc5a"}
                  onBlur={e => e.target.style.borderColor = "rgba(45,138,62,0.22)"} />
              </div>
              <button type="submit" className="btn-primary-hover" style={{
                fontFamily: "'Share Tech Mono',monospace", fontSize: "0.75rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                background: submitted ? "#2d8a3e" : "#3ddc5a",
                color: "#020a04", border: "none", padding: "1rem 2rem",
                clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                cursor: "pointer", alignSelf: "flex-start", transition: "all 0.3s",
              }}>
                {submitted ? "Sent ✓" : "Send Message →"}
              </button>
            </form>

          </div>
        </Reveal>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer style={{
        position: "relative", zIndex: 1,
        textAlign: "center", padding: "2rem",
        borderTop: "1px solid rgba(45,138,62,0.1)",
      }}>
        <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "rgba(122,171,130,0.35)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Designed & Built by <span style={{ color: "#3ddc5a" }}>{ME.name}</span> — 2026 — Software Dev · Network Eng · Cybersecurity · Creative Tech
        </p>
      </footer>

    </div>
  );
}