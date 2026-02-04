import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Briefcase, BookOpen, Users, Globe } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: Briefcase,
      title: 'Career Counselling',
      description: 'Personalized guidance to help you discover your strengths and define your career path',
      features: [
        'Personalized one-on-one sessions',
        'Psychometric testing & skill assessment',
        'Career mapping & goal setting',
        'Guidance for stream selection and course choice',
      ],
    },
    {
      icon: BookOpen,
      title: 'Educational Consultancy',
      description: 'Expert guidance for studying in India or abroad',
      features: [
        'University & course selection',
        'Application support & documentation',
        'Visa assistance & interview prep',
        'Scholarship guidance & financial planning',
      ],
    },
    {
      icon: Users,
      title: 'Recruitment Services',
      description: 'Connecting the right talent with the right opportunity',
      features: [
        'Candidate sourcing for companies',
        'Job matching for professionals',
        'Resume building & interview training',
        'Industry-specific placements',
      ],
    },
    {
      icon: Globe,
      title: 'Immigration Services',
      description: 'Your trusted partner in building a life abroad',
      features: [
        'Permanent residency & work visas',
        'Application assistance for popular destinations',
        'Documentation & legal compliance',
        'Post-landing support',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />

      {/* Hero Section */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/10 rounded-full filter blur-3xl opacity-20"></div>
        </div>
        <div className="container-max text-center">
          <div className="flex justify-center mb-4">
            <div className="accent-line"></div>
          </div>
          <h1 className="section-title">Our Services</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Comprehensive solutions designed to support your career and educational aspirations at every stage of your journey
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section section-alt">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="card-elevated group">
                  <div className="w-12 h-12 rounded-md bg-gold-400/10 flex-center text-gold-400 mb-6 group-hover:bg-gold-400/20 transition">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-semibold text-ivory mb-3">{service.title}</h3>
                  <p className="text-slate-400 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-gold-400 font-bold mt-1 flex-shrink-0">•</span>
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark text-center">
        <div className="container-max max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <div className="accent-line"></div>
          </div>
          <h2 className="section-title">Ready to Take the Next Step?</h2>
          <p className="section-subtitle">
            Schedule a consultation with our expert team today and discover how we can help you achieve your goals
          </p>
          <a href="/book-consultation" className="btn btn-primary btn-lg inline-flex">
            Book Your Consultation
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};
