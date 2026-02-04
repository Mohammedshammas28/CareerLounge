import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Career Counselling',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/leads', formData);
      toast.success('Thank you! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', service: 'Career Counselling', message: '' });
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />

      {/* Hero Section */}
      <section className="section section-dark py-12">
        <div className="container-max">
          <div className="accent-line mb-4"></div>
          <h1 className="section-title">Get In Touch</h1>
          <p className="section-subtitle">
            Ready to transform your career? Connect with our expert consultants today.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section section-alt">
        <div className="container-max">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            <div className="card-elevated group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-md bg-gold-400/10 flex-center text-gold-400 group-hover:bg-gold-400/20 transition">
                  <Mail size={20} />
                </div>
              </div>
              <h3 className="text-ivory font-semibold mb-2">Email</h3>
              <p className="text-slate-400 text-sm mb-3">
                alman.travels2020@gmail.com
              </p>
              <p className="text-slate-500 text-xs">
                Response within 24 hours
              </p>
            </div>

            <div className="card-elevated group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-md bg-gold-400/10 flex-center text-gold-400 group-hover:bg-gold-400/20 transition">
                  <Phone size={20} />
                </div>
              </div>
              <h3 className="text-ivory font-semibold mb-2">Phone</h3>
              <p className="text-slate-400 text-sm mb-3">
                +91 7396460717
              </p>
              <p className="text-slate-500 text-xs">
                Mon - Fri, 9 AM - 6 PM
              </p>
            </div>

            <div className="card-elevated group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-md bg-gold-400/10 flex-center text-gold-400 group-hover:bg-gold-400/20 transition">
                  <MapPin size={20} />
                </div>
              </div>
              <h3 className="text-ivory font-semibold mb-2">Location</h3>
              <p className="text-slate-400 text-sm mb-3">
                Pillar No. 204, beside Ramdev Granites<br />Attapur, Hyderabad, Telangana 500048
              </p>
              <p className="text-slate-500 text-xs">
                Office hours available
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-semibold text-ivory mb-2 font-serif">Send us a Message</h2>
              <p className="text-slate-400 mb-8">
                Fill out the form below and we'll get back to you as soon as possible with tailored solutions for your needs.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm uppercase tracking-widest text-slate-300 font-semibold mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 text-ivory placeholder-slate-500 focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm uppercase tracking-widest text-slate-300 font-semibold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 text-ivory placeholder-slate-500 focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm uppercase tracking-widest text-slate-300 font-semibold mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (234) 567-890"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 text-ivory placeholder-slate-500 focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-widest text-slate-300 font-semibold mb-2">
                    Service of Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 text-ivory focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition"
                  >
                    <option className="bg-slate-900 text-ivory">Career Counselling</option>
                    <option className="bg-slate-900 text-ivory">Educational Consultancy</option>
                    <option className="bg-slate-900 text-ivory">Recruitment Services</option>
                    <option className="bg-slate-900 text-ivory">Immigration Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-widest text-slate-300 font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell us about your career goals and how we can help..."
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 text-ivory placeholder-slate-500 focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Info Section */}
            <div className="space-y-8">
              <div className="card-premium">
                <h3 className="text-ivory font-serif text-2xl font-semibold mb-4">Business Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Monday - Friday</span>
                    <span className="text-gold-400">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Saturday</span>
                    <span className="text-gold-400">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sunday</span>
                    <span className="text-slate-500">Closed</span>
                  </div>
                </div>
              </div>

              <div className="card-elevated">
                <h3 className="text-ivory font-serif text-2xl font-semibold mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-gold-400 mt-1">✓</span>
                    <span className="text-slate-300">10+ years of industry expertise</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-400 mt-1">✓</span>
                    <span className="text-slate-300">500+ successful placements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-400 mt-1">✓</span>
                    <span className="text-slate-300">Personalized consulting approach</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-400 mt-1">✓</span>
                    <span className="text-slate-300">Global university network</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark py-16">
        <div className="container-max text-center">
          <h2 className="text-4xl font-serif font-bold text-ivory mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Schedule a free 30-minute consultation with one of our senior consultants to explore your options.
          </p>
          <a href="/book-consultation" className="btn btn-primary">
            Schedule Consultation
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};
