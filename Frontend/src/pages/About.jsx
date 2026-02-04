import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Check } from 'lucide-react';

export const About = () => {
  const values = [
    { title: 'Excellence', desc: 'Highest quality guidance and support' },
    { title: 'Integrity', desc: 'Transparent and honest practices' },
    { title: 'Empowerment', desc: 'Student-centric approach' },
    { title: 'Innovation', desc: 'Cutting-edge consulting methods' },
  ];

  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />

      {/* Hero Section */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/10 rounded-full filter blur-3xl opacity-20"></div>
        </div>
        <div className="container-max max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="accent-line-sm"></div>
            <span className="text-gold-400 text-sm uppercase tracking-widest font-semibold">About Us</span>
          </div>
          <h1 className="section-title">Empowering Futures,<br />Globally</h1>
          <p className="section-subtitle">
            Career Lounge is a premier education and career consulting firm, dedicated to helping ambitious individuals navigate their paths to success in education, careers, and life abroad.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section section-alt">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-6">Our Mission</h2>
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                We don't just offer services—we create success stories. By combining decades of expertise with personalized attention, we help you unlock your potential and achieve your ambitions.
              </p>
              <div className="space-y-4">
                {['Expert guidance from certified counsellors', 'Personalized, end-to-end support', 'Global network of partners', 'Client-first approach'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="text-gold-400 flex-shrink-0" size={20} />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-premium">
              <div className="text-center">
                <div className="stat-number mb-3">10+</div>
                <div className="stat-label mb-4">Years of Excellence</div>
                <p className="text-slate-400">
                  Trusted by thousands of students and professionals worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section section-dark">
        <div className="container-max">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="accent-line"></div>
            </div>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              The principles that guide every decision and interaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="card-elevated text-center">
                <h3 className="text-xl font-semibold text-ivory mb-3">{value.title}</h3>
                <p className="text-slate-400 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section section-alt">
        <div className="container-max max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose Career Lounge?</h2>
          </div>
          <div className="space-y-6">
            {[
              { title: 'Expertise', desc: 'Certified, experienced counsellors with proven track records' },
              { title: 'Personalization', desc: 'Tailored solutions that address your unique needs and aspirations' },
              { title: 'Global Network', desc: 'Strong partnerships with universities, employers, and institutions worldwide' },
              { title: 'Transparency', desc: 'Clear communication, no hidden fees, honest guidance always' },
            ].map((item, i) => (
              <div key={i} className="card-elevated">
                <h3 className="text-lg font-semibold text-ivory mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
