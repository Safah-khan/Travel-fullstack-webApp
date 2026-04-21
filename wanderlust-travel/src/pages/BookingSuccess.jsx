import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle, MapPin, Calendar, Users, Plane, Train, Car, ArrowLeft, Home, Ticket } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const travelTypeIcons = {
  flight: Plane,
  train: Train,
  cab: Car,
}

export default function BookingSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const booking = location.state?.booking

  useEffect(() => {
    if (!booking) {
      navigate('/booking')
    }
  }, [booking, navigate])

  if (!booking) return null

  const TravelIcon = travelTypeIcons[booking.travelType] || Plane

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-navy">
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Card */}
          <div className="glass-card border border-white/10 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-mint to-aqua flex items-center justify-center mx-auto mb-6 shadow-lg shadow-aqua/30">
              <CheckCircle size={40} className="text-navy" />
            </div>

            <h1 className="font-serif text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-white/60 mb-8">
              Thank you for choosing Wanderlust. Your adventure awaits!
            </p>

            {/* Booking Details Card */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left mb-8">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                <span className="text-sm text-white/60">Booking Reference</span>
                <span className="font-mono text-aqua font-semibold">#{booking.id.slice(-8).toUpperCase()}</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-aqua/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-aqua" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Destination</p>
                    <p className="font-semibold">{booking.destination}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-aqua/10 flex items-center justify-center flex-shrink-0">
                    <TravelIcon size={20} className="text-aqua" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Travel Type</p>
                    <p className="font-semibold capitalize">{booking.travelType}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-aqua/10 flex items-center justify-center flex-shrink-0">
                    <Calendar size={20} className="text-aqua" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Travel Date</p>
                    <p className="font-semibold">{formatDate(booking.travelDate)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-aqua/10 flex items-center justify-center flex-shrink-0">
                    <Users size={20} className="text-aqua" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Passengers</p>
                    <p className="font-semibold">{booking.passengerCount} {booking.passengerCount === 1 ? 'Person' : 'People'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Notice */}
            <div className="flex items-center gap-3 bg-amber/10 border border-amber/20 rounded-xl p-4 mb-8">
              <Ticket size={20} className="text-amber flex-shrink-0" />
              <p className="text-sm text-left">
                A confirmation email has been sent to <strong className="text-white">{booking.userEmail}</strong> with all your booking details.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/" className="flex-1 btn-cta-outline justify-center">
                <Home size={18} className="mr-2" /> Return Home
              </Link>
              <Link to="/booking" className="flex-1 btn-cta-main justify-center">
                <ArrowLeft size={18} className="mr-2" /> Book Another
              </Link>
            </div>
          </div>

          {/* Support Info */}
          <p className="text-center text-sm text-white/40 mt-6">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@wanderlust.com" className="text-aqua hover:underline">
              support@wanderlust.com
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
