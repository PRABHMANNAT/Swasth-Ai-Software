import React from "react";
import heroPoster from "../assets/hero.png";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", className = "", children, ...props }, ref) => {
    const variants = {
      default: "bg-white text-black hover:bg-gray-100",
      secondary:
        "border border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.1]",
      ghost: "text-white hover:bg-white/[0.06]",
    };

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-all ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

const Menu = ({ size = 24 }: { size?: number }) => (
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
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const X = ({ size = 24 }: { size?: number }) => (
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
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "DoseGuard", href: "#doseguard" },
  { label: "Research", href: "#research" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
];

const stats = [
  ["32+", "Health tools in one app"],
  ["80+", "Parameters in AI Health Score"],
  ["<5s", "Trigger-to-dose response"],
  ["10%", "Dose accuracy margin"],
];

const Navigation = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className="flex w-full items-center justify-between border border-white/10 px-5 py-3 backdrop-blur-md"
        style={{
          maxWidth: 960,
          background: "rgba(0,0,0,0.58)",
          borderRadius: "9999px",
        }}
      >
        <a href="#" className="flex items-center gap-2">
          <img src="/swasth-logo.svg" alt="" className="h-6 w-6" />
          <span className="text-base font-bold tracking-tight text-white">Swasth AI</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/65 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex">
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-gray-100"
          >
            Get Early Access
          </a>
        </div>

        <button
          type="button"
          className="cursor-pointer text-white md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div
          className="absolute left-4 right-4 top-20 overflow-hidden rounded-2xl border border-white/10 backdrop-blur-md"
          style={{ background: "rgba(0,0,0,0.92)" }}
        >
          <div className="flex flex-col gap-4 px-6 py-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-1 text-sm text-white/70 transition-colors hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#waitlist"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white text-sm font-semibold text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Early Access
            </a>
          </div>
        </div>
      )}
    </header>
  );
});

Navigation.displayName = "Navigation";

const Hero = React.memo(() => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = React.useState(false);
  const [videoFailed, setVideoFailed] = React.useState(false);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const canPlayMp4 = video.canPlayType("video/mp4");
    if (!canPlayMp4) {
      setVideoFailed(true);
      return;
    }

    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {
        setVideoFailed(true);
      });
    }
  }, []);

  return (
    <section
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-24 text-white md:px-10 lg:px-16"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <img
        src={heroPoster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={heroPoster}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: videoReady && !videoFailed ? 1 : 0,
          transition: "opacity 320ms ease",
        }}
        onLoadedData={() => setVideoReady(true)}
        onCanPlay={() => setVideoReady(true)}
        onError={() => setVideoFailed(true)}
      >
        <source src="/hero-background.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/65" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-[18%] h-80 w-80 -translate-x-1/2 rounded-full bg-white/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <span className="inline-flex rounded-full border border-white/12 bg-white/[0.08] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
          Backed by research. Built for India. Patent pending.
        </span>

        <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
          <span className="block">Your body talks.</span>
          <span className="mt-1 block bg-gradient-to-b from-white to-white/65 bg-clip-text text-transparent">
            Swasth AI listens.
          </span>
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-8 text-white/68 md:text-xl">
          The first platform that unifies your entire medical history, scores
          your health from 80+ blood parameters, and delivers medicine only
          when your body actually needs it - not on a fixed clock.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#waitlist"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:scale-[1.02] hover:bg-gray-100"
          >
            Get Early Access
          </a>
          <a
            href="#how-it-works"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-7 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/[0.1]"
          >
            See How It Works -&gt;
          </a>
        </div>

        <div className="mt-14 grid w-full gap-3 rounded-[30px] border border-white/10 bg-black/35 p-5 backdrop-blur-xl sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4">
              <div className="text-3xl font-semibold tracking-[-0.04em] text-white">
                {value}
              </div>
              <div className="mt-1 text-sm leading-6 text-white/55">{label}</div>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-4xl text-center text-sm leading-7 text-white/48">
          IEEE-published research {"\u00B7"} Commercial patent filed {"\u00B7"} Recognized
          by Chandigarh University TBI {"\u00B7"} PharmEasy partnership signed
        </p>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default function HeroSection() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
    </main>
  );
}
