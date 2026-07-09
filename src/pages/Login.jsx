import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Welcome back!')
      navigate('/booking')
    } catch (error) {
      let message = 'Failed to login'
      if (error.code === 'auth/user-not-found') message = 'No account found with this email'
      if (error.code === 'auth/wrong-password') message = 'Incorrect password'
      if (error.code === 'auth/invalid-email') message = 'Invalid email address'
      if (error.code === 'auth/invalid-credential') message = 'Invalid email or password'
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
              Welcome Back
            </div>
            <h1 className="font-serif text-2xl font-bold">Sign In</h1>
            <p className="text-sm text-white/60 mt-2">Continue your journey with us</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5" />
                <span className="text-white/60">Remember me</span>
              </label>
              <a href="#" className="text-aqua hover:underline">Forgot password?</a>
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
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-white/60">
              Don't have an account?{' '}
              <Link to="/signup" className="text-aqua font-medium hover:underline">
                Sign up
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
