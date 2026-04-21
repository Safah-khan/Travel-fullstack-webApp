import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function CTASection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-r from-ocean via-teal to-[#0d6e7a] px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center reveal">
        <div className="section-tag justify-center">
          <span className="w-8 h-px bg-white/50" />
          Ready to Go?
          <span className="w-8 h-px bg-white/50" />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Your Next Adventure is One Click Away
        </h2>
        <p className="text-white/80 max-w-lg mx-auto mb-8">
          Join thousands of travelers who have discovered their perfect journey with Wanderlust.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link 
            to="/signup" 
            className="px-8 py-4 bg-white text-ocean font-bold rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex items-center gap-2"
          >
            <Sparkles size={18} />
            Create Free Account
          </Link>
          <Link 
            to="/#destinations" 
            className="px-8 py-4 bg-white/10 border border-white/30 text-white rounded-full transition-all duration-300 hover:bg-white/20 flex items-center gap-2"
          >
            Browse Destinations <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
