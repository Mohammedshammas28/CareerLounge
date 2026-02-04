import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    if (!formData.email) {
      toast.error('Email is required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password-simple`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ message: 'Failed to reset password' }));
        throw new Error(data.message || 'Failed to reset password');
      }

      const data = await response.json().catch(() => ({ message: 'Password reset successfully!' }));

      toast.success('Password changed successfully!');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Failed to reset password');
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
                <Lock className="text-navy-950" size={24} />
              </div>
              <h1 className="text-3xl font-serif font-semibold text-ivory mb-2">Reset Password</h1>
              <p className="text-slate-400">Enter your email and new password</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm uppercase tracking-widest text-slate-300 font-semibold">
                    New Password
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
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>

            <div className="relative my-6">
              <div className="divider"></div>
            </div>

            <div className="text-center">
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold transition"
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

