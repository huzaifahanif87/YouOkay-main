import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { RevealOnScroll } from "./RevealOnScroll"

const heroSlides = [
  {
    id: 1,
    image: "/images/hero-1.png",
    title: "Stay Connected,",
    subtitle: "Every Single Day.",
    description:
      "Get daily personalized texts designed to inspire, motivate, or inform. We're here for you.",
    primaryAction: { text: "Choose Your Plan", href: "#PlansSection" },
    secondaryAction: { text: "How It Works", href: "/services" },
  },
  {
    id: 2,
    image: "/images/hero-2.png",
    title: "Never Miss a Beat,",
    subtitle: "We'll Reach Out.",
    description:
      "Life gets busy. If you don't reply, we'll gently follow up to ensure you're always supported.",
    primaryAction: { text: "See Pricing", href: "#PlansSection" },
    secondaryAction: { text: "FAQs", href: "#FAQs" },
  },
  {
    id: 3,
    image: "/images/hero-3.png",
    title: "Your Daily Dose",
    subtitle: "of Inspiration.",
    description:
      "From reminders to encouragement, our texts are tailored to help you achieve your goals, one day at a time.",
    primaryAction: { text: "Sign Up Now", href: "/auth/register" },
    secondaryAction: { text: "Learn More", href: "/about-us" },
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef(null)
  const contentRef = useRef(null)

  // Auto-rotate slides
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(intervalRef.current)
  }, [])

  // Fade in animation
  useEffect(() => {
    const onScroll = () => {
      const top = contentRef.current?.getBoundingClientRect().top
      if (top < window.innerHeight) {
        contentRef.current?.classList.add("opacity-100", "translate-y-0")
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [currentSlide])

  const handleScroll = (href) => {
    const targetId = href.replace("#", "")
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const current = heroSlides[currentSlide]

  return (
    <section className="relative min-h-[70vh] max-h-[70vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={current.image}
          alt="Hero"
          className="w-full h-full object-cover transition-all duration-700 ease-in-out animate-[fade-in_0.8s_ease-in-out_forwards]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 mt-5 max-w-4xl text-center px-6 py-12 transition-all duration-1000 ease-out opacity-0 translate-y-4 md:translate-y-12"
      >
        <RevealOnScroll>
          <h1 className="text-white mt-40 md:mt-0 text-3xl md:text-6xl font-bold mb-4">
            {current.title}
            <br />
            <span className="text-secondary">{current.subtitle}</span>
          </h1>
        </RevealOnScroll>
        <RevealOnScroll>
          <p className="text-white text-xs md:text-lg mb-8">{current.description}</p>
        </RevealOnScroll>

        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap mb-10">
          {current.primaryAction.href.startsWith("#") ? (
            <button
              onClick={() => handleScroll(current.primaryAction.href)}
              className="bg-white/80 hover:bg-white text-secondary px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-md"
            >
              {current.primaryAction.text}
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <Link to={current.primaryAction.href}>
              <button className="bg-white/80 hover:bg-white text-secondary px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-md">
                {current.primaryAction.text}
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          )}

          {current.secondaryAction.href.startsWith("#") ? (
            <button
              onClick={() => handleScroll(current.secondaryAction.href)}
              className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-blue-500 transition"
            >
              {current.secondaryAction.text}
            </button>
          ) : (
            <Link to={current.secondaryAction.href}>
              <button className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-blue-500 transition">
                {current.secondaryAction.text}
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
