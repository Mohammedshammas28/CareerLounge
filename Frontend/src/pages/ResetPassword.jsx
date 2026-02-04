import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Lock } from 'lucide-react';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const token = searchParams.get('token');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        toast.error('Invalid reset link');
        setVerifying(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-reset-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({ message: 'Invalid reset token' }));
          toast.error(data.message || 'Invalid or expired reset link');
          setVerifying(false);
          return;
        }

        const data = await response.json().catch(() => ({ valid: true }));

        if (data.valid) {
          setTokenValid(true);
        } else {
          toast.error('Invalid or expired reset link');
        }
      } catch (error) {
        toast.error('Failed to verify reset link');
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

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

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ message: 'Failed to reset password' }));
        throw new Error(data.message || 'Failed to reset password');
      }

      const data = await response.json().catch(() => ({ message: 'Password reset successfully!' }));

      toast.success('Password reset successfully!');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-navy-950">
        <Navbar />
        <section className="py-20 px-4 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold-400"></div>
            <p className="text-ivory mt-4">Verifying reset link...</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-navy-950">
        <Navbar />
        <section className="py-20 px-4 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="w-full max-w-md">
            <div className="card-premium text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-md flex-center mx-auto mb-4">
                <Lock className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-serif font-semibold text-ivory mb-2">Invalid Link</h1>
              <p className="text-slate-400 mb-6">
                This password reset link is invalid or has expired. Please request a new one.
              </p>
              <Link to="/forgot-password" className="btn btn-primary w-full">
                Request New Link
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

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
              <h1 className="text-3xl font-serif font-semibold text-ivory mb-2">Create New Password</h1>
              <p className="text-slate-400">Enter a strong password to secure your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                                : 'bg-green-500'
                              : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-slate-400">
                      {passwordStrength <= 2 ? 'Weak' : passwordStrength === 3 ? 'Fair' : 'Strong'} password
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-slate-300 font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 text-ivory placeholder-slate-500 focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition"
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-400 mt-2">Passwords do not match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || formData.password !== formData.confirmPassword}
                className="btn btn-primary w-full"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>

            <div className="relative my-6">
              <div className="divider"></div>
            </div>

            <div className="text-center">
              <Link to="/login" className="text-gold-400 hover:text-gold-300 font-semibold transition text-sm">
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
