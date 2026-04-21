import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { MapPin, Calendar, Users, Plane, Train, Car, ArrowRight, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

const travelTypes = [
  { id: 'flight', name: 'Flight', icon: Plane },
  { id: 'train', name: 'Train', icon: Train },
  { id: 'cab', name: 'Cab', icon: Car },
]

const destinations = [
  'Bali, Indonesia',
  'Paris, France',
  'Maldives',
  'Patagonia, Argentina',
  'Kyoto, Japan',
  'Swiss Alps, Switzerland',
  'Santorini, Greece',
  'Cape Town, South Africa',
  'New York City, USA',
  'Dubai, UAE',
]

export default function Booking() {
  const { userData } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    destination: '',
    travelType: 'flight',
    travelDate: '',
    passengerCount: 1,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.destination || !formData.travelDate) {
      toast.error('Please fill in all required fields')
      return
    }

    const selectedDate = new Date(formData.travelDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (selectedDate < today) {
      toast.error('Please select a future date')
      return
    }

    setLoading(true)

    try {
      const bookingData = {
        userId: auth.currentUser.uid,
        userName: userData?.fullName || auth.currentUser.displayName || 'Guest',
        userEmail: auth.currentUser.email,
        destination: formData.destination,
        travelType: formData.travelType,
        travelDate: formData.travelDate,
        passengerCount: parseInt(formData.passengerCount),
        createdAt: new Date().toISOString(),
        status: 'confirmed',
      }

      const docRef = await addDoc(collection(db, 'bookings'), bookingData)
      
      toast.success('Booking confirmed!')
      navigate('/booking-success', { state: { booking: { id: docRef.id, ...bookingData } } })
    } catch (error) {
      console.error('Booking error:', error)
      toast.error('Failed to create booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-aqua/10 border border-aqua/30 rounded-full px-4 py-2 text-xs font-semibold text-aqua mb-4">
              <Sparkles size={14} />
              Book Your Adventure
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              Plan Your Next Journey
            </h1>
            <p className="text-white/60">
              Fill in the details below and we'll prepare your perfect trip
            </p>
          </div>

          {/* Form Card */}
          <div className="glass-card border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Destination */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  <MapPin size={16} className="inline mr-2 text-aqua" />
                  Destination
                </label>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="" disabled className="bg-navy">Select a destination</option>
                  {destinations.map((dest) => (
                    <option key={dest} value={dest} className="bg-navy">{dest}</option>
                  ))}
                </select>
              </div>

              {/* Travel Type */}
              <div>
                <label className="block text-sm font-medium mb-3">Travel Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {travelTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, travelType: type.id }))}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
                        formData.travelType === type.id
                          ? 'bg-aqua/20 border-aqua text-aqua'
                          : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      <type.icon size={24} />
                      <span className="text-sm font-medium">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date and Passengers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    <Calendar size={16} className="inline mr-2 text-aqua" />
                    Travel Date
                  </label>
                  <input
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    <Users size={16} className="inline mr-2 text-aqua" />
                    Passengers
                  </label>
                  <select
                    name="passengerCount"
                    value={formData.passengerCount}
                    onChange={handleChange}
                    className="input-field"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num} className="bg-navy">
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-cta-main justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    Book Now <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Info Note */}
          <p className="text-center text-sm text-white/40 mt-6">
            By booking, you agree to our terms and conditions. Free cancellation up to 24 hours before travel.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
