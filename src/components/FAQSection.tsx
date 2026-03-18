import { useEffect, useRef, useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "What is Swasth AI?",
    answer:
      "Swasth AI is an all-in-one healthcare platform that combines a mobile app with 32+ health management tools and DoseGuard — a wearable micro-dosing patch. It unifies your medical records, computes an AI-powered Health Score from your blood reports, lets you consult an AI doctor, book appointments, and manage your family's health from a single interface.",
  },
  {
    question: "What is DoseGuard?",
    answer:
      "DoseGuard is a wearable patch that monitors your vitals (heart rate, SpO2, temperature, motion) in real-time using bio-sensors, and delivers medication in precise micro-doses only when your body's signals indicate a need. It replaces fixed-schedule dosing with intelligent, body-responsive drug delivery.",
  },
  {
    question: "Is DoseGuard safe?",
    answer:
      "Safety is the core design principle. DoseGuard operates with a hard safety envelope: maximum dose limits per hour, mandatory cooldown periods, and a fail-safe rule — if any sensor faults are detected, the pump shuts off immediately. Every dose is logged with a reason and sent to the doctor's dashboard. Multi-sensor fusion prevents false triggers from any single sensor.",
  },
  {
    question: "How is my AI Health Score calculated?",
    answer:
      "When you upload a blood report, our AI extracts 80+ physiological parameters — covering thyroid function, kidney function, liver health, vitamins, cholesterol, blood counts, and more. Each parameter is analyzed against clinical reference ranges, scored individually, and aggregated into a single Health Score out of 100.",
  },
  {
    question: "Is my medical data secure?",
    answer:
      "Yes. All data is encrypted with AES-256 at rest and in transit via TLS 1.3. Authentication uses OAuth 2.0/OIDC. The platform is designed to be ABDM/FHIR compliant. Your records are only accessible to you, and you control who sees them.",
  },
  {
    question: "Can I use Swasth AI for my family?",
    answer:
      "Absolutely. The Family Health Management feature lets you manage medical records, Health Scores, and appointments for up to 5 family members from a single account. Switch between profiles in one tap.",
  },
  {
    question: "How does the AI Doctor work?",
    answer:
      "The AI Doctor uses open-source medical LLMs trained on government-approved medical databases. It provides symptom analysis, medication guidance, and personalized recommendations. For complex cases, it connects you to nearby verified doctors for real-time consultation. It's an AI-first triage layer — not a replacement for your physician.",
  },
  {
    question: "What conditions does Swasth AI support?",
    answer:
      "The platform is designed primarily for chronic condition management — diabetes, hypertension, thyroid disorders — but the Health Score and medical repository work for any patient. DoseGuard's drug cartridge system is designed to be modular, supporting different medications through swappable cartridges.",
  },
  {
    question: "Is Swasth AI available on iOS and Android?",
    answer:
      "The Swasth AI app is built with React Native and will be available on both iOS and Android. Early access is currently open for Android users in India.",
  },
  {
    question: "Do you have published research?",
    answer:
      'Yes. Our research paper — "Swasth AI: Unifying India\'s Fragmented Healthcare System Through AI-Powered Diagnostics and Model Fusion" — is published in IEEE ACROSET 2025 and indexed in Scopus. You can read it at https://ieeexplore.ieee.org/document/11280738.',
  },
  {
    question: "Is this just a concept or a working product?",
    answer:
      "Both the software and hardware are functional. The Swasth AI app has 32+ live features. The DoseGuard patch has been 3D-printed, sensor-tested, and has a working micro-pump with verified dose accuracy within 10% and trigger-to-dose response under 5 seconds.",
  },
  {
    question: "How is Swasth AI different from Practo, 1mg, or PharmEasy?",
    answer:
      "Those platforms solve individual problems — booking, pharmacy, or teleconsultation. Swasth AI is a unified platform that combines medical records, AI health scoring, doctor consultation, appointment booking, 32+ health tools, family management, AND a hardware wearable for intelligent drug delivery. No other platform in India connects your complete history to real-time body signals to drive treatment decisions.",
  },
  {
    question: "What's the business model?",
    answer:
      "Freemium. Basic features (records, basic Health Score, AI chat, booking, reminders) are free. Premium unlocks the full suite — advanced analytics, PDF chat, family management, personalized plans, and all 32+ tools. We also offer enterprise plans for hospitals and clinics with provider dashboards and API access.",
  },
  {
    question: "Are you looking for investment or partnerships?",
    answer:
      "Yes. We're actively seeking partnerships with hospitals, diagnostic chains, insurance providers, and government health programs. For investment inquiries, please reach out via our contact form or email us at contact@swasthai.com.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.12 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative overflow-hidden border-t border-white/10 bg-[#050505] px-6 py-24 text-white md:px-10 lg:px-16 lg:py-32"
    >
      {/* Background glow layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-3xl" />
        <div className="absolute left-[10%] top-[18%] h-72 w-72 rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute bottom-[10%] right-[8%] h-80 w-80 rounded-full bg-white/[0.04] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_32%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_18%,transparent_82%,rgba(255,255,255,0.02))]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div
          className={`mb-14 text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 backdrop-blur-xl">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
            <span className="text-xs font-medium uppercase tracking-[0.24em] text-white/75">
              FAQ
            </span>
          </div>

          <h2 className="mx-auto max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
            Frequently asked{" "}
            <span className="bg-gradient-to-b from-white to-white/65 bg-clip-text text-transparent">
              questions.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
            Everything you need to know about Swasth AI, DoseGuard, security,
            product readiness, and partnerships.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] backdrop-blur-2xl transition-all duration-500 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                } ${
                  isOpen
                    ? "shadow-[0_12px_50px_rgba(255,255,255,0.08)]"
                    : "hover:border-white/20 hover:bg-white/[0.06]"
                }`}
                style={{
                  transitionDelay: `${index * 70}ms`,
                }}
              >
                {/* top glossy line */}
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="relative flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-7 md:py-6"
                >
                  <div className="flex items-start gap-4 md:gap-5">
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-[11px] font-medium text-white/55 backdrop-blur-xl">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>

                    <div>
                      <h3
                        className={`text-base font-medium leading-7 tracking-[-0.02em] transition-colors md:text-lg ${
                          isOpen ? "text-white" : "text-white/88"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-500 ${
                      isOpen
                        ? "rotate-45 border-white/25 bg-white text-black shadow-[0_0_24px_rgba(255,255,255,0.35)]"
                        : "border-white/10 bg-white/[0.06] text-white/70 group-hover:border-white/20 group-hover:bg-white/[0.09]"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </div>
                </button>

                <div
                  ref={(el) => {
                    answerRefs.current[index] = el
                  }}
                  className="overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    maxHeight: isOpen
                      ? answerRefs.current[index]?.scrollHeight
                        ? `${answerRefs.current[index]!.scrollHeight + 24}px`
                        : "240px"
                      : "0px",
                  }}
                >
                  <div
                    className={`px-5 pb-6 md:px-7 md:pb-7 transition-all duration-500 ${
                      isOpen
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="ml-12 rounded-2xl border border-white/8 bg-black/20 px-5 py-4 backdrop-blur-xl md:ml-13">
                      <p className="text-sm leading-7 text-white/68 md:text-[15px]">
                        {faq.answer.includes("https://ieeexplore.ieee.org/document/11280738") ? (
                          <>
                            Yes. Our research paper —{" "}
                            <span className="text-white/92">
                              "Swasth AI: Unifying India's Fragmented Healthcare
                              System Through AI-Powered Diagnostics and Model
                              Fusion"
                            </span>{" "}
                            — is published in IEEE ACROSET 2025 and indexed in
                            Scopus. You can read it at{" "}
                            <a
                              href="https://ieeexplore.ieee.org/document/11280738"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white/70"
                            >
                              IEEE Xplore
                            </a>
                            .
                          </>
                        ) : (
                          faq.answer
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-14 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.05] p-6 text-center backdrop-blur-2xl md:p-8">
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <p className="text-sm text-white/60 md:text-base">
              Still have questions about Swasth AI, partnerships, or early access?
            </p>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center rounded-full border border-white/15 bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
