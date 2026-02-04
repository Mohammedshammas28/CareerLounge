import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 border-t border-slate-700/50">
      {/* Newsletter Section */}
      <div className="border-b border-slate-700/50">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl">
            <h3 className="text-ivory text-2xl font-semibold mb-2">Stay Updated</h3>
            <p className="text-slate-400 mb-6">
              Subscribe to our newsletter for career insights, university updates, and immigration news
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1"
              />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-stylish text-2xl font-bold text-gold-400">
                Career Lounge
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premier education and career consulting. Guiding ambitious individuals toward meaningful global opportunities.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-ivory font-semibold mb-4 text-sm uppercase tracking-wide">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-slate-400 hover:text-gold-400 transition text-sm">
                  Career Counselling
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-gold-400 transition text-sm">
                  Education Consulting
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-gold-400 transition text-sm">
                  Recruitment Services
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-gold-400 transition text-sm">
                  Immigration Support
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-ivory font-semibold mb-4 text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-gold-400 transition text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-gold-400 transition text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-gold-400 transition text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-gold-400 transition text-sm">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-ivory font-semibold mb-4 text-sm uppercase tracking-wide">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gold-400 flex-shrink-0" />
                <a href="mailto:alman.travels2020@gmail.com" className="text-slate-400 text-sm hover:text-gold-400">
                  alman.travels2020@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gold-400 flex-shrink-0" />
                <a href="tel:+917396460717" className="text-slate-400 text-sm hover:text-gold-400">
                  +91 7396460717
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <p className="text-slate-400 text-sm">
                  Pillar No. 204<br />beside Ramdev Granites<br />Attapur, Hyderabad<br />Telangana 500048
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Career Lounge. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-slate-400 hover:text-gold-400 transition">
              LinkedIn
            </a>
            <a href="#" className="text-slate-400 hover:text-gold-400 transition">
              Twitter
            </a>
            <a href="#" className="text-slate-400 hover:text-gold-400 transition">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
