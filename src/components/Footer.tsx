import { useState, useEffect, useRef } from "react";

// ─── Keyframe injection ────────────────────────────────────────────────────────
const KEYFRAMES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  @keyframes floatOrb {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-18px); }
  }
  @keyframes floatOrb2 {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(14px); }
  }
  @keyframes lineGrow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes checkIn {
    0%   { transform: scale(0) rotate(-12deg); opacity: 0; }
    60%  { transform: scale(1.15) rotate(2deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  @keyframes pulseDot {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.35); }
    50%       { box-shadow: 0 0 0 4px rgba(255,255,255,0); }
  }
  @keyframes shimmerBadge {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  /* ── Footer responsive layout ── */
  .sw-footer-grid {
    display: grid;
    grid-template-columns: 220px 1fr 320px;
    gap: 48px;
    align-items: start;
  }
  .sw-nav-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
  }
  .sw-bottom-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
  .sw-legal-links {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  @media (max-width: 1100px) {
    .sw-footer-grid {
      grid-template-columns: 200px 1fr;
      gap: 36px;
    }
    .sw-right-col {
      grid-column: 1 / -1;
    }
    .sw-waitlist-social-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
  }

  @media (max-width: 768px) {
    .sw-footer-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .sw-nav-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 28px 20px;
    }
    .sw-right-col {
      grid-column: auto;
    }
    .sw-waitlist-social-row {
      grid-template-columns: 1fr;
    }
    .sw-bottom-bar {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  }

  @media (max-width: 480px) {
    .sw-nav-grid {
      grid-template-columns: 1fr;
    }
    .sw-legal-links {
      flex-direction: column;
      gap: 10px;
    }
  }
`;

// ─── IntersectionObserver hook ────────────────────────────────────────────────
function useInView(threshold = 0.05) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const columns = [
  {
    label: "Company",
    links: ["About", "Founders", "Research", "Careers", "Newsroom", "Contact Us"],
  },
  {
    label: "Platform",
    links: [
      { text: "AI Health Score" },
      { text: "DoseGuard", badge: "New" },
      { text: "AI Doctor" },
      { text: "Medical Repository" },
      { text: "Family Health" },
      { text: "32+ Health Tools" },
      { text: "Video Consultation" },
    ],
  },
  {
    label: "Resources",
    links: ["IEEE Paper", "Documentation", "API Reference", "Blog", "FAQ", "Developer Guide"],
  },
  {
    label: "Use Cases",
    links: [
      "Diabetes Management",
      "Hypertension Care",
      "Thyroid Monitoring",
      "Post-Surgery Recovery",
      "Elderly Care",
    ],
    extra: { label: "Partners", links: ["PharmEasy", "Chandigarh University TBI"] },
  },
];

const socials = [
  {
    name: "LinkedIn",
    ariaLabel: "Follow us on LinkedIn",
    url: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    ariaLabel: "Follow us on Instagram",
    url: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "X / Twitter",
    ariaLabel: "Follow us on X (Twitter)",
    url: "#",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    ariaLabel: "Follow us on YouTube",
    url: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const compliance = ["ABDM Compliant", "HL7 FHIR R4", "AES-256 Encrypted"];
const bottomLinks = ["Privacy Policy", "Terms of Service", "Data Security", "Cookie Policy"];

// ─── Swasth Logo ──────────────────────────────────────────────────────────────
function SwasthLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <polygon points="30,8 70,8 95,30 95,70 70,92 30,92 5,70 5,30" fill="#fff" />
      <circle cx="50" cy="50" r="20" fill="#000" />
      <ellipse cx="21" cy="22" rx="13" ry="6" transform="rotate(-45 21 22)" fill="#000" />
      <ellipse cx="79" cy="22" rx="13" ry="6" transform="rotate(45 79 22)" fill="#000" />
      <ellipse cx="21" cy="78" rx="13" ry="6" transform="rotate(45 21 78)" fill="#000" />
      <ellipse cx="79" cy="78" rx="13" ry="6" transform="rotate(-45 79 78)" fill="#000" />
      <circle cx="50" cy="50" r="20" fill="#fff" />
      <circle cx="50" cy="50" r="16" fill="#000" />
      <rect x="43" y="33" width="14" height="34" rx="3" fill="#fff" />
      <rect x="33" y="43" width="34" height="14" rx="3" fill="#fff" />
    </svg>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
  const [hoveredBottom, setHoveredBottom] = useState<number | null>(null);
  const { ref: wrapRef, visible } = useInView(0.04);

  useEffect(() => {
    const id = "swasth-footer-kf-v3";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = KEYFRAMES;
      document.head.appendChild(style);
    }
  }, []);

  const handleSubscribe = () => {
    if (!email.includes("@") || loading || subscribed) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }, 1100);
  };

  const font = "'Inter', 'SF Pro Display', 'Helvetica Neue', sans-serif";

  const glass: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(24px) saturate(150%)",
    WebkitBackdropFilter: "blur(24px) saturate(150%)",
    border: "1px solid rgba(255,255,255,0.09)",
  };

  return (
    <footer
      ref={wrapRef as React.RefObject<HTMLElement>}
      style={{
        fontFamily: font,
        position: "relative",
        background: "#000",
        isolation: "isolate",
      }}
      aria-label="Site footer"
    >
      {/* ── Ambient orbs ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "5%", left: "-8%",
          width: 560, height: 560, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)",
          animation: "floatOrb 10s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", top: "25%", right: "-8%",
          width: 460, height: 460, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 65%)",
          animation: "floatOrb2 12s ease-in-out infinite",
        }} />

        {/* Grain */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.028 }}>
          <filter id="swfgrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#swfgrain)" />
        </svg>

        {/* Top separator line */}
        <div style={{
          position: "absolute", top: 0, left: "6%", right: "6%",
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.14) 30%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.14) 70%, transparent)",
          animation: "lineGrow 1.6s cubic-bezier(0.16,1,0.3,1) forwards",
          transformOrigin: "left center",
        }} />
      </div>

      {/* ── Main content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1300,
          margin: "0 auto",
          padding: "clamp(56px,8vw,88px) clamp(20px,4vw,56px) 0",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* ── 3-col responsive grid ── */}
        <div className="sw-footer-grid">

          {/* ─── LEFT: Brand ────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Logo + wordmark */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <SwasthLogo size={34} />
                <span style={{
                  fontSize: 19, fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                }}>
                  Swasth AI
                </span>
              </div>
              <p style={{
                fontSize: 13.5, lineHeight: 1.7,
                color: "rgba(255,255,255,0.45)",
                margin: 0,
              }}>
                AI-native healthcare platform built for India's next billion.
              </p>
            </div>

            {/* Certifications */}
            <div style={{ ...glass, borderRadius: 16, padding: "16px 18px" }}>
              <p style={{
                margin: "0 0 10px", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
              }}>
                CERTIFICATIONS
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 9 }}>
                {compliance.map((b, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: "#fff", flexShrink: 0, opacity: 0.65,
                      animation: "pulseDot 2.8s ease-in-out infinite",
                      animationDelay: `${i * 0.5}s`,
                    }} />
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Copyright — fixed spacing */}
            <p style={{ margin: 0, fontSize: 12.5, color: "rgba(255,255,255,0.22)", lineHeight: 1.65 }}>
              © 2025 Swasth AI, Inc.{" "}
              <br />
              All rights reserved.
            </p>
          </div>

          {/* ─── MIDDLE: Nav columns ────────────────────────────── */}
          <div className="sw-nav-grid">
            {columns.map((col, ci) => (
              <div key={ci} style={{ display: "flex", flexDirection: "column" }}>

                {/* Semantic heading — fixes "p tag" accessibility issue */}
                <h3 style={{
                  margin: "0 0 18px",
                  fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.65)",
                }}>
                  {col.label}
                </h3>

                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                  {col.links.map((link, li) => {
                    const text = typeof link === "string" ? link : link.text;
                    const badge = typeof link === "object" && "badge" in link ? link.badge : null;
                    const key = `${ci}-${li}`;
                    const hov = hoveredLink === key;
                    return (
                      <li key={li}>
                        <a
                          href="#"
                          onMouseEnter={() => setHoveredLink(key)}
                          onMouseLeave={() => setHoveredLink(null)}
                          style={{
                            fontSize: 14,
                            color: hov ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.55)",
                            textDecoration: "none",
                            transition: "color 0.2s ease, transform 0.2s ease",
                            display: "inline-flex", alignItems: "center", gap: 7,
                            transform: hov ? "translateX(2px)" : "none",
                            fontWeight: hov ? 500 : 400,
                          }}
                        >
                          {text}
                          {badge && (
                            <span style={{
                              fontSize: 9, fontWeight: 700,
                              background: "linear-gradient(120deg, rgba(255,255,255,0.95) 0%, rgba(200,200,200,0.95) 50%, rgba(255,255,255,0.95) 100%)",
                              backgroundSize: "200%",
                              animation: "shimmerBadge 3s linear infinite",
                              color: "#000",
                              borderRadius: 4,
                              padding: "2px 7px",
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                            }}>
                              {badge}
                            </span>
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>

                {col.extra && (
                  <>
                    <h3 style={{
                      margin: "24px 0 16px",
                      fontSize: 12, fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.65)",
                    }}>
                      {col.extra.label}
                    </h3>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                      {col.extra.links.map((lnk, li) => {
                        const key = `${ci}-ex-${li}`;
                        const hov = hoveredLink === key;
                        return (
                          <li key={li}>
                            <a
                              href="#"
                              onMouseEnter={() => setHoveredLink(key)}
                              onMouseLeave={() => setHoveredLink(null)}
                              style={{
                                fontSize: 14,
                                color: hov ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.55)",
                                textDecoration: "none",
                                transition: "color 0.2s ease, transform 0.2s ease",
                                display: "inline-block",
                                transform: hov ? "translateX(2px)" : "none",
                                fontWeight: hov ? 500 : 400,
                              }}
                            >
                              {lnk}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* ─── RIGHT: Waitlist + Socials ───────────────────────── */}
          <div className="sw-right-col sw-waitlist-social-row" style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Glassmorphic waitlist card */}
            <div style={{
              ...glass,
              borderRadius: 20,
              padding: "28px 24px",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Corner highlight */}
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: 90, height: 90,
                background: "radial-gradient(circle at top right, rgba(255,255,255,0.07), transparent 70%)",
                borderRadius: "0 20px 0 0",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", top: 0, left: "20%", right: "20%",
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                pointerEvents: "none",
              }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Icon */}
                <div style={{
                  width: 42, height: 42, borderRadius: 13, marginBottom: 18,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,255,255,0.8)" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>

                <p style={{
                  margin: "0 0 7px", fontSize: 18, fontWeight: 700,
                  letterSpacing: "-0.025em", color: "#fff",
                }}>
                  Early Access
                </p>
                <p style={{
                  margin: "0 0 20px", fontSize: 13,
                  color: "rgba(255,255,255,0.42)", lineHeight: 1.65,
                }}>
                  Join 2,400+ on the waitlist and be first to experience AI-powered healthcare.
                </p>

                {/* Email input — accessible */}
                <label htmlFor="sw-email-input" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
                  Email address for early access
                </label>
                <div style={{
                  position: "relative",
                  marginBottom: 10,
                  borderRadius: 13,
                  padding: 1,
                  background: focusedInput
                    ? "linear-gradient(135deg, rgba(255,255,255,0.45), rgba(255,255,255,0.12))"
                    : "rgba(255,255,255,0.1)",
                  transition: "background 0.28s ease",
                  boxShadow: focusedInput
                    ? "0 0 0 3px rgba(255,255,255,0.06), 0 0 18px rgba(255,255,255,0.05)"
                    : "none",
                }}>
                  <input
                    id="sw-email-input"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    onFocus={() => setFocusedInput(true)}
                    onBlur={() => setFocusedInput(false)}
                    aria-label="Email address for early access"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: 12,
                      border: "none",
                      outline: "none",
                      fontSize: 14,
                      background: "#0c0c0c",
                      color: "#fff",
                      fontFamily: font,
                      boxSizing: "border-box",
                      caretColor: "#fff",
                      letterSpacing: "0.01em",
                    }}
                  />
                </div>

                {/* CTA button — shiny white */}
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "13px 18px",
                    borderRadius: 13,
                    border: "none",
                    background: subscribed
                      ? "rgba(255,255,255,0.12)"
                      : loading
                        ? "rgba(255,255,255,0.07)"
                        : "linear-gradient(180deg, #ffffff 0%, #dcdcdc 100%)",
                    color: subscribed || loading ? "rgba(255,255,255,0.65)" : "#000",
                    fontSize: 13.5,
                    fontWeight: 650,
                    cursor: loading ? "default" : "pointer",
                    fontFamily: font,
                    letterSpacing: "-0.01em",
                    transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
                    boxShadow: subscribed || loading
                      ? "none"
                      : "0 1px 0 rgba(255,255,255,0.3) inset, 0 4px 20px rgba(0,0,0,0.55)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && !subscribed) {
                      const b = e.currentTarget as HTMLButtonElement;
                      b.style.transform = "translateY(-1.5px)";
                      b.style.boxShadow = "0 1px 0 rgba(255,255,255,0.3) inset, 0 8px 28px rgba(0,0,0,0.6)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const b = e.currentTarget as HTMLButtonElement;
                    b.style.transform = "";
                    b.style.boxShadow = subscribed || loading
                      ? "none"
                      : "0 1px 0 rgba(255,255,255,0.3) inset, 0 4px 20px rgba(0,0,0,0.55)";
                  }}
                >
                  {subscribed ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                        strokeLinejoin="round" aria-hidden="true"
                        style={{ animation: "checkIn 0.35s ease forwards" }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      You're on the waitlist!
                    </>
                  ) : loading ? (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" aria-hidden="true"
                        style={{ animation: "spinSlow 0.75s linear infinite" }}>
                        <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="20" />
                      </svg>
                      Joining…
                    </>
                  ) : "Request Early Access →"}
                </button>

                <p style={{
                  margin: "12px 0 0",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.22)",
                  textAlign: "center",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinecap="round"
                    aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  No spam · Unsubscribe anytime
                </p>
              </div>
            </div>

            {/* Social row — fully accessible */}
            <div style={{
              ...glass,
              borderRadius: 16,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}>
              <span style={{
                fontSize: 11.5, fontWeight: 600,
                color: "rgba(255,255,255,0.28)",
                marginRight: "auto",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>
                Follow us
              </span>
              {socials.map((s, i) => {
                const hov = hoveredSocial === i;
                return (
                  <a
                    key={i}
                    href={s.url}
                    aria-label={s.ariaLabel}
                    onMouseEnter={() => setHoveredSocial(i)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    style={{
                      width: 36, height: 36, borderRadius: 10,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: hov ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.05)",
                      color: hov ? "#fff" : "rgba(255,255,255,0.42)",
                      border: `1px solid ${hov ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)"}`,
                      transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
                      transform: hov ? "translateY(-2px) scale(1.06)" : "none",
                      boxShadow: hov ? "0 4px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)" : "none",
                      textDecoration: "none",
                    }}
                  >
                    {s.icon}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Divider — improved visibility ── */}
        <div style={{
          margin: "56px 0 32px",
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.12) 80%, transparent)",
        }} />

        {/* ── Bottom legal bar ── */}
        <div className="sw-bottom-bar" style={{ paddingBottom: 0 }}>
          <p style={{
            margin: 0, fontSize: 12,
            color: "rgba(255,255,255,0.24)",
            display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap",
            lineHeight: 1.7,
          }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              Built with{" "}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#e5e5e5"
                style={{ margin: "0 1px" }} aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>{" "}
              in India
            </span>
            <span style={{ color: "rgba(255,255,255,0.1)" }} aria-hidden="true">·</span>
            <span>Incubated at CU TBI</span>
            <span style={{ color: "rgba(255,255,255,0.1)" }} aria-hidden="true">·</span>
            <span>IEEE Published</span>
            <span style={{ color: "rgba(255,255,255,0.1)" }} aria-hidden="true">·</span>
            <span>Patent Pending</span>
          </p>

          {/* Legal links — wrappable */}
          <nav aria-label="Legal links">
            <ul className="sw-legal-links" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {bottomLinks.map((lnk, i) => {
                const hov = hoveredBottom === i;
                return (
                  <li key={i}>
                    <a
                      href="#"
                      onMouseEnter={() => setHoveredBottom(i)}
                      onMouseLeave={() => setHoveredBottom(null)}
                      style={{
                        fontSize: 12,
                        color: hov ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.32)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                        letterSpacing: "0.01em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {lnk}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* ── Giant ghost wordmark ── */}
      <div style={{
        maxWidth: 1300,
        margin: "28px auto 0",
        padding: "0 clamp(20px,4vw,56px)",
        overflow: "hidden",
        userSelect: "none",
        pointerEvents: "none",
      }}
        aria-hidden="true"
      >
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 16,
          transform: "translateY(22%)",
        }}>
          {/* Ghost logo */}
          <svg width="140" height="140" viewBox="0 0 100 100" fill="none" style={{ flexShrink: 0, opacity: 0.9 }}>
            <polygon points="30,8 70,8 95,30 95,70 70,92 30,92 5,70 5,30"
              fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <circle cx="50" cy="50" r="20" fill="rgba(255,255,255,0.04)" />
            <rect x="43" y="33" width="14" height="34" rx="3" fill="rgba(255,255,255,0.04)" />
            <rect x="33" y="43" width="34" height="14" rx="3" fill="rgba(255,255,255,0.04)" />
          </svg>

          {/* Giant text — visible ghost gradient */}
          <div style={{
            fontSize: "clamp(72px, 11.5vw, 160px)",
            fontWeight: 900,
            letterSpacing: "-0.048em",
            lineHeight: 0.85,
            whiteSpace: "nowrap",
            fontFamily: font,
            background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Swasth AI
          </div>
        </div>
      </div>

      {/* ── Bottom micro-line ── */}
      <div style={{
        height: 1,
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.09) 30%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0.09) 70%, transparent 100%)",
      }} />
    </footer>
  );
};

export default Footer;
