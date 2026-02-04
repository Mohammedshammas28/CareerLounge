import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-navy-950/95 backdrop-blur-md border-b border-slate-700/50">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="font-stylish text-2xl font-bold text-gold-400">
              Career Lounge
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-slate-300 hover:text-gold-400 transition text-sm font-medium">
              Home
            </Link>
            <Link to="/about" className="text-slate-300 hover:text-gold-400 transition text-sm font-medium">
              About
            </Link>
            <Link to="/services" className="text-slate-300 hover:text-gold-400 transition text-sm font-medium">
              Services
            </Link>
            <Link to="/contact" className="text-slate-300 hover:text-gold-400 transition text-sm font-medium">
              Contact
            </Link>
          </div>

          {/* Right Menu */}
          <div className="flex items-center gap-4">
            {/* Auth Links */}
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <Link to="/admin" className="btn btn-primary btn-sm hidden sm:flex">
                    Admin Panel
                  </Link>
                ) : (
                  <Link to="/dashboard" className="btn btn-primary btn-sm hidden sm:flex">
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="btn btn-outline btn-sm hidden sm:flex"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost hidden sm:flex text-xs">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm">
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-gold-400"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-slate-700/50 pt-4">
            <Link to="/" className="block px-4 py-2 text-slate-300 hover:text-gold-400 font-medium text-sm">
              Home
            </Link>
            <Link to="/about" className="block px-4 py-2 text-slate-300 hover:text-gold-400 font-medium text-sm">
              About
            </Link>
            <Link to="/services" className="block px-4 py-2 text-slate-300 hover:text-gold-400 font-medium text-sm">
              Services
            </Link>
            <Link to="/contact" className="block px-4 py-2 text-slate-300 hover:text-gold-400 font-medium text-sm">
              Contact
            </Link>
            {!isAuthenticated && (
              <Link to="/login" className="block px-4 py-2 text-slate-300 hover:text-gold-400 font-medium text-sm">
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
