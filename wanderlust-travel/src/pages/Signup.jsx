import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase'
import { User, Mail, Phone, Lock, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      const user = userCredential.user

      await updateProfile(user, {
        displayName: formData.fullName,
      })

      try {
        await setDoc(doc(db, 'users', user.uid), {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          createdAt: new Date().toISOString(),
        })
      } catch (dbError) {
        console.error('Firestore error:', dbError)
        toast.error('Account created but profile save failed')
      }

      toast.success('Account created successfully!')
      // Wait for auth state to propagate then navigate
      setTimeout(() => {
        navigate('/booking', { replace: true })
      }, 1500)
    } catch (error) {
      console.error('Signup error:', error.code, error.message)
      let message = error.message || 'Failed to create account'
      if (error.code === 'auth/email-already-in-use') message = 'Email already registered'
      if (error.code === 'auth/invalid-email') message = 'Invalid email address'
      if (error.code === 'auth/weak-password') message = 'Password is too weak'
      if (error.code === 'auth/api-key-not-valid') message = 'Firebase API key invalid'
      if (error.code === 'auth/invalid-api-key') message = 'Invalid Firebase API key'
      if (error.code === 'auth/network-request-failed') message = 'Network error'
      if (error.code === 'auth/configuration-not-found') message = 'Firebase Auth not enabled in console'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4 py-20">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-aqua/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 font-serif text-2xl font-bold text-white mb-8">
          Wander<span className="text-aqua">lust</span>
        </Link>

        {/* Card */}
        <div className="glass-card border border-white/10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-aqua/10 border border-aqua/30 rounded-full px-4 py-2 text-xs font-semibold text-aqua mb-4">
              <Sparkles size={14} />
              Start Your Journey
            </div>
            <h1 className="font-serif text-2xl font-bold">Create Account</h1>
            <p className="text-sm text-white/60 mt-2">Join thousands of adventurers</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="input-field pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5" required />
              <span className="text-white/60">
                I agree to the{' '}
                <a href="#" className="text-aqua hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-aqua hover:underline">Privacy Policy</a>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-cta-main justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-white/60">
              Already have an account?{' '}
              <Link to="/login" className="text-aqua font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-white/40 hover:text-white/70 transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
