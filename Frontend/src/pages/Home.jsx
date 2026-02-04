import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Briefcase, Globe, Users, TrendingUp } from 'lucide-react';

export const Home = () => {
  const stats = [
    { number: '500+', label: 'Students Guided' },
    { number: '50+', label: 'University Partners' },
    { number: '10+', label: 'Years Experience' },
    { number: '95%', label: 'Success Rate' },
  ];

  const services = [
    { icon: Briefcase, title: 'Career Counselling', desc: 'Personalized guidance for your career path' },
    { icon: BookOpen, title: 'Educational Consulting', desc: 'Expert guidance for global opportunities' },
    { icon: Users, title: 'Recruitment Services', desc: 'Connect talent with opportunity' },
    { icon: Globe, title: 'Immigration Support', desc: 'Your partner in international relocation' },
  ];

  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/10 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-700/20 rounded-full filter blur-3xl opacity-30"></div>
        </div>

        <div className="container-max">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-2">
              <div className="accent-line-sm"></div>
              <span className="text-gold-400 text-sm uppercase tracking-widest font-semibold">Welcome to Career Lounge</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-ivory mb-6 leading-tight">
              Shape Your Future,<br />Achieve Your Goals
            </h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-2xl">
              Premier career and education consulting. Guiding ambitious individuals toward meaningful, global opportunities in education, careers, and immigration.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/book-consultation" className="btn btn-primary">
                Book Consultation <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="btn btn-outline">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section section-alt">
        <div className="container-max">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="stat-number mb-2">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section section-dark">
        <div className="container-max">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="accent-line"></div>
            </div>
            <h2 className="section-title">Our Core Services</h2>
            <p className="section-subtitle">Comprehensive solutions for every stage of your career journey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <div key={idx} className="card-elevated group">
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-md bg-gold-400/10 flex-center text-gold-400 group-hover:bg-gold-400/20 transition">
                      <Icon size={24} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-ivory mb-3">{svc.title}</h3>
                  <p className="text-slate-400 text-sm">{svc.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container-max text-center max-w-3xl mx-auto">
          <h2 className="section-title">Ready to Start Your Journey?</h2>
          <p className="section-subtitle">Connect with our expert consultants and unlock your potential</p>
          <Link to="/book-consultation" className="btn btn-primary btn-lg inline-flex">
            Schedule Your Free Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
