import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { name: 'Servicios', href: '#servicios' },
  { name: 'Proceso', href: '#proceso' },
  { name: 'Casos de éxito', href: '#portfolio' },
  { name: 'Testimonios', href: '#testimonios' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/80 backdrop-blur-lg shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="relative z-50">
            <Logo />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contacto"
              className="px-5 py-2.5 border border-white/30 rounded-lg text-sm font-semibold text-white hover:bg-white hover:text-slate-900 transition-all duration-300"
            >
              Contactar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-6 space-y-4 bg-slate-900/95 backdrop-blur-lg -mx-4 px-4 mt-4 rounded-xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block mt-4 px-6 py-3 border border-white/30 rounded-lg font-semibold text-white hover:bg-white hover:text-slate-900 transition-all"
            >
              Contactar
            </a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
