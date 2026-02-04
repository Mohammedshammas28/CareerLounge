import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Calendar, Clock, CheckCircle, ArrowRight } from 'lucide-react';

export const BookConsultation = () => {
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Career Counselling',
    date: '',
    timeSlot: '10:00 AM',
    notes: '',
  });

  const [loading, setLoading] = useState(false);

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
  const services = ['Career Counselling', 'Educational Consultancy', 'Recruitment Services', 'Immigration Services'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/bookings', formData);
      toast.success('Consultation booked successfully!');
      setStep(4);
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Career Counselling',
          date: '',
          timeSlot: '10:00 AM',
          notes: '',
        });
        setStep(1);
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book consultation');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />

      {/* Hero Section */}
      <section className="section section-dark py-12">
        <div className="container-max">
          <div className="accent-line mb-4"></div>
          <h1 className="section-title">Book Your Consultation</h1>
          <p className="section-subtitle">
            Schedule a personalized session with our expert consultants
          </p>
        </div>
      </section>

      {/* Main Booking Section */}
      <section className="section section-alt">
        <div className="container-max">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex-center font-semibold transition ${
                    step >= s
                      ? 'bg-gold-400 text-navy-950'
                      : 'bg-slate-700/50 text-slate-400'
                  }`}
                >
                  {step > s ? <CheckCircle size={20} /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-8 h-0.5 ${
                      step > s ? 'bg-gold-400' : 'bg-slate-700/50'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-serif font-semibold text-ivory mb-2">Choose Your Service</h2>
              <p className="text-slate-400 mb-8">
                Select the consultation service that best matches your needs
              </p>

              <div className="space-y-3 mb-8">
                {services.map((service) => (
                  <button
                    key={service}
                    onClick={() => setFormData(prev => ({ ...prev, service }))}
                    className={`w-full p-4 rounded-md border-2 transition text-left ${
                      formData.service === service
                        ? 'border-gold-400 bg-gold-400/10'
                        : 'border-slate-700 bg-slate-900/30 hover:border-slate-600'
                    }`}
                  >
                    <p className="text-ivory font-semibold">{service}</p>
                    <p className="text-slate-400 text-sm mt-1">
                      {service === 'Career Counselling' && '30-minute personalized career guidance session'}
                      {service === 'Educational Consultancy' && 'University selection and application guidance'}
                      {service === 'Recruitment Services' && 'Job placement and career advancement support'}
                      {service === 'Immigration Services' && 'Immigration process consultation and support'}
                    </p>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="btn btn-primary w-full"
              >
                Continue <ArrowRight size={18} className="inline ml-2" />
              </button>
            </div>
          )}

          {/* Step 2: Datetime Selection */}
          {step === 2 && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-serif font-semibold text-ivory mb-2">Select Date & Time</h2>
              <p className="text-slate-400 mb-8">
                Choose your preferred date and time for the consultation
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm uppercase tracking-widest text-slate-300 font-semibold mb-3">
                    <Calendar size={16} className="inline mr-2" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 text-ivory focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-widest text-slate-300 font-semibold mb-3">
                    <Clock size={16} className="inline mr-2" />
                    Time Slot
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setFormData(prev => ({ ...prev, timeSlot: slot }))}
                        className={`p-3 rounded-md border-2 transition font-medium text-sm ${
                          formData.timeSlot === slot
                            ? 'border-gold-400 bg-gold-400/10 text-gold-400'
                            : 'border-slate-700 bg-slate-900/30 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="btn btn-outline flex-1"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.date || !formData.timeSlot}
                  className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue <ArrowRight size={18} className="inline ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Personal Details */}
          {step === 3 && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-serif font-semibold text-ivory mb-2">Your Details</h2>
              <p className="text-slate-400 mb-8">
                Please provide your contact information and any additional notes
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm uppercase tracking-widest text-slate-300 font-semibold mb-2">
                      Name
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
                    required
                    placeholder="+1 (234) 567-890"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 text-ivory placeholder-slate-500 focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-widest text-slate-300 font-semibold mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about your consultation needs, goals, or any specific questions..."
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 text-ivory placeholder-slate-500 focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition resize-none"
                  ></textarea>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn btn-outline flex-1"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Booking...' : 'Complete Booking'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="max-w-2xl mx-auto text-center">
              <div className="card-premium mb-8">
                <div className="w-16 h-16 rounded-full bg-gold-400/20 flex-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-gold-400" />
                </div>
                <h2 className="text-4xl font-serif font-semibold text-ivory mb-3">
                  Booking Confirmed!
                </h2>
                <p className="text-slate-400 mb-6">
                  Your consultation has been successfully booked. A confirmation email has been sent to your registered email address.
                </p>

                <div className="bg-slate-900/50 rounded-md p-6 text-left mb-8 space-y-4">
                  <div>
                    <p className="text-slate-400 text-sm uppercase tracking-widest">Service</p>
                    <p className="text-ivory font-semibold">{formData.service}</p>
                  </div>
                  <div className="divider"></div>
                  <div>
                    <p className="text-slate-400 text-sm uppercase tracking-widest">Date & Time</p>
                    <p className="text-ivory font-semibold">{formData.date} at {formData.timeSlot}</p>
                  </div>
                  <div className="divider"></div>
                  <div>
                    <p className="text-slate-400 text-sm uppercase tracking-widest">Confirmation Email</p>
                    <p className="text-ivory font-semibold">{formData.email}</p>
                  </div>
                </div>

                <p className="text-slate-500 text-sm">
                  Redirecting you to your dashboard in a moment...
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};
