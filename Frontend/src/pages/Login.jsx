import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

export const Login = () => {
  const { login } = useAuth();
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

    try {
      const response = await login(formData.email, formData.password);
      toast.success('Login successful!');
      
      // Check if user is admin
      if (response.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.message || 'Invalid credentials');
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
              <h1 className="text-3xl font-serif font-semibold text-ivory mb-2">Welcome Back</h1>
              <p className="text-slate-400">Sign in to your Career Lounge account</p>
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
                <Link to="/forgot-password" className="text-xs text-gold-400 hover:text-gold-300 transition float-right mb-2 block text-right">
                  Forgot password?
                </Link>
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
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="relative my-6">
              <div className="divider"></div>
            </div>

            <div className="text-center">
              <p className="text-slate-400 text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="text-gold-400 hover:text-gold-300 font-semibold transition">
                  Create one
                </Link>
              </p>
            </div>

            <button
              type="button"
              className="btn btn-ghost w-full mt-4"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
