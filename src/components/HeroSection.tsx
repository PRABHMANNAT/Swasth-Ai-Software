import React from "react";

// Inline Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "gradient";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", className = "", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default: "bg-white text-black hover:bg-gray-100",
      secondary: "bg-gray-800 text-white hover:bg-gray-700",
      ghost: "hover:bg-gray-800/50 text-white",
      gradient: "bg-gradient-to-b from-white via-white/95 to-white/60 text-black hover:scale-105 active:scale-95"
    };

    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-10 px-5 text-sm",
      lg: "h-12 px-8 text-base"
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// Icons
const ArrowRight = ({ className = "", size = 16 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const Menu = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const X = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// Navigation Component
const Navigation = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "For Doctors", href: "#for-doctors" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      {/* Floating pill navbar */}
      <nav
        className="w-full flex items-center justify-between px-5 py-3 backdrop-blur-md border border-white/10"
        style={{
          maxWidth: 900,
          background: "rgba(0,0,0,0.60)",
          borderRadius: "9999px",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 18 }}>🩺</span>
          <span className="text-base font-bold text-white tracking-tight">Swasth AI</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button type="button" variant="ghost" size="sm" className="rounded-full">
            Sign in
          </Button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 h-9 text-sm font-semibold text-black bg-white hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            Join Waitlist
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-white cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu — drops below the pill */}
      {mobileMenuOpen && (
        <div
          className="absolute top-20 left-4 right-4 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
          style={{ background: "rgba(0,0,0,0.90)" }}
        >
          <div className="px-6 py-5 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
              <Button type="button" variant="ghost" size="sm" className="rounded-full w-full">
                Sign in
              </Button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full px-5 h-10 text-sm font-semibold text-black bg-white hover:bg-gray-100 cursor-pointer"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

Navigation.displayName = "Navigation";

// Hero Component
const Hero = React.memo(() => {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-start px-6 py-20 md:py-24 overflow-hidden"
      style={{ animation: "fadeIn 0.6s ease-out" }}
    >
      {/* Looping video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <source src="/hero-background.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.60)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Content — above video (z-0) and overlay (z-1) */}
      <div className="relative flex flex-col items-center w-full" style={{ zIndex: 2 }}>

        {/* Headline */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-3xl px-6 leading-tight mb-6"
          style={{ letterSpacing: "-0.04em" }}
        >
          <span
            style={{
              display: "block",
              background: "linear-gradient(to bottom, #ffffff 40%, #e5e7eb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            India's Healthcare,
          </span>
          <span
            style={{
              display: "block",
              background: "linear-gradient(to bottom, #e5e7eb 20%, rgba(209,213,219,0.55))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Finally in One Place.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-sm md:text-base text-center max-w-2xl px-6 mb-10 leading-relaxed"
          style={{ color: '#9ca3af' }}
        >
          Swasth AI unifies medical records, AI diagnostics, doctor bookings, e-pharmacy,
          and family health — all in a single platform built for Bharat.
        </p>

        {/* CTA */}
        <div className="flex items-center gap-4 mb-16">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 h-12 text-base font-semibold text-black bg-white hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
            aria-label="Join the Swasth AI waitlist"
          >
            Join the Waitlist
          </button>
        </div>

      </div>
    </section>
  );
});

Hero.displayName = "Hero";

// Main HeroSection Export
export default function HeroSection() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
    </main>
  );
}
