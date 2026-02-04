import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Check } from 'lucide-react';

export const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Calculate password strength
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength += 1;
      if (value.length >= 12) strength += 1;
      if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength += 1;
      if (/\d/.test(value)) strength += 1;
      if (/[!@#$%^&*]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signup(formData.name, formData.email, formData.password, formData.phone);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />

      <section className="py-20 px-4 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="card-premium">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-500 rounded-md flex-center mx-auto mb-4">
                <span className="text-navy-950 font-bold font-serif text-xl">CL</span>
              </div>
              <h1 className="text-3xl font-serif font-semibold text-ivory mb-2">Create Account</h1>
              <p className="text-slate-400">Join Career Lounge and transform your future</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm uppercase tracking-widest text-slate-300 font-semibold mb-2">
                  Full Name
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
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 text-ivory placeholder-slate-500 focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-slate-300 font-semibold mb-2">
                  Phone Number
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

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm uppercase tracking-widest text-slate-300 font-semibold">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-gold-400 transition"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 text-ivory placeholder-slate-500 focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition"
                />

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3">
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map(level => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition ${
                            level <= passwordStrength
                              ? level <= 2
                                ? 'bg-red-500'
                                : level === 3
                                ? 'bg-yellow-500'
                                : 'bg-gold-400'
                              : 'bg-slate-700'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400">
                      {passwordStrength <= 2 && 'Weak password'}
                      {passwordStrength === 3 && 'Fair password'}
                      {passwordStrength === 4 && 'Good password'}
                      {passwordStrength === 5 && 'Strong password'}
                    </p>
                  </div>
                )}

                {/* Password Requirements */}
                <div className="mt-3 space-y-2">
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Requirements:</p>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className={formData.password.length >= 8 ? 'text-gold-400' : ''}>
                      {formData.password.length >= 8 && <Check size={14} className="inline" />}
                    </span>
                    <span>At least 8 characters</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className={/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) ? 'text-gold-400' : ''}>
                      {/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) && <Check size={14} className="inline" />}
                    </span>
                    <span>Mix of uppercase and lowercase</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className={/\d/.test(formData.password) ? 'text-gold-400' : ''}>
                      {/\d/.test(formData.password) && <Check size={14} className="inline" />}
                    </span>
                    <span>At least one number</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || passwordStrength < 3}
                className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="relative my-6">
              <div className="divider"></div>
            </div>

            <div className="text-center">
              <p className="text-slate-400 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-gold-400 hover:text-gold-300 font-semibold transition">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gold-400 font-bold">500+</p>
              <p className="text-slate-400 text-xs">Active Members</p>
            </div>
            <div>
              <p className="text-gold-400 font-bold">10+</p>
              <p className="text-slate-400 text-xs">Years in Service</p>
            </div>
            <div>
              <p className="text-gold-400 font-bold">95%</p>
              <p className="text-slate-400 text-xs">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
