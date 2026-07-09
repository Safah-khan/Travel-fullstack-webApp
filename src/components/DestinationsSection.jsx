import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Plane } from 'lucide-react'

const destinations = [
  {
    id: 1,
    name: 'Bali, Indonesia',
    tag: 'Trending',
    sub: 'Temples & Sunsets',
    price: 'From $899',
    image: '/images/bali.png',
    size: 'large',
  },
  {
    id: 2,
    name: 'Paris, France',
    tag: 'Classic',
    sub: '',
    price: 'From $1,199',
    image: '/images/paris.png',
    size: 'small',
  },
  {
    id: 3,
    name: 'Maldives',
    tag: 'Luxury',
    sub: '',
    price: 'From $2,499',
    image: '/images/maldives.png',
    size: 'small',
  },
  {
    id: 4,
    name: 'Patagonia',
    tag: 'Adventure',
    sub: '',
    price: 'From $1,799',
    image: '/images/patagonia.png',
    size: 'small',
  },
  {
    id: 5,
    name: 'Kyoto, Japan',
    tag: 'Cultural',
    sub: '',
    price: 'From $1,399',
    image: '/images/Kyoto.png',
    size: 'small',
  },
]

export default function DestinationsSection() {
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
    <section id="destinations" ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-navy to-[#060f1e] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 reveal">
          <div>
            <div className="section-tag">
              <span className="w-8 h-px bg-aqua/50" />
              Top Picks
            </div>
            <h2 className="section-title">
              Handpicked <em>Destinations</em>
            </h2>
            <p className="section-sub">Your next chapter awaits.</p>
          </div>
          <Link to="/booking" className="btn-ghost flex items-center gap-2">
            View all 200+ <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 reveal">
          {/* Large Card - Bali */}
          <div className="md:row-span-2 relative group rounded-2xl overflow-hidden cursor-pointer min-h-[400px] md:min-h-full">
            <img
              src={destinations[0].image}
              alt={destinations[0].name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-3 py-1 bg-aqua/20 border border-aqua/40 rounded-full text-xs text-aqua font-semibold uppercase mb-3">
                {destinations[0].tag}
              </span>
              <h3 className="font-serif text-3xl font-bold mb-1">{destinations[0].name}</h3>
              <p className="text-sm text-white/60 mb-3">{destinations[0].sub}</p>
              <div className="flex items-center gap-2 text-amber font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <Plane size={14} /> {destinations[0].price}
              </div>
            </div>
          </div>

          {/* Other Cards */}
          {destinations.slice(1).map((dest) => (
            <div key={dest.id} className="relative group rounded-2xl overflow-hidden cursor-pointer min-h-[200px]">
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="inline-block px-3 py-1 bg-aqua/20 border border-aqua/40 rounded-full text-xs text-aqua font-semibold uppercase mb-2">
                  {dest.tag}
                </span>
                <h3 className="font-serif text-xl font-bold">{dest.name}</h3>
                <div className="flex items-center gap-2 text-amber font-semibold text-sm mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <Plane size={14} /> {dest.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
