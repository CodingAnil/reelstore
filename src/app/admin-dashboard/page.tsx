'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

type Tab = 'overview' | 'bundles' | 'orders' | 'settings';

interface Bundle {
  id: number;
  name: string;
  category: string;
  reelCount: number;
  originalPrice: number;
  discountPrice: number;
  thumbnail: string;
  driveLink: string;
  status: 'active' | 'draft';
  sales: number;
}

interface Order {
  id: string;
  customer: string;
  email: string;
  bundle: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  date: string;
}

const mockBundles: Bundle[] = [
  { id: 1, name: 'Hybrid Reels Bundle', category: 'All Categories', reelCount: 500, originalPrice: 1499, discountPrice: 79, thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400', driveLink: 'https://drive.google.com', status: 'active', sales: 2847 },
  { id: 2, name: 'Creature Pack Vol.2', category: 'AI Creatures', reelCount: 150, originalPrice: 799, discountPrice: 49, thumbnail: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=400', driveLink: 'https://drive.google.com', status: 'active', sales: 1234 },
  { id: 3, name: 'Sci-Fi Mega Pack', category: 'Sci-Fi', reelCount: 200, originalPrice: 999, discountPrice: 59, thumbnail: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg?auto=compress&cs=tinysrgb&w=400', driveLink: 'https://drive.google.com', status: 'draft', sales: 0 },
];

const mockOrders: Order[] = [
  { id: 'RS-28471', customer: 'Priya Sharma', email: 'priya.sharma@gmail.com', bundle: 'Hybrid Reels Bundle', amount: 79, status: 'paid', date: '12 Mar 2026' },
  { id: 'RS-28470', customer: 'Arjun Mehta', email: 'arjun.m@outlook.com', bundle: 'Hybrid Reels Bundle', amount: 79, status: 'paid', date: '12 Mar 2026' },
  { id: 'RS-28469', customer: 'Kavya Reddy', email: 'kavya.r@gmail.com', bundle: 'Creature Pack Vol.2', amount: 49, status: 'paid', date: '11 Mar 2026' },
  { id: 'RS-28468', customer: 'Rohan Verma', email: 'rohan.v@yahoo.com', bundle: 'Hybrid Reels Bundle', amount: 79, status: 'paid', date: '11 Mar 2026' },
  { id: 'RS-28467', customer: 'Sneha Patel', email: 'sneha.patel@gmail.com', bundle: 'Hybrid Reels Bundle', amount: 79, status: 'pending', date: '10 Mar 2026' },
  { id: 'RS-28466', customer: 'Vikram Singh', email: 'vikram.s@gmail.com', bundle: 'Creature Pack Vol.2', amount: 49, status: 'failed', date: '10 Mar 2026' },
  { id: 'RS-28465', customer: 'Ananya Iyer', email: 'ananya.i@gmail.com', bundle: 'Hybrid Reels Bundle', amount: 79, status: 'paid', date: '09 Mar 2026' },
];

const statsCards = [
  { label: 'Total Revenue', value: '₹2,24,913', change: '+18.4%', icon: '💰', color: 'text-green-400' },
  { label: 'Total Orders', value: '2,847', change: '+12.1%', icon: '📦', color: 'text-accent' },
  { label: 'Conversion Rate', value: '4.7%', change: '+0.8%', icon: '📈', color: 'text-purple-400' },
  { label: 'Visitors Today', value: '1,284', change: '+24.3%', icon: '👁', color: 'text-blue-400' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showAddBundle, setShowAddBundle] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newBundle, setNewBundle] = useState({ name: '', category: '', reelCount: '', originalPrice: '', discountPrice: '', driveLink: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email === 'admin@reelstore.com' && loginForm.password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Try admin@reelstore.com / admin123');
    }
  };

  // Login screen
  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen bg-bg flex items-center justify-center px-4"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,26,26,0.5) 0%, #0D0505 60%)' }}
      >
        <div className="w-full max-w-md animate-fade-scale">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-2">
                <AppLogo size={40} />
                <span className="font-display font-900 text-2xl text-accent">ReelStore</span>
              </div>
            </div>
            <h1 className="font-display font-900 text-2xl text-fg mb-2">Admin Login</h1>
            <p className="text-fg-dim text-sm">Access the creator dashboard</p>
          </div>

          <div
            className="glass rounded-3xl p-8"
            style={{ border: '1px solid rgba(201,168,76,0.3)', boxShadow: '0 0 60px rgba(139,26,26,0.3)' }}
          >
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-fg-muted text-sm font-600 mb-1.5 font-display">Email</label>
                <input
                  type="email"
                  placeholder="admin@reelstore.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="input-dark w-full rounded-xl px-4 py-3.5 text-fg text-sm"
                />
              </div>
              <div>
                <label className="block text-fg-muted text-sm font-600 mb-1.5 font-display">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="input-dark w-full rounded-xl px-4 py-3.5 text-fg text-sm"
                />
              </div>

              {loginError && (
                <div className="bg-red-900/30 border border-red-500/30 rounded-xl px-4 py-3">
                  <p className="text-red-400 text-sm">{loginError}</p>
                </div>
              )}

              <div className="bg-primary/10 border border-primary/20 rounded-xl px-4 py-3">
                <p className="text-fg-dim text-xs text-center">Demo: admin@reelstore.com / admin123</p>
              </div>

              <button
                type="submit"
                className="btn-cta w-full py-4 rounded-2xl text-white font-display font-800 text-lg shadow-cta"
              >
                Login to Dashboard
              </button>
            </form>
          </div>

          <div className="text-center mt-6">
            <Link href="/homepage" className="text-fg-dim text-sm hover:text-fg transition-colors">
              ← Back to Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'bundles', label: 'Bundles', icon: '📦' },
    { id: 'orders', label: 'Orders', icon: '🛒' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-bg text-fg flex">
      {/* Sidebar */}
      <aside
        className={`admin-sidebar fixed lg:relative inset-y-0 left-0 z-40 w-64 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-accent/10">
          <div className="flex items-center gap-3">
            <AppLogo size={32} />
            <div>
              <div className="font-display font-800 text-accent text-base">ReelStore</div>
              <div className="text-fg-dim text-xs">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-600 font-display transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-primary/30 text-accent border border-accent/30' :'text-fg-muted hover:bg-white/5 hover:text-fg'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-accent/10">
          <button
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-fg-dim text-sm font-600 hover:bg-red-900/20 hover:text-red-400 transition-colors"
          >
            <Icon name="ArrowRightOnRectangleIcon" size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-bg/95 backdrop-blur-xl border-b border-accent/10 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Icon name="Bars3Icon" size={20} className="text-fg-muted" />
            </button>
            <div>
              <h1 className="font-display font-800 text-fg text-lg capitalize">{activeTab}</h1>
              <p className="text-fg-dim text-xs">ReelStore Admin · 12 Mar 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/homepage"
              className="glass border-gold rounded-lg px-3 py-2 text-fg-muted text-xs font-600 hover:text-fg transition-colors hidden sm:flex items-center gap-1.5"
            >
              <Icon name="EyeIcon" size={14} />
              View Store
            </Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-display font-800 text-bg text-xs">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statsCards.map((stat, i) => (
                  <div key={i} className="glass rounded-2xl p-5 border-gold card-hover">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{stat.icon}</span>
                      <span className={`text-xs font-700 ${stat.color}`}>{stat.change}</span>
                    </div>
                    <div className={`font-display font-900 text-2xl sm:text-3xl ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-fg-dim text-xs font-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Revenue chart (visual representation) */}
              <div className="glass rounded-2xl p-6 border-gold">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-800 text-fg text-lg">Revenue (Last 7 Days)</h3>
                  <span className="text-accent text-sm font-700">₹18,403 this week</span>
                </div>
                <div className="flex items-end gap-2 h-32">
                  {[45, 72, 58, 89, 63, 94, 78].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-lg transition-all duration-700"
                        style={{
                          height: `${h}%`,
                          background: i === 6
                            ? 'linear-gradient(to top, #7C3AED, #9333EA)'
                            : 'linear-gradient(to top, #8B1A1A, #C9A84C)',
                          opacity: i === 6 ? 1 : 0.6,
                        }}
                      />
                      <span className="text-fg-dim text-[10px]">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent orders snippet */}
              <div className="glass rounded-2xl p-6 border-gold">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-800 text-fg text-lg">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-accent text-sm font-700 hover:underline">
                    View all →
                  </button>
                </div>
                <div className="space-y-3">
                  {mockOrders.slice(0, 4).map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-2 border-b border-accent/5 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-display font-800 text-bg text-xs">
                          {order.customer[0]}
                        </div>
                        <div>
                          <div className="font-display font-600 text-fg text-sm">{order.customer}</div>
                          <div className="text-fg-dim text-xs">{order.bundle}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-display font-700 text-fg text-sm">₹{order.amount}</div>
                        <span className={`text-xs font-700 ${order.status === 'paid' ? 'text-green-400' : order.status === 'pending' ? 'text-yellow-400' : 'text-red-400'}`}>
                          {order.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BUNDLES TAB */}
          {activeTab === 'bundles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-800 text-fg text-xl">Bundle Management</h2>
                <button
                  onClick={() => setShowAddBundle(true)}
                  className="btn-cta flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-display font-700 text-sm shadow-cta"
                >
                  <Icon name="PlusIcon" size={16} className="text-white" />
                  Add Bundle
                </button>
              </div>

              {/* Add Bundle Modal */}
              {showAddBundle && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                  <div
                    className="glass rounded-3xl p-6 w-full max-w-lg"
                    style={{ border: '1px solid rgba(201,168,76,0.3)' }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-display font-800 text-fg text-xl">Add New Bundle</h3>
                      <button onClick={() => setShowAddBundle(false)} className="text-fg-dim hover:text-fg">
                        <Icon name="XMarkIcon" size={20} />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {[
                        { key: 'name', label: 'Bundle Name', placeholder: 'Hybrid Reels Bundle' },
                        { key: 'category', label: 'Category', placeholder: 'All Categories' },
                        { key: 'reelCount', label: 'Reel Count', placeholder: '500' },
                        { key: 'originalPrice', label: 'Original Price (₹)', placeholder: '1499' },
                        { key: 'discountPrice', label: 'Offer Price (₹)', placeholder: '79' },
                        { key: 'driveLink', label: 'Google Drive Link', placeholder: 'https://drive.google.com/...' },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="block text-fg-muted text-xs font-600 mb-1 uppercase tracking-wider">{field.label}</label>
                          <input
                            type="text"
                            placeholder={field.placeholder}
                            value={(newBundle as Record<string, string>)[field.key]}
                            onChange={(e) => setNewBundle({ ...newBundle, [field.key]: e.target.value })}
                            className="input-dark w-full rounded-xl px-4 py-3 text-fg text-sm"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setShowAddBundle(false)}
                        className="flex-1 glass border-gold rounded-xl py-3 text-fg-muted font-700 text-sm hover:text-fg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setShowAddBundle(false)}
                        className="flex-1 btn-cta rounded-xl py-3 text-white font-display font-700 text-sm shadow-cta"
                      >
                        Save Bundle
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Bundle cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {mockBundles.map((bundle) => (
                  <div key={bundle.id} className="glass rounded-2xl overflow-hidden border-gold card-hover">
                    <div className="relative" style={{ aspectRatio: '16/9' }}>
                      <AppImage
                        src={bundle.thumbnail}
                        alt={`${bundle.name} bundle thumbnail`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className={`text-xs font-700 px-2 py-1 rounded-full ${bundle.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                          {bundle.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="badge-fire text-white">{bundle.reelCount}+ REELS</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-display font-800 text-fg text-base mb-1">{bundle.name}</h3>
                      <p className="text-fg-dim text-xs mb-3">{bundle.category}</p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className="font-display font-900 text-accent text-xl">₹{bundle.discountPrice}</span>
                          <span className="price-strike text-fg-dim text-sm">₹{bundle.originalPrice}</span>
                        </div>
                        <div className="text-fg-dim text-xs">
                          <span className="text-green-400 font-700">{bundle.sales}</span> sales
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 glass border-gold rounded-lg py-2 text-fg-muted text-xs font-600 hover:text-accent transition-colors flex items-center justify-center gap-1.5">
                          <Icon name="PencilIcon" size={12} />
                          Edit
                        </button>
                        <button className="glass border-gold rounded-lg px-3 py-2 text-fg-muted hover:text-red-400 transition-colors">
                          <Icon name="TrashIcon" size={14} />
                        </button>
                        <a
                          href={bundle.driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass border-gold rounded-lg px-3 py-2 text-fg-muted hover:text-accent transition-colors"
                        >
                          <Icon name="LinkIcon" size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="font-display font-800 text-fg text-xl">Order Management</h2>
                <div className="flex items-center gap-3">
                  <div className="glass border-gold rounded-xl px-4 py-2 flex items-center gap-2">
                    <Icon name="MagnifyingGlassIcon" size={14} className="text-fg-dim" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                className="bg-transparent text-fg text-sm outline-none w-32 sm:w-48 placeholder:text-fg-dim"
                    />
                  </div>
                  <button className="glass border-gold rounded-xl px-4 py-2 text-fg-muted text-xs font-600 hover:text-accent transition-colors flex items-center gap-1.5">
                    <Icon name="ArrowDownTrayIcon" size={14} />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Orders table */}
              <div className="glass rounded-2xl border-gold overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
                        {['Order ID', 'Customer', 'Bundle', 'Amount', 'Status', 'Date', 'Action'].map((h) => (
                          <th key={h} className="text-left px-4 py-4 text-fg-dim text-xs font-700 uppercase tracking-wider font-display whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order, i) => (
                        <tr
                          key={order.id}
                          className="transition-colors hover:bg-white/[0.02]"
                          style={{ borderBottom: i < mockOrders.length - 1 ? '1px solid rgba(201,168,76,0.06)' : 'none' }}
                        >
                          <td className="px-4 py-4">
                            <span className="font-mono text-accent text-xs font-700">{order.id}</span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-7 h-7 rounded-full flex items-center justify-center font-display font-800 text-bg text-xs flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, #8B1A1A, #C9A84C)' }}
                              >
                                {order.customer[0]}
                              </div>
                              <div>
                                <div className="font-display font-600 text-fg text-sm whitespace-nowrap">{order.customer}</div>
                                <div className="text-fg-dim text-xs">{order.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-fg-muted text-sm whitespace-nowrap">{order.bundle}</span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="font-display font-700 text-fg text-sm">₹{order.amount}</span>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex items-center gap-1 text-xs font-700 px-2.5 py-1 rounded-full ${
                                order.status === 'paid' ?'bg-green-500/15 text-green-400 border border-green-500/25'
                                  : order.status === 'pending' ?'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25' :'bg-red-500/15 text-red-400 border border-red-500/25'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'paid' ? 'bg-green-400' : order.status === 'pending' ? 'bg-yellow-400' : 'bg-red-400'}`} />
                              {order.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-fg-dim text-xs whitespace-nowrap">{order.date}</span>
                          </td>
                          <td className="px-4 py-4">
                            <button className="glass border-gold rounded-lg px-3 py-1.5 text-fg-muted text-xs font-600 hover:text-accent transition-colors whitespace-nowrap">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Table footer */}
                <div
                  className="px-4 py-3 flex items-center justify-between"
                  style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <span className="text-fg-dim text-xs">Showing {mockOrders.length} of {mockOrders.length} orders</span>
                  <div className="flex items-center gap-2">
                    <button className="glass border-gold rounded-lg px-3 py-1.5 text-fg-muted text-xs font-600 hover:text-accent transition-colors">
                      Previous
                    </button>
                    <button className="bg-primary/30 border border-accent/30 rounded-lg px-3 py-1.5 text-accent text-xs font-700">
                      1
                    </button>
                    <button className="glass border-gold rounded-lg px-3 py-1.5 text-fg-muted text-xs font-600 hover:text-accent transition-colors">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <h2 className="font-display font-800 text-fg text-xl">Store Settings</h2>

              {/* Pricing Settings */}
              <div className="glass rounded-2xl p-6 border-gold">
                <h3 className="font-display font-800 text-fg text-lg mb-5 flex items-center gap-2">
                  <span>💰</span> Pricing & Discount
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Original Price (₹)', value: '1499', hint: 'Strikethrough price shown to users' },
                    { label: 'Offer Price (₹)', value: '79', hint: 'Actual price users pay' },
                    { label: 'Discount Percentage', value: '95', hint: 'Shown as badge on pricing card' },
                  ].map((field, i) => (
                    <div key={i}>
                      <label className="block text-fg-muted text-xs font-600 mb-1 uppercase tracking-wider">{field.label}</label>
                      <input
                        type="text"
                        defaultValue={field.value}
                        className="input-dark w-full rounded-xl px-4 py-3 text-fg text-sm"
                      />
                      <p className="text-fg-dim text-xs mt-1">{field.hint}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Settings */}
              <div className="glass rounded-2xl p-6 border-gold">
                <h3 className="font-display font-800 text-fg text-lg mb-5 flex items-center gap-2">
                  <span>📧</span> Email Delivery (SendGrid)
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'SendGrid API Key', value: 'SG.xxxxxxxxxxxxxxxxxxxxxxxx', hint: 'Connect backend API — not stored here' },
                    { label: 'From Email', value: 'noreply@reelstore.in', hint: 'Sender address for order confirmations' },
                    { label: 'Support Email', value: 'support@reelstore.in', hint: 'Shown in emails and footer' },
                  ].map((field, i) => (
                    <div key={i}>
                      <label className="block text-fg-muted text-xs font-600 mb-1 uppercase tracking-wider">{field.label}</label>
                      <input
                        type="text"
                        defaultValue={field.value}
                        className="input-dark w-full rounded-xl px-4 py-3 text-fg text-sm"
                      />
                      <p className="text-fg-dim text-xs mt-1">{field.hint}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-fg-dim text-xs">
                    💡 Connect SendGrid in your Node.js backend API. UI only — backend integration required for live emails.
                  </p>
                </div>
              </div>

              {/* Analytics Settings */}
              <div className="glass rounded-2xl p-6 border-gold">
                <h3 className="font-display font-800 text-fg text-lg mb-5 flex items-center gap-2">
                  <span>📊</span> Analytics (Mixpanel)
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-fg-muted text-xs font-600 mb-1 uppercase tracking-wider">Mixpanel Project Token</label>
                    <input
                      type="text"
                      defaultValue="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      className="input-dark w-full rounded-xl px-4 py-3 text-fg text-sm"
                    />
                    <p className="text-fg-dim text-xs mt-1">Add to frontend for visitor & conversion tracking</p>
                  </div>
                </div>

                {/* Mock analytics summary */}
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Visitors', value: '60,482', icon: '👁' },
                    { label: 'Bundle Views', value: '18,234', icon: '📦' },
                    { label: 'Purchases', value: '2,847', icon: '💳' },
                    { label: 'Conv. Rate', value: '4.7%', icon: '🎯' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-center">
                      <div className="text-xl mb-1">{stat.icon}</div>
                      <div className="font-display font-800 text-accent text-base">{stat.value}</div>
                      <div className="text-fg-dim text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Settings */}
              <div className="glass rounded-2xl p-6 border-gold">
                <h3 className="font-display font-800 text-fg text-lg mb-5 flex items-center gap-2">
                  <span>🔒</span> Security & Download Protection
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-accent/10">
                    <div>
                      <div className="font-display font-600 text-fg text-sm">Token-Protected Download Links</div>
                      <div className="text-fg-dim text-xs mt-0.5">Only paid users can access download URLs</div>
                    </div>
                    <div className="w-10 h-6 bg-green-500/30 rounded-full border border-green-500/50 flex items-center justify-end px-0.5 cursor-pointer">
                      <div className="w-5 h-5 bg-green-400 rounded-full shadow" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-accent/10">
                    <div>
                      <div className="font-display font-600 text-fg text-sm">Email Verification on Purchase</div>
                      <div className="text-fg-dim text-xs mt-0.5">Verify email before sending download link</div>
                    </div>
                    <div className="w-10 h-6 bg-green-500/30 rounded-full border border-green-500/50 flex items-center justify-end px-0.5 cursor-pointer">
                      <div className="w-5 h-5 bg-green-400 rounded-full shadow" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-display font-600 text-fg text-sm">Rate Limit Checkout (5 req/min)</div>
                      <div className="text-fg-dim text-xs mt-0.5">Prevent payment abuse and spam</div>
                    </div>
                    <div className="w-10 h-6 bg-green-500/30 rounded-full border border-green-500/50 flex items-center justify-end px-0.5 cursor-pointer">
                      <div className="w-5 h-5 bg-green-400 rounded-full shadow" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Save button */}
              <button className="btn-cta w-full py-4 rounded-2xl text-white font-display font-800 text-lg shadow-cta">
                Save Settings
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}