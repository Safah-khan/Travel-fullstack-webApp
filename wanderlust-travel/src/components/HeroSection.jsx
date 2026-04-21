import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, MapPin } from 'lucide-react'

const slides = [
  {
    id: 0,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80',
    name: 'Swiss Alps, Switzerland',
    price: 'From $1,299',
    thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&q=70'
  },
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1800&q=80',
    name: 'Maldives, Indian Ocean',
    price: 'From $2,499',
    thumb: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=120&q=70'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1800&q=80',
    name: 'Banff, Canada',
    price: 'From $899',
    thumb: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=120&q=70'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1800&q=80',
    name: 'Iceland Aurora',
    price: 'From $1,599',
    thumb: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=120&q=70'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1800&q=80',
    name: 'Bali, Indonesia',
    price: 'From $799',
    thumb: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=120&q=70'
  }
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5500)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[1800ms] ease-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy/60 via-navy/40 to-navy/90" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy/40 via-transparent to-navy/30" />

      {/* Location Pill */}
      <div 
        className={`absolute top-24 left-4 sm:left-8 z-20 flex items-center gap-3 bg-navy/70 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
        }`}
        style={{ transitionDelay: '1.2s' }}
      >
        <div className="w-2 h-2 rounded-full bg-mint shadow-[0_0_0_3px_rgba(77,217,176,0.2)] animate-pulse" />
        <div className="text-xs text-white/70">
          Now viewing: <strong className="text-white">{slides[currentSlide].name}</strong>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div 
          className={`inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-4 py-2 text-xs font-semibold tracking-widest uppercase text-aqua mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
          }`}
          style={{ transitionDelay: '0.3s' }}
        >
          <span className="text-[10px]">✦</span>
          Award-Winning Travel Platform 2025
        </div>

        <h1 
          className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
          }`}
          style={{ transitionDelay: '0.55s' }}
        >
          Explore the World<br />
          with <span className="text-aqua italic">Wonder</span> &<br />
          <span className="text-amber">Freedom</span>
        </h1>

        <p 
          className={`text-base md:text-lg text-white/70 font-light leading-relaxed max-w-xl mx-auto mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
          }`}
          style={{ transitionDelay: '0.75s' }}
        >
          Your gateway to extraordinary adventures. From sun-kissed beaches to ancient mountain trails — we craft journeys that transform you forever.
        </p>

        <div 
          className={`flex flex-wrap items-center justify-center gap-4 mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
          }`}
          style={{ transitionDelay: '0.95s' }}
        >
          <Link to="/signup" className="btn-cta-main">
            Start Your Journey <ArrowRight size={18} />
          </Link>
          <button 
            onClick={scrollToFeatures}
            className="btn-cta-outline"
          >
            <Play size={16} className="fill-current" /> Watch Story
          </button>
        </div>

        {/* Stats */}
        <div 
          className={`flex flex-wrap items-center justify-center gap-8 sm:gap-12 pt-8 border-t border-white/10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
          }`}
          style={{ transitionDelay: '1.15s' }}
        >
          <div className="text-center">
            <span className="font-serif text-2xl sm:text-3xl font-bold block">200+</span>
            <span className="text-xs text-white/50 uppercase tracking-wider">Countries</span>
          </div>
          <div className="text-center">
            <span className="font-serif text-2xl sm:text-3xl font-bold block">50K+</span>
            <span className="text-xs text-white/50 uppercase tracking-wider">Travelers</span>
          </div>
          <div className="text-center">
            <span className="font-serif text-2xl sm:text-3xl font-bold block">4.9★</span>
            <span className="text-xs text-white/50 uppercase tracking-wider">Avg Rating</span>
          </div>
          <div className="text-center">
            <span className="font-serif text-2xl sm:text-3xl font-bold block">$299</span>
            <span className="text-xs text-white/50 uppercase tracking-wider">Trips from</span>
          </div>
        </div>
      </div>

      {/* Destination Strip */}
      <div 
        className={`absolute bottom-24 right-4 sm:right-8 z-20 flex flex-col gap-3 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
        }`}
        style={{ transitionDelay: '1.4s' }}
      >
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`flex items-center gap-3 bg-navy/70 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-2 transition-all duration-300 hover:bg-aqua/10 hover:border-aqua/30 hover:-translate-x-1 ${
              index === currentSlide ? 'border-aqua/40 bg-aqua/10' : ''
            }`}
          >
            <div 
              className="w-10 h-10 rounded-lg bg-cover bg-center flex-shrink-0"
              style={{ backgroundImage: `url(${slide.thumb})` }}
            />
            <div className="text-left">
              <div className="text-xs font-semibold">{slide.name.split(',')[0]}</div>
              <div className="text-[10px] text-aqua">{slide.price}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-400 ${
              index === currentSlide ? 'w-5 bg-aqua' : 'w-1.5 bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToFeatures}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce cursor-pointer"
      >
        <span className="text-[10px] tracking-widest uppercase text-white/40">Scroll</span>
        <div className="w-px h-9 bg-gradient-to-b from-aqua to-transparent" />
      </button>
    </section>
  )
}
