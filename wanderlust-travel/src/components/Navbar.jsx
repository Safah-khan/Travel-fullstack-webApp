import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Sparkles, LogOut, User } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, userData, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate('/')
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  const navLinks = [
    { name: 'Home', href: '/#hero' },
    { name: 'Features', href: '/#features' },
    { name: 'Destinations', href: '/#destinations' },
    { name: 'About Us', href: '/#about' },
    { name: 'Reviews', href: '/#testimonials' },
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-12 py-5 transition-all duration-500 ${
        scrolled ? 'bg-navy/90 backdrop-blur-xl border-b border-white/10 py-4' : ''
      }`}
    >
      <Link to="/" className="flex items-center gap-2 font-serif text-2xl font-bold text-white">
        Wander<span className="text-aqua">lust</span>
      </Link>

      <ul className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <li key={link.name}>
            <a 
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-aqua transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="hidden sm:flex items-center gap-2 text-sm text-white/70">
              <User size={16} />
              {userData?.fullName || 'Traveler'}
            </span>
            <Link to="/booking" className="btn-primary">
              <Sparkles size={14} className="mr-1" />
              Book Now
            </Link>
            <button 
              onClick={handleLogout}
              className="p-2 text-white/70 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-ghost">
              Sign In
            </Link>
            <Link to="/signup" className="btn-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
