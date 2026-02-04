import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Users, MessageSquare, CheckCircle, BarChart3, TrendingUp, Eye, Filter, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminDashboard = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchData();
    }
  }, [isAuthenticated, isAdmin]);

  const fetchData = async () => {
    try {
      const [statsRes, leadsRes, bookingsRes, adminsRes] = await Promise.all([
        axios.get('/api/admin/stats'),
        axios.get('/api/leads'),
        axios.get('/api/bookings'),
        axios.get('/api/admin/users'),
      ]);

      setStats(statsRes.data.stats);
      setLeads(leadsRes.data.leads.slice(0, 10));
      setBookings(bookingsRes.data.bookings.slice(0, 10));
      // Filter only admin users
      const adminUsers = adminsRes.data.users.filter(user => user.role === 'admin');
      setAdmins(adminUsers);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveBooking = async (bookingId) => {
    try {
      await axios.patch(`/api/bookings/${bookingId}`, { status: 'confirmed' });
      toast.success('Booking approved!');
      fetchData(); // Refresh data
    } catch (error) {
      toast.error('Failed to approve booking');
      console.error('Error:', error);
    }
  };

  const rejectBooking = async (bookingId) => {
    try {
      await axios.patch(`/api/bookings/${bookingId}`, { status: 'rejected' });
      toast.success('Booking rejected!');
      fetchData(); // Refresh data
    } catch (error) {
      toast.error('Failed to reject booking');
      console.error('Error:', error);
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" />;
  }

  const filteredBookings = filterStatus === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filterStatus);

  const filteredLeads = filterService === 'all'
    ? leads
    : leads.filter(l => l.service === filterService);

  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-charcoal-900 border-r border-slate-700/50 min-h-[calc(100vh-80px)] p-6">
          <h3 className="text-ivory font-serif font-bold text-lg mb-8">Admin Panel</h3>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-2 rounded-md transition ${
                activeTab === 'overview'
                  ? 'bg-gold-400/10 text-gold-400'
                  : 'text-slate-300 hover:text-gold-400'
              }`}
            >
              <BarChart3 size={16} className="inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full text-left px-4 py-2 rounded-md transition ${
                activeTab === 'leads'
                  ? 'bg-gold-400/10 text-gold-400'
                  : 'text-slate-300 hover:text-gold-400'
              }`}
            >
              <MessageSquare size={16} className="inline mr-2" />
              Leads
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full text-left px-4 py-2 rounded-md transition ${
                activeTab === 'bookings'
                  ? 'bg-gold-400/10 text-gold-400'
                  : 'text-slate-300 hover:text-gold-400'
              }`}
            >
              <CheckCircle size={16} className="inline mr-2" />
              Bookings
            </button>
            <button
              onClick={() => setActiveTab('admins')}
              className={`w-full text-left px-4 py-2 rounded-md transition ${
                activeTab === 'admins'
                  ? 'bg-gold-400/10 text-gold-400'
                  : 'text-slate-300 hover:text-gold-400'
              }`}
            >
              <Users size={16} className="inline mr-2" />
              Admins
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h1 className="text-4xl font-serif font-bold text-ivory mb-8">Dashboard Overview</h1>

              {/* Stats Grid */}
              {stats && (
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <div className="card-premium">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-widest">Total Users</p>
                        <p className="text-4xl font-bold text-ivory mt-2">{stats.totalUsers || 0}</p>
                      </div>
                      <div className="w-12 h-12 rounded-md bg-gold-400/10 flex-center text-gold-400">
                        <Users size={24} />
                      </div>
                    </div>
                    <p className="text-slate-500 text-xs flex items-center gap-1">
                      <TrendingUp size={14} /> Active members
                    </p>
                  </div>

                  <div className="card-premium">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-widest">Admin Users</p>
                        <p className="text-4xl font-bold text-gold-400 mt-2">{stats.adminUsers || 0}</p>
                      </div>
                      <div className="w-12 h-12 rounded-md bg-gold-400/10 flex-center text-gold-400">
                        <Users size={24} />
                      </div>
                    </div>
                    <p className="text-slate-500 text-xs">Management team</p>
                  </div>

                  <div className="card-premium">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-widest">Total Leads</p>
                        <p className="text-4xl font-bold text-ivory mt-2">{leads.length || 0}</p>
                      </div>
                      <div className="w-12 h-12 rounded-md bg-gold-400/10 flex-center text-gold-400">
                        <MessageSquare size={24} />
                      </div>
                    </div>
                    <p className="text-slate-500 text-xs">Inquiry submissions</p>
                  </div>

                  <div className="card-premium">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-widest">Bookings</p>
                        <p className="text-4xl font-bold text-ivory mt-2">{bookings.length || 0}</p>
                      </div>
                      <div className="w-12 h-12 rounded-md bg-gold-400/10 flex-center text-gold-400">
                        <CheckCircle size={24} />
                      </div>
                    </div>
                    <p className="text-slate-500 text-xs">Total consultations</p>
                  </div>
                </div>
              )}

              {/* Recent Activity Section */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Recent Leads */}
                <div className="card-premium">
                  <h2 className="text-2xl font-serif font-semibold text-ivory mb-6">Recent Leads</h2>
                  {loading ? (
                    <p className="text-slate-400">Loading leads...</p>
                  ) : leads.length === 0 ? (
                    <p className="text-slate-400">No leads yet</p>
                  ) : (
                    <div className="space-y-3">
                      {leads.slice(0, 5).map(lead => (
                        <div key={lead._id} className="flex justify-between items-start p-3 bg-slate-900/50 rounded-md border border-slate-700/50">
                          <div className="flex-1">
                            <p className="text-ivory font-semibold text-sm">{lead.name}</p>
                            <p className="text-slate-400 text-xs">{lead.email}</p>
                            <p className="text-slate-500 text-xs mt-1">{lead.service}</p>
                          </div>
                          <span className="px-2 py-1 rounded text-xs font-semibold bg-gold-400/10 text-gold-400">
                            {lead.status || 'new'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Bookings */}
                <div className="card-premium">
                  <h2 className="text-2xl font-serif font-semibold text-ivory mb-6">Recent Bookings</h2>
                  {loading ? (
                    <p className="text-slate-400">Loading bookings...</p>
                  ) : bookings.length === 0 ? (
                    <p className="text-slate-400">No bookings yet</p>
                  ) : (
                    <div className="space-y-3">
                      {bookings.slice(0, 5).map(booking => (
                        <div key={booking._id} className="flex justify-between items-start p-3 bg-slate-900/50 rounded-md border border-slate-700/50">
                          <div className="flex-1">
                            <p className="text-ivory font-semibold text-sm">{booking.name}</p>
                            <p className="text-slate-400 text-xs">{booking.service}</p>
                            <p className="text-slate-500 text-xs mt-1">
                              {new Date(booking.date).toLocaleDateString()} at {booking.timeSlot}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            booking.status === 'confirmed'
                              ? 'bg-gold-400/10 text-gold-400'
                              : 'bg-slate-700/50 text-slate-300'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Leads Tab */}
          {activeTab === 'leads' && (
            <div>
              <div className="mb-8">
                <h1 className="text-4xl font-serif font-bold text-ivory">Lead Management</h1>
                <p className="text-slate-400 mt-2">View and manage all inquiry submissions</p>
              </div>

              <div className="card-premium mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-ivory">All Leads</h2>
                  <div className="relative">
                    <button
                      onClick={() => setShowFilterMenu(!showFilterMenu)}
                      className="btn btn-sm btn-outline"
                    >
                      <Filter size={16} className="inline mr-2" />
                      Filter by Service
                    </button>
                    {showFilterMenu && (
                      <div className="absolute right-0 mt-2 bg-charcoal-900 border border-slate-700 rounded-md shadow-lg z-10">
                        <button
                          onClick={() => {
                            setFilterService('all');
                            setShowFilterMenu(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm hover:bg-gold-400/10 hover:text-gold-400 ${
                            filterService === 'all' ? 'bg-gold-400/10 text-gold-400' : 'text-slate-300'
                          }`}
                        >
                          All Services
                        </button>
                        <button
                          onClick={() => {
                            setFilterService('Career Counselling');
                            setShowFilterMenu(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm hover:bg-gold-400/10 hover:text-gold-400 border-t border-slate-700/50 ${
                            filterService === 'Career Counselling' ? 'bg-gold-400/10 text-gold-400' : 'text-slate-300'
                          }`}
                        >
                          Career Counselling
                        </button>
                        <button
                          onClick={() => {
                            setFilterService('Educational Consultancy');
                            setShowFilterMenu(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm hover:bg-gold-400/10 hover:text-gold-400 border-t border-slate-700/50 ${
                            filterService === 'Educational Consultancy' ? 'bg-gold-400/10 text-gold-400' : 'text-slate-300'
                          }`}
                        >
                          Educational Consultancy
                        </button>
                        <button
                          onClick={() => {
                            setFilterService('Recruitment Services');
                            setShowFilterMenu(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm hover:bg-gold-400/10 hover:text-gold-400 border-t border-slate-700/50 ${
                            filterService === 'Recruitment Services' ? 'bg-gold-400/10 text-gold-400' : 'text-slate-300'
                          }`}
                        >
                          Recruitment Services
                        </button>
                        <button
                          onClick={() => {
                            setFilterService('Immigration Services');
                            setShowFilterMenu(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm hover:bg-gold-400/10 hover:text-gold-400 border-t border-slate-700/50 ${
                            filterService === 'Immigration Services' ? 'bg-gold-400/10 text-gold-400' : 'text-slate-300'
                          }`}
                        >
                          Immigration Services
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {loading ? (
                  <p className="text-slate-400">Loading leads...</p>
                ) : filteredLeads.length === 0 ? (
                  <p className="text-slate-400">No leads available</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b border-slate-700/50">
                        <tr className="text-slate-400 text-xs uppercase tracking-widest">
                          <th className="text-left py-3 px-4">Name</th>
                          <th className="text-left py-3 px-4">Email</th>
                          <th className="text-left py-3 px-4">Service</th>
                          <th className="text-left py-3 px-4">Phone</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeads.map((lead, idx) => (
                          <tr key={lead._id} className={`border-b border-slate-700/50 ${idx % 2 === 0 ? 'bg-slate-900/20' : ''}`}>
                            <td className="py-3 px-4 text-ivory">{lead.name}</td>
                            <td className="py-3 px-4 text-slate-400">{lead.email}</td>
                            <td className="py-3 px-4 text-slate-400">{lead.service}</td>
                            <td className="py-3 px-4 text-slate-400">{lead.phone || 'N/A'}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 rounded text-xs font-semibold bg-gold-400/10 text-gold-400">
                                {lead.status || 'new'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <button className="text-gold-400 hover:text-gold-300">
                                <Eye size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div>
              <div className="mb-8">
                <h1 className="text-4xl font-serif font-bold text-ivory">Booking Management</h1>
                <p className="text-slate-400 mt-2">View and manage all scheduled consultations</p>
              </div>

              <div className="card-premium mb-6">
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`btn btn-sm ${filterStatus === 'all' ? 'btn-primary' : 'btn-outline'}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterStatus('confirmed')}
                    className={`btn btn-sm ${filterStatus === 'confirmed' ? 'btn-primary' : 'btn-outline'}`}
                  >
                    Confirmed
                  </button>
                  <button
                    onClick={() => setFilterStatus('pending')}
                    className={`btn btn-sm ${filterStatus === 'pending' ? 'btn-primary' : 'btn-outline'}`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setFilterStatus('rejected')}
                    className={`btn btn-sm ${filterStatus === 'rejected' ? 'btn-primary' : 'btn-outline'}`}
                  >
                    Rejected
                  </button>
                </div>
              </div>

              <div className="card-premium">
                {loading ? (
                  <p className="text-slate-400">Loading bookings...</p>
                ) : filteredBookings.length === 0 ? (
                  <p className="text-slate-400">No bookings found</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b border-slate-700/50">
                        <tr className="text-slate-400 text-xs uppercase tracking-widest">
                          <th className="text-left py-3 px-4">Name</th>
                          <th className="text-left py-3 px-4">Service</th>
                          <th className="text-left py-3 px-4">Date & Time</th>
                          <th className="text-left py-3 px-4">Email</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBookings.map((booking, idx) => (
                          <tr key={booking._id} className={`border-b border-slate-700/50 ${idx % 2 === 0 ? 'bg-slate-900/20' : ''}`}>
                            <td className="py-3 px-4 text-ivory">{booking.name}</td>
                            <td className="py-3 px-4 text-slate-400">{booking.service}</td>
                            <td className="py-3 px-4 text-slate-400">
                              {new Date(booking.date).toLocaleDateString()} {booking.timeSlot}
                            </td>
                            <td className="py-3 px-4 text-slate-400">{booking.email}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                booking.status === 'confirmed'
                                  ? 'bg-gold-400/10 text-gold-400'
                                  : 'bg-slate-700/50 text-slate-300'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                {booking.status === 'pending' ? (
                                  <>
                                    <button
                                      onClick={() => approveBooking(booking._id)}
                                      className="p-1.5 rounded bg-gold-400/10 text-gold-400 hover:bg-gold-400/20 transition"
                                      title="Approve booking"
                                    >
                                      <Check size={16} />
                                    </button>
                                    <button
                                      onClick={() => rejectBooking(booking._id)}
                                      className="p-1.5 rounded bg-red-400/10 text-red-400 hover:bg-red-400/20 transition"
                                      title="Reject booking"
                                    >
                                      <X size={16} />
                                    </button>
                                  </>
                                ) : (
                                  <span className="text-slate-400 text-xs">-</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Admins Tab */}
          {activeTab === 'admins' && (
            <div>
              <h1 className="text-4xl font-serif font-bold text-ivory mb-8">Admin Users</h1>
              
              <div className="card-premium">
                {loading ? (
                  <p className="text-slate-400">Loading admins...</p>
                ) : admins.length === 0 ? (
                  <p className="text-slate-400">No admin users found</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700/50">
                          <th className="text-left py-4 px-4 text-slate-300 font-semibold text-sm uppercase tracking-widest">Name</th>
                          <th className="text-left py-4 px-4 text-slate-300 font-semibold text-sm uppercase tracking-widest">Email</th>
                          <th className="text-left py-4 px-4 text-slate-300 font-semibold text-sm uppercase tracking-widest">Phone</th>
                          <th className="text-left py-4 px-4 text-slate-300 font-semibold text-sm uppercase tracking-widest">Joined</th>
                          <th className="text-left py-4 px-4 text-slate-300 font-semibold text-sm uppercase tracking-widest">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {admins.map(admin => (
                          <tr key={admin._id} className="border-b border-slate-700/50 hover:bg-slate-900/50 transition">
                            <td className="py-4 px-4 text-ivory font-semibold">{admin.name}</td>
                            <td className="py-4 px-4 text-slate-300 text-sm">{admin.email}</td>
                            <td className="py-4 px-4 text-slate-300 text-sm">{admin.phone || '-'}</td>
                            <td className="py-4 px-4 text-slate-400 text-sm">
                              {new Date(admin.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold-400/10 text-gold-400">
                                {admin.role}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {/* Admin Stats */}
                {!loading && admins.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-slate-700/50">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-widest">Total Admins</p>
                        <p className="text-3xl font-bold text-gold-400 mt-2">{admins.length}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-widest">All Active</p>
                        <p className="text-3xl font-bold text-green-400 mt-2">{admins.length}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-widest">Management Team</p>
                        <p className="text-sm text-slate-300 mt-2">Overseeing platform</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};
