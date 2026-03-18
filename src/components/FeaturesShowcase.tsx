import { useEffect, useRef, useState } from "react"

// ─── Data: Swasth AI platform features ───────────────────────────────────────
const features = [
  {
    category: "AI DIAGNOSTICS",
    title: "AI Health Score",
    description:
      "Upload any blood report and our AI extracts 80+ physiological parameters — thyroid, kidney, liver, vitamins, cholesterol, and more — scoring each against clinical ranges to produce a single Health Score out of 100.",
    tags: ["Deep Learning", "OCR", "Clinical AI", "Blood Analysis", "FHIR"],
    color: "#0a1628",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    href: "#health-score",
  },
  {
    category: "WEARABLE HARDWARE",
    title: "DoseGuard",
    description:
      "A wearable micro-dosing patch that monitors vitals in real-time via bio-sensors and delivers medication only when your body's signals indicate a need — replacing fixed-schedule dosing with intelligent, body-responsive drug delivery.",
    tags: ["IoT", "Embedded Systems", "Bio-Sensors", "React Native", "Edge AI"],
    color: "#0d1f0f",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    href: "#doseguard",
  },
  {
    category: "MEDICAL LLM",
    title: "AI Doctor",
    description:
      "An AI-first triage layer powered by a fusion of open-source medical LLMs. Delivers structured triage outputs — risk level, likely causes, and next steps — and escalates to verified human doctors for real-time consultation.",
    tags: ["GenAI", "LLM Fusion", "RAG", "Medical NLP", "Python"],
    color: "#160d25",
    image: "https://images.unsplash.com/photo-1677442135968-6db3b0025e95?w=800&q=80",
    href: "#ai-doctor",
  },
  {
    category: "UNIFIED RECORDS",
    title: "Medical Repository",
    description:
      "One encrypted vault for your entire medical history — reports, prescriptions, imaging, and consultations. ABDM/FHIR compliant, AES-256 encrypted, accessible anywhere while keeping you in full control of your data.",
    tags: ["ABDM", "FHIR R4", "AES-256", "Cloud Sync", "Full-Stack"],
    color: "#1a1000",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80",
    href: "#repository",
  },
  {
    category: "FAMILY CARE",
    title: "Family Health Management",
    description:
      "Manage medical records, Health Scores, appointments, and reminders for up to 5 family members from a single account. Switch between profiles in one tap — built for India's multi-generational families.",
    tags: ["React Native", "Multi-Profile", "Notifications", "Healthcare", "Mobile"],
    color: "#0f1a22",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
    href: "#family",
  },
  {
    category: "IEEE PUBLISHED",
    title: "Research & Innovation",
    description:
      'Our work is published in IEEE ACROSET 2025 and indexed in Scopus — "Swasth AI: Unifying India\'s Fragmented Healthcare System Through AI-Powered Diagnostics and Model Fusion." Patent pending on DoseGuard\'s adaptive dosing algorithm.',
    tags: ["IEEE", "Scopus", "Patent Pending", "Model Fusion", "Research"],
    color: "#1a0d0d",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80",
    href: "https://ieeexplore.ieee.org/document/11280738",
  },
]

// ─── Perforated left-edge mask (ring binder effect) ──────────────────────────
const HOLES = Array.from({ length: 14 }, (_, i) => {
  const pct = ((i / 13) * 100).toFixed(1)
  return `radial-gradient(circle at 0% ${pct}%, transparent 5.5px, black 5.5px)`
}).join(",\n")

const MASK_STYLE: React.CSSProperties = {
  WebkitMaskImage: HOLES,
  maskImage: HOLES,
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
}

