import { useState, useEffect, useRef } from 'react'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    quote: "Wanderlust turned our anniversary trip into magic. Every detail was perfect, from the boutique hotels to the hidden restaurant recommendations.",
    name: 'Sarah & Alex',
    initials: 'SA',
    stars: 5,
  },
  {
    id: 2,
    quote: "As a solo female traveler, safety was my priority. Wanderlust connected me with verified guides and 24/7 support. Truly transformative experience.",
    name: 'Maria Pereira',
    initials: 'MP',
    stars: 5,
  },
  {
    id: 3,
    quote: "The best travel platform I have ever used. The personalized itineraries saved me hours of planning and introduced me to places I would have never found.",
    name: 'James Chen',
    initials: 'JC',
    stars: 5,
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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
    <section id="testimonials" ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-[#060f1e] to-navy px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="section-tag justify-center">
            <span className="w-8 h-px bg-aqua/50" />
            Real Stories
            <span className="w-8 h-px bg-aqua/50" />
          </div>
          <h2 className="section-title">
            Travelers Who <em>Believe</em> in Us
          </h2>
          <p className="section-sub mx-auto">
            Over 50,000 adventurers have made unforgettable memories with us.
          </p>
        </div>

        <div className="overflow-hidden reveal">
          <div 
            className="flex transition-transform duration-600 ease-out gap-6"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] glass-card"
              >
                <Quote size={32} className="text-aqua/40 mb-4" />
                <p className="text-white/80 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-aqua to-teal flex items-center justify-center font-bold text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-amber text-sm">
                      {'★'.repeat(testimonial.stars)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-6 bg-aqua' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
