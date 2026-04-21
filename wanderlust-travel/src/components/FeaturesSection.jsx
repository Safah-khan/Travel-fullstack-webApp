import { useEffect, useRef } from 'react'
import { Map, Award, BookOpen, DollarSign, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: Map,
    title: 'Smart Booking',
    description: 'One-click booking with real-time availability and instant confirmation.',
  },
  {
    icon: Award,
    title: 'Best Destinations',
    description: 'Curated bucket-list destinations picked by travel experts.',
  },
  {
    icon: BookOpen,
    title: 'Expert Travel Guides',
    description: 'Rich, immersive guides created by local experts and insiders.',
  },
  {
    icon: DollarSign,
    title: 'Affordable Pricing',
    description: 'Price-match guarantee with no hidden fees or surprises.',
  },
]

export default function FeaturesSection() {
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
    <section id="features" ref={sectionRef} className="py-16 md:py-24 bg-[#0d1e35] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="section-tag justify-center">
            <span className="w-8 h-px bg-aqua/50" />
            Why Wanderlust
            <span className="w-8 h-px bg-aqua/50" />
          </div>
          <h2 className="section-title">
            Travel Made Effortlessly <em>Beautiful</em>
          </h2>
          <p className="section-sub mx-auto">
            We handle every detail so you can focus on what matters — soaking in every breathtaking moment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card hover:-translate-y-2 hover:border-aqua/40 group reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-aqua to-teal flex items-center justify-center mb-5 shadow-lg shadow-aqua/20">
                <feature.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-4">{feature.description}</p>
              <span className="inline-flex items-center gap-1 text-xs text-aqua font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-x-0 group-hover:translate-x-1">
                Learn more <ArrowRight size={12} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