// ─── Single card component ────────────────────────────────────────────────────
function FeatureCard({
  feature,
  index,
  isVisible,
}: {
  feature: (typeof features)[0]
  index: number
  isVisible: boolean
}) {
  const TOP_BASE = 80
  const TOP_STEP = 24
  const top = TOP_BASE + index * TOP_STEP

  return (
    <div
      className="sticky will-change-transform"
      style={{
        top,
        zIndex: index + 1,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <a
        href={feature.href}
        target={feature.href.startsWith("http") ? "_blank" : undefined}
        rel={feature.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="block group"
        style={{
          transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)`,
          transitionDelay: `${index * 80}ms`,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0) scale(1)" : "translateY(48px) scale(0.97)",
        }}
      >
        {/* Card shell with perforated left edge */}
        <div
          className="relative overflow-hidden rounded-r-2xl transition-all duration-300 group-hover:scale-[1.015] group-hover:shadow-2xl shadow-lg"
          style={{
            background: "#0c0c0c",
            border: "1px solid rgba(255,255,255,0.08)",
            ...MASK_STYLE,
          }}
        >
          {/* Top shimmer line */}
          <div
            className="pointer-events-none absolute inset-x-8 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            }}
          />

          <div className="flex flex-col md:flex-row">
            {/* ── Left image panel ── */}
            <div
              className="relative w-full md:w-[42%] aspect-[4/3] md:aspect-auto"
              style={{
                backgroundColor: feature.color,
                minHeight: "clamp(220px, 25vw, 340px)",
              }}
            >
              <img
                src={feature.image}
                alt={feature.title}
                loading="lazy"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.55,
                  mixBlendMode: "overlay",
                }}
              />

              {/* Gradient overlay for text legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 100%)",
                }}
              />

              {/* Centered italic title */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <h3
                  className="text-white text-center leading-tight"
                  style={{
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    textShadow: "0 2px 16px rgba(0,0,0,0.6)",
                  }}
                >
                  {feature.title}
                </h3>
              </div>

              {/* Right-edge fade to card body */}
              <div
                className="absolute inset-y-0 right-0 w-16 hidden md:block"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #0c0c0c)",
                }}
              />
            </div>

            {/* ── Right content panel ── */}
            <div className="flex-1 p-7 md:p-10 flex flex-col justify-center">
              {/* Category label */}
              <span
                className="mb-2 block"
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {feature.category}
              </span>

              {/* Title */}
              <h4
                className="mb-3"
                style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontSize: "clamp(1.1rem, 2vw, 1.45rem)",
                  fontWeight: 400,
                  color: "#fff",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                }}
              >
                {feature.title}
              </h4>

              {/* Description */}
              <p
                className="mb-5 leading-relaxed"
                style={{
                  fontSize: "clamp(0.82rem, 1.2vw, 0.9375rem)",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.7,
                  maxWidth: 480,
                }}
              >
                {feature.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {feature.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "4px 10px",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.45)",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 999,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA arrow link */}
              <div className="mt-auto flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
                <span
                  style={{
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {feature.href.startsWith("http") ? "Read Paper" : "Learn More"}
                </span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform group-hover:translate-x-1"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function FeaturesShowcase() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.06 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #000 0%, #060606 6%, #060606 94%, #000 100%)",
        paddingTop: "clamp(5rem, 8vw, 8rem)",
        paddingBottom: "clamp(5rem, 8vw, 8rem)",
        paddingLeft: "clamp(1.5rem, 4vw, 2.5rem)",
        paddingRight: "clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      {/* Ambient background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute rounded-full"
          style={{
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 65%)",
            filter: "blur(4px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "10%",
            right: "5%",
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="relative mx-auto" style={{ maxWidth: 1200 }}>
        {/* ── Header ── */}
        <div
          className="text-center mb-16"
          style={{
            transition: "opacity 1s ease, transform 1s ease",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(28px)",
          }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center mb-5 rounded-full"
            style={{
              padding: "6px 16px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(16px)",
            }}
          >
            <span
              className="mr-2 inline-block rounded-full"
              style={{
                width: 7,
                height: 7,
                background: "#fff",
                boxShadow: "0 0 10px rgba(255,255,255,0.8)",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Platform
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "#fff",
              marginBottom: 16,
            }}
          >
            Everything health,{" "}
            <span
              style={{
                background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.55))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              unified.
            </span>
          </h2>

          <p
            style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
              color: "rgba(255,255,255,0.45)",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            From AI diagnostics and wearable hardware to a unified medical repository
            — built from the ground up for India's next billion.
          </p>
        </div>

        {/* ── Sticky stacked cards ── */}
        <div className="flex flex-col gap-5">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className="mt-16 text-center"
          style={{
            transition: "opacity 1s ease 600ms, transform 1s ease 600ms",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <a
            href="#faq"
            className="inline-flex items-center gap-2 rounded-full transition-all duration-200 hover:scale-[1.03]"
            style={{
              padding: "12px 28px",
              background: "#fff",
              color: "#000",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              boxShadow: "0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.3)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)")
            }
          >
            Explore all features
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
