import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Calendar, Clock, FileText, LogOut, Settings, Plus } from 'lucide-react';

export const Dashboard = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings/user/my-bookings');
      setBookings(response.data.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;

  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-charcoal-900 border-r border-slate-700/50 min-h-[calc(100vh-80px)] p-6">
          <div className="mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-500 rounded-md flex-center mb-4">
              <span className="text-navy-950 font-bold font-serif">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <p className="text-ivory font-semibold">{user?.name}</p>
            <p className="text-slate-400 text-sm">{user?.email}</p>
          </div>

          <nav className="space-y-2 mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-2 rounded-md transition ${
                activeTab === 'overview'
                  ? 'bg-gold-400/10 text-gold-400'
                  : 'text-slate-300 hover:text-gold-400'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full text-left px-4 py-2 rounded-md transition ${
                activeTab === 'bookings'
                  ? 'bg-gold-400/10 text-gold-400'
                  : 'text-slate-300 hover:text-gold-400'
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-2 rounded-md transition ${
                activeTab === 'profile'
                  ? 'bg-gold-400/10 text-gold-400'
                  : 'text-slate-300 hover:text-gold-400'
              }`}
            >
              Profile Settings
            </button>
          </nav>

          <div className="border-t border-slate-700/50 pt-6 space-y-3">
            <a
              href="/book-consultation"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              New Booking
            </a>
            <button
              onClick={handleLogout}
              className="btn btn-outline w-full flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="mb-8">
                <h1 className="text-4xl font-serif font-bold text-ivory mb-2">
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-slate-400">
                  Here's an overview of your consultations and profile
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="card-elevated">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-slate-400 text-sm uppercase tracking-widest">Total Bookings</p>
                      <p className="text-4xl font-bold text-ivory mt-2">{bookings.length}</p>
                    </div>
                    <div className="w-12 h-12 rounded-md bg-gold-400/10 flex-center text-gold-400">
                      <Calendar size={24} />
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs">Across all services</p>
                </div>

                <div className="card-elevated">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-slate-400 text-sm uppercase tracking-widest">Confirmed</p>
                      <p className="text-4xl font-bold text-gold-400 mt-2">{confirmedCount}</p>
                    </div>
                    <div className="w-12 h-12 rounded-md bg-gold-400/10 flex-center text-gold-400">
                      <Clock size={24} />
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs">Ready to go</p>
                </div>

                <div className="card-elevated">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-slate-400 text-sm uppercase tracking-widest">Pending</p>
                      <p className="text-4xl font-bold text-slate-300 mt-2">{pendingCount}</p>
                    </div>
                    <div className="w-12 h-12 rounded-md bg-slate-700/50 flex-center text-slate-400">
                      <FileText size={24} />
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs">Awaiting confirmation</p>
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="card-premium">
                <h2 className="text-2xl font-serif font-semibold text-ivory mb-6">Recent Bookings</h2>
                {loading ? (
                  <p className="text-slate-400">Loading bookings...</p>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-400 mb-4">No bookings yet</p>
                    <a href="/book-consultation" className="btn btn-primary inline-block">
                      Book Your First Consultation
                    </a>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookings.slice(0, 3).map(booking => (
                      <div
                        key={booking._id}
                        className="flex justify-between items-start p-4 bg-slate-900/50 rounded-md border border-slate-700/50"
                      >
                        <div>
                          <p className="text-ivory font-semibold">{booking.service}</p>
                          <p className="text-slate-400 text-sm mt-1">
                            {new Date(booking.date).toLocaleDateString()} at {booking.timeSlot}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-md text-xs font-semibold ${
                            booking.status === 'confirmed'
                              ? 'bg-gold-400/10 text-gold-400'
                              : booking.status === 'pending'
                              ? 'bg-slate-700/50 text-slate-300'
                              : 'bg-slate-700/50 text-slate-300'
                          }`}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div>
              <div className="mb-8 flex justify-between items-center">
                <div>
                  <h1 className="text-4xl font-serif font-bold text-ivory">My Bookings</h1>
                  <p className="text-slate-400 mt-2">Manage all your consultations</p>
                </div>
                <a href="/book-consultation" className="btn btn-primary">
                  <Plus size={16} className="inline mr-2" />
                  New Booking
                </a>
              </div>

              {loading ? (
                <p className="text-slate-400">Loading bookings...</p>
              ) : bookings.length === 0 ? (
                <div className="card-premium text-center py-12">
                  <p className="text-slate-400 mb-4">You haven't booked any consultations yet</p>
                  <a href="/book-consultation" className="btn btn-primary">
                    Schedule Your First Consultation
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map(booking => (
                    <div key={booking._id} className="card-elevated">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-ivory font-semibold text-lg">{booking.service}</h3>
                          <p className="text-slate-400 text-sm mt-1">
                            Booked on {new Date(booking.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-md text-xs font-semibold ${
                            booking.status === 'confirmed'
                              ? 'bg-gold-400/10 text-gold-400'
                              : booking.status === 'pending'
                              ? 'bg-slate-700/50 text-slate-300'
                              : 'bg-slate-700/50 text-slate-300'
                          }`}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 py-4 border-t border-slate-700/50">
                        <div>
                          <p className="text-slate-500 text-xs uppercase tracking-widest">Date & Time</p>
                          <p className="text-ivory font-semibold mt-1">
                            {new Date(booking.date).toLocaleDateString()} at {booking.timeSlot}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 text-xs uppercase tracking-widest">Service Type</p>
                          <p className="text-ivory font-semibold mt-1">{booking.service}</p>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="pt-4 border-t border-slate-700/50">
                          <p className="text-slate-500 text-xs uppercase tracking-widest">Notes</p>
                          <p className="text-slate-300 mt-1">{booking.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <h1 className="text-4xl font-serif font-bold text-ivory mb-8">Profile Settings</h1>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="card-premium">
                  <h2 className="text-xl font-semibold text-ivory mb-6">Personal Information</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Full Name</p>
                      <p className="text-ivory font-semibold">{user?.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Email Address</p>
                      <p className="text-ivory font-semibold">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Account Type</p>
                      <p className="text-gold-400 font-semibold uppercase">
                        {user?.role === 'admin' ? 'Administrator' : 'Standard User'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card-premium">
                  <h2 className="text-xl font-semibold text-ivory mb-6">Account Actions</h2>
                  <div className="space-y-3">
                    <button className="btn btn-outline w-full">
                      <Settings size={16} className="inline mr-2" />
                      Change Password
                    </button>
                    <button className="btn btn-outline w-full">
                      <FileText size={16} className="inline mr-2" />
                      Download Booking History
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};
