import { useEffect, useRef } from 'react'
import { ArrowRight, Leaf, Heart, Globe, Compass } from 'lucide-react'

const pillars = [
  {
    icon: Leaf,
    title: 'Sustainable Travel',
    description: 'Carbon offset trips supporting eco-friendly initiatives.',
  },
  {
    icon: Heart,
    title: 'Community First',
    description: '10% of profits go directly to local communities.',
  },
]

export default function AboutSection() {
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
    <section id="about" ref={sectionRef} className="py-16 md:py-24 bg-[#0d1e35] px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual */}
          <div className="relative reveal">
            <div className="rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src="/images/airplane.png"
                alt="Airplane taking off"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-2/5 rounded-2xl overflow-hidden border-4 border-[#0d1e35] aspect-square">
              <img
                src="/images/team-working-around-a-conference-table.png"
                alt="Our team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="reveal">
            <div className="section-tag">
              <span className="w-8 h-px bg-aqua/50" />
              Our Story
            </div>
            <h2 className="section-title">
              Born from a Love of <em>Wandering</em>
            </h2>
            <p className="section-sub mb-8">
              Founded in 2018, Wanderlust began with a simple mission: make extraordinary travel accessible to everyone. We believe that travel transforms lives and connects hearts across cultures.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <pillar.icon size={24} className="text-aqua mb-2" />
                  <h4 className="font-semibold text-sm mb-1">{pillar.title}</h4>
                  <p className="text-xs text-white/50">{pillar.description}</p>
                </div>
              ))}
            </div>

            <button className="btn-cta-outline inline-flex">
              Meet the Team <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
