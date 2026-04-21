import { Link } from 'react-router-dom'
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy border-t border-white/10 py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 font-serif text-xl font-bold text-white mb-4">
              Wander<span className="text-aqua">lust</span>
            </Link>
            <p className="text-sm text-white/60 mb-4">
              Crafting extraordinary journeys since 2018. Your gateway to adventures that transform you forever.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-aqua hover:bg-white/10 transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-aqua hover:bg-white/10 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-aqua hover:bg-white/10 transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2">
              <li><a href="/#destinations" className="text-sm text-white/60 hover:text-aqua transition-colors">Asia</a></li>
              <li><a href="/#destinations" className="text-sm text-white/60 hover:text-aqua transition-colors">Europe</a></li>
              <li><a href="/#destinations" className="text-sm text-white/60 hover:text-aqua transition-colors">Americas</a></li>
              <li><a href="/#destinations" className="text-sm text-white/60 hover:text-aqua transition-colors">Africa</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="/#about" className="text-sm text-white/60 hover:text-aqua transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-white/60 hover:text-aqua transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-white/60 hover:text-aqua transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-white/60 hover:text-aqua transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Mail size={14} className="text-aqua" />
                hello@wanderlust.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            &copy; {currentYear} Wanderlust Travel Co. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
