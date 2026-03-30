'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { bundleService, categoryService, orderService, Bundle, Category, Order } from '@/lib/services/reelstoreService';

type Tab = 'overview' | 'bundles' | 'categories' | 'orders' | 'settings';

const emptyBundle = {
  name: '',
  title: '',
  shortDescription: '',
  fullDescription: '',
  thumbnailUrl: '',
  mockupImageUrl: '',
  originalPrice: 0,
  offerPrice: 0,
  reelsCount: 0,
  category: '',
  features: [] as string[],
  status: 'draft' as 'draft' | 'active' | 'inactive',
  isFeatured: false,
  downloadUrl: '',
};

const emptyCategory = {
  name: '',
  reelsCount: 0,
  demoVideoUrl: '',
  description: '',
  status: 'active' as 'active' | 'inactive',
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Bundles state
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [bundlesLoading, setBundlesLoading] = useState(false);
  const [showBundleModal, setShowBundleModal] = useState(false);
  const [editingBundle, setEditingBundle] = useState<Bundle | null>(null);
  const [bundleForm, setBundleForm] = useState(emptyBundle);
  const [bundleFeaturesInput, setBundleFeaturesInput] = useState('');
  const [bundleSaving, setBundleSaving] = useState(false);
  const [bundleDeleteId, setBundleDeleteId] = useState<string | null>(null);

  // Categories state
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState(emptyCategory);
  const [categorySaving, setCategorySaving] = useState(false);
  const [categoryDeleteId, setCategoryDeleteId] = useState<string | null>(null);

  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orderSearch, setOrderSearch] = useState('');

  // Analytics state
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    paidOrders: 0,
    failedOrders: 0,
    pendingOrders: 0,
    bundleSales: [] as import('@/lib/services/reelstoreService').BundleSalesStats[],
  });
  const [statsLoading, setStatsLoading] = useState(false);

  const loadBundles = useCallback(async () => {
    setBundlesLoading(true);
    const data = await bundleService.getAllBundles();
    setBundles(data);
    setBundlesLoading(false);
  }, []);

  const loadCategories = useCallback(async () => {
    setCategoriesLoading(true);
    const data = await categoryService.getAllCategories();
    setCategories(data);
    setCategoriesLoading(false);
  }, []);

  const loadOrders = useCallback(async () => {
    setOrdersLoading(true);
    const data = await orderService.getAllOrders();
    setOrders(data);
    setOrdersLoading(false);
  }, []);

  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    const data = await orderService.getOrderStats();
    setStats(data);
    setStatsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn && activeTab === 'bundles') loadBundles();
    if (isLoggedIn && activeTab === 'categories') loadCategories();
    if (isLoggedIn && activeTab === 'orders') loadOrders();
    if (isLoggedIn && activeTab === 'overview') {
      loadStats();
      loadOrders();
    }
  }, [isLoggedIn, activeTab, loadBundles, loadCategories, loadOrders, loadStats]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email === 'admin@reelstore.com' && loginForm.password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Try admin@reelstore.com / admin123');
    }
  };

  // ─── Bundle handlers ─────────────────────────────────────────────────────────
  const openAddBundle = () => {
    setEditingBundle(null);
    setBundleForm(emptyBundle);
    setBundleFeaturesInput('');
    setShowBundleModal(true);
  };

  const openEditBundle = (bundle: Bundle) => {
    setEditingBundle(bundle);
    setBundleForm({
      name: bundle.name,
      title: bundle.title,
      shortDescription: bundle.shortDescription,
      fullDescription: bundle.fullDescription,
      thumbnailUrl: bundle.thumbnailUrl,
      mockupImageUrl: bundle.mockupImageUrl,
      originalPrice: bundle.originalPrice,
      offerPrice: bundle.offerPrice,
      reelsCount: bundle.reelsCount,
      category: bundle.category,
      features: bundle.features,
      status: bundle.status,
      isFeatured: bundle.isFeatured,
      downloadUrl: bundle.downloadUrl,
    });
    setBundleFeaturesInput(bundle.features.join('\n'));
    setShowBundleModal(true);
  };

  const handleSaveBundle = async () => {
    if (!bundleForm.name || !bundleForm.title) return;
    setBundleSaving(true);
    const featuresArray = bundleFeaturesInput
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);
    const payload = { ...bundleForm, features: featuresArray };

    if (editingBundle) {
      await bundleService.updateBundle(editingBundle.id, payload);
    } else {
      await bundleService.createBundle(payload);
    }
    setBundleSaving(false);
    setShowBundleModal(false);
    loadBundles();
  };

  const handleDeleteBundle = async (id: string) => {
    await bundleService.deleteBundle(id);
    setBundleDeleteId(null);
    loadBundles();
  };

  const handleToggleBundleStatus = async (bundle: Bundle) => {
    const newStatus = bundle.status === 'active' ? 'inactive' : 'active';
    await bundleService.updateBundle(bundle.id, { status: newStatus });
    loadBundles();
  };

  // ─── Category handlers ────────────────────────────────────────────────────────
  const openAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm(emptyCategory);
    setShowCategoryModal(true);
  };

  const openEditCategory = (cat: Category) => {
    setEditingCategory(cat);
    setCategoryForm({
      name: cat.name,
      reelsCount: cat.reelsCount,
      demoVideoUrl: cat.demoVideoUrl,
      description: cat.description,
      status: cat.status,
    });
    setShowCategoryModal(true);
  };

  const handleSaveCategory = async () => {
    if (!categoryForm.name) return;
    setCategorySaving(true);
    if (editingCategory) {
      await categoryService.updateCategory(editingCategory.id, categoryForm);
    } else {
      await categoryService.createCategory(categoryForm);
    }
    setCategorySaving(false);
    setShowCategoryModal(false);
    loadCategories();
  };

  const handleDeleteCategory = async (id: string) => {
    await categoryService.deleteCategory(id);
    setCategoryDeleteId(null);
    loadCategories();
  };

  const filteredOrders = orders.filter((o) => {
    if (!orderSearch) return true;
    const q = orderSearch.toLowerCase();
    return (
      o.orderNumber.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerEmail.toLowerCase().includes(q) ||
      o.bundleName.toLowerCase().includes(q)
    );
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // ─── Login screen ─────────────────────────────────────────────────────────────
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
                <span className="font-display font-900 text-2xl text-accent">ReelStore Technologies</span>
              </div>
            </div>
            <h1 className="font-display font-900 text-2xl text-fg mb-2">Admin Dashboard</h1>
            <p className="text-fg-dim text-sm">Access the creator dashboard</p>
          </div>
          <div className="glass rounded-3xl p-8" style={{ border: '1px solid rgba(201,168,76,0.3)', boxShadow: '0 0 60px rgba(139,26,26,0.3)' }}>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-fg-muted text-sm font-600 mb-1.5 font-display">Email</label>
                <input type="email" placeholder="admin@reelstore.com" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} className="input-dark w-full rounded-xl px-4 py-3.5 text-fg text-sm" />
              </div>
              <div>
                <label className="block text-fg-muted text-sm font-600 mb-1.5 font-display">Password</label>
                <input type="password" placeholder="••••••••" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} className="input-dark w-full rounded-xl px-4 py-3.5 text-fg text-sm" />
              </div>
              {loginError && (
                <div className="bg-red-900/30 border border-red-500/30 rounded-xl px-4 py-3">
                  <p className="text-red-400 text-sm">{loginError}</p>
                </div>
              )}
              <div className="bg-primary/10 border border-primary/20 rounded-xl px-4 py-3">
                <p className="text-fg-dim text-xs text-center">Demo: admin@reelstore.com / admin123</p>
              </div>
              <button type="submit" className="btn-cta w-full py-4 rounded-2xl text-white font-display font-800 text-lg shadow-cta">Login to Dashboard</button>
            </form>
          </div>
          <div className="text-center mt-6">
            <Link href="/homepage" className="text-fg-dim text-sm hover:text-fg transition-colors">← Back to Store</Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'bundles', label: 'Bundles', icon: '📦' },
    { id: 'categories', label: 'Categories', icon: '🎬' },
    { id: 'orders', label: 'Orders', icon: '🛒' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const statusColor = (status: string) => {
    if (status === 'active') return 'bg-green-500/20 text-green-400 border border-green-500/30';
    if (status === 'draft') return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
    return 'bg-red-500/20 text-red-400 border border-red-500/30';
  };

  const orderStatusColor = (status: string) => {
    if (status === 'paid') return 'bg-green-500/15 text-green-400 border border-green-500/25';
    if (status === 'pending') return 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25';
    if (status === 'refunded') return 'bg-blue-500/15 text-blue-400 border border-blue-500/25';
    return 'bg-red-500/15 text-red-400 border border-red-500/25';
  };

  const orderStatusDot = (status: string) => {
    if (status === 'paid') return 'bg-green-400';
    if (status === 'pending') return 'bg-yellow-400';
    if (status === 'refunded') return 'bg-blue-400';
    return 'bg-red-400';
  };

  return (
    <div className="min-h-screen bg-bg text-fg flex">
      {/* Sidebar */}
      <aside className={`admin-sidebar fixed lg:relative inset-y-0 left-0 z-40 w-64 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-accent/10">
          <div className="flex items-center gap-3">
            <AppLogo size={32} />
            <div>
              <div className="font-display font-800 text-accent text-base">ReelStore Tech</div>
              <div className="text-fg-dim text-xs">Admin Dashboard</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-600 font-display transition-all duration-200 ${activeTab === item.id ? 'bg-primary/30 text-accent border border-accent/30' : 'text-fg-muted hover:bg-white/5 hover:text-fg'}`}>
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-accent/10">
          <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-fg-dim text-sm font-600 hover:bg-red-900/20 hover:text-red-400 transition-colors">
            <Icon name="ArrowRightOnRectangleIcon" size={18} />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-bg/95 backdrop-blur-xl border-b border-accent/10 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors">
              <Icon name="Bars3Icon" size={20} className="text-fg-muted" />
            </button>
            <div>
              <h1 className="font-display font-800 text-fg text-lg capitalize">{activeTab}</h1>
              <p className="text-fg-dim text-xs">ReelStore Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/homepage" className="glass border-gold rounded-lg px-3 py-2 text-fg-muted text-xs font-600 hover:text-fg transition-colors hidden sm:flex items-center gap-1.5">
              <Icon name="EyeIcon" size={14} />
              View Store
            </Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-display font-800 text-bg text-xs">A</div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-auto">

          {/* ─── OVERVIEW TAB ─────────────────────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Live Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: 'Total Revenue',
                    value: statsLoading ? '...' : `₹${stats.totalRevenue.toLocaleString('en-IN')}`,
                    icon: '💰',
                    color: 'text-green-400',
                    hint: 'From verified payments',
                  },
                  {
                    label: 'Successful Orders',
                    value: statsLoading ? '...' : stats.paidOrders.toString(),
                    icon: '✅',
                    color: 'text-accent',
                    hint: 'Cashfree verified',
                  },
                  {
                    label: 'Failed / Cancelled',
                    value: statsLoading ? '...' : stats.failedOrders.toString(),
                    icon: '❌',
                    color: 'text-red-400',
                    hint: 'No payment collected',
                  },
                  {
                    label: 'Pending Orders',
                    value: statsLoading ? '...' : stats.pendingOrders.toString(),
                    icon: '⏳',
                    color: 'text-yellow-400',
                    hint: 'Awaiting payment',
                  },
                ].map((stat, i) => (
                  <div key={i} className="glass rounded-2xl p-5 border-gold card-hover">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{stat.icon}</span>
                    </div>
                    <div className={`font-display font-900 text-2xl sm:text-3xl ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-fg-dim text-xs font-600">{stat.label}</div>
                    <div className="text-fg-dim text-[10px] mt-0.5 opacity-70">{stat.hint}</div>
                  </div>
                ))}
              </div>

              {/* Bundle-wise Sales */}
              {!statsLoading && stats.bundleSales.length > 0 && (
                <div className="glass rounded-2xl p-6 border-gold">
                  <h3 className="font-display font-800 text-fg text-lg mb-4">📦 Bundle-wise Sales</h3>
                  <div className="space-y-3">
                    {stats.bundleSales.map((bs, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-accent/5 last:border-0">
                        <div>
                          <div className="font-display font-600 text-fg text-sm">{bs.bundleName}</div>
                          <div className="text-fg-dim text-xs">{bs.totalSales} sale{bs.totalSales !== 1 ? 's' : ''}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-display font-700 text-green-400 text-sm">₹{bs.totalRevenue.toLocaleString('en-IN')}</div>
                          <div className="text-fg-dim text-xs">verified revenue</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Orders */}
              <div className="glass rounded-2xl p-6 border-gold">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-800 text-fg text-lg">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-accent text-sm font-700 hover:underline">View all →</button>
                </div>
                {ordersLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                  </div>
                ) : orders.length === 0 ? (
                  <p className="text-fg-dim text-sm text-center py-6">No orders yet. Orders will appear here after purchases.</p>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between py-2 border-b border-accent/5 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-display font-800 text-bg text-xs">
                            {order.customerName[0]?.toUpperCase()}
                          </div>
                          <div>
                            <div className="font-display font-600 text-fg text-sm">{order.customerName}</div>
                            <div className="text-fg-dim text-xs">{order.bundleName}</div>
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
                )}
              </div>
            </div>
          )}

          {/* ─── BUNDLES TAB ──────────────────────────────────────────────────── */}
          {activeTab === 'bundles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-800 text-fg text-xl">Assets Pack Management</h2>
                  <p className="text-fg-dim text-xs mt-0.5">Only <span className="text-green-400 font-700">Active</span> packs appear on the website.</p>
                </div>
                <button onClick={openAddBundle} className="btn-cta flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-display font-700 text-sm shadow-cta">
                  <Icon name="PlusIcon" size={16} className="text-white" />
                  Add Bundle
                </button>
              </div>

              {bundlesLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                </div>
              ) : bundles.length === 0 ? (
                <div className="glass rounded-2xl p-12 border-gold text-center">
                  <div className="text-4xl mb-3">📦</div>
                  <p className="text-fg-muted font-display font-700 text-lg mb-1">No bundles yet</p>
                  <p className="text-fg-dim text-sm">Create your first bundle to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {bundles.map((bundle) => (
                    <div key={bundle.id} className="glass rounded-2xl overflow-hidden border-gold card-hover">
                      <div className="relative" style={{ aspectRatio: '16/9' }}>
                        {bundle.thumbnailUrl ? (
                          <AppImage src={bundle.thumbnailUrl} alt={`${bundle.name} thumbnail`} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                            <span className="text-4xl">📦</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 to-transparent" />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className={`text-xs font-700 px-2 py-1 rounded-full ${statusColor(bundle.status)}`}>{bundle.status.toUpperCase()}</span>
                          {bundle.isFeatured && <span className="text-xs font-700 px-2 py-1 rounded-full bg-accent/20 text-accent border border-accent/30">⭐ FEATURED</span>}
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <span className="badge-fire text-white">{bundle.reelsCount}+ REELS</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-800 text-fg text-base mb-0.5">{bundle.name}</h3>
                        <p className="text-fg-dim text-xs mb-1">{bundle.category}</p>
                        <p className="text-fg-muted text-xs mb-3 line-clamp-2">{bundle.shortDescription}</p>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-baseline gap-2">
                            <span className="font-display font-900 text-accent text-xl">₹{bundle.offerPrice}</span>
                            <span className="price-strike text-fg-dim text-sm">₹{bundle.originalPrice}</span>
                          </div>
                          <button
                            onClick={() => handleToggleBundleStatus(bundle)}
                            className={`text-xs font-700 px-3 py-1 rounded-full border transition-colors ${bundle.status === 'active' ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' : 'border-green-500/30 text-green-400 hover:bg-green-500/10'}`}
                          >
                            {bundle.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => openEditBundle(bundle)} className="flex-1 glass border-gold rounded-lg py-2 text-fg-muted text-xs font-600 hover:text-accent transition-colors flex items-center justify-center gap-1.5">
                            <Icon name="PencilIcon" size={12} />
                            Edit
                          </button>
                          <button onClick={() => setBundleDeleteId(bundle.id)} className="glass border-gold rounded-lg px-3 py-2 text-fg-muted hover:text-red-400 transition-colors">
                            <Icon name="TrashIcon" size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bundle Modal */}
              {showBundleModal && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-4 overflow-y-auto">
                  <div className="glass rounded-3xl p-6 w-full max-w-2xl my-8" style={{ border: '1px solid rgba(201,168,76,0.3)' }}>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-display font-800 text-fg text-xl">{editingBundle ? 'Edit Bundle' : 'Add New Bundle'}</h3>
                      <button onClick={() => setShowBundleModal(false)} className="text-fg-dim hover:text-fg"><Icon name="XMarkIcon" size={20} /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { key: 'name', label: 'Bundle Name *', placeholder: 'Hybrid Reels Bundle', type: 'text' },
                        { key: 'title', label: 'Bundle Title *', placeholder: '500+ AI Hybrid Reels', type: 'text' },
                        { key: 'category', label: 'Category', placeholder: 'All Categories', type: 'text' },
                        { key: 'reelsCount', label: 'Reels Count', placeholder: '500', type: 'number' },
                        { key: 'originalPrice', label: 'Original Price (₹)', placeholder: '1499', type: 'number' },
                        { key: 'offerPrice', label: 'Offer Price (₹)', placeholder: '79', type: 'number' },
                        { key: 'thumbnailUrl', label: 'Thumbnail Image URL', placeholder: 'https://...', type: 'text' },
                        { key: 'mockupImageUrl', label: 'Product Mockup Image URL', placeholder: 'https://...', type: 'text' },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="block text-fg-muted text-xs font-600 mb-1 uppercase tracking-wider">{field.label}</label>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={(bundleForm as Record<string, unknown>)[field.key] as string}
                            onChange={(e) => setBundleForm({ ...bundleForm, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value })}
                            className="input-dark w-full rounded-xl px-4 py-3 text-fg text-sm"
                          />
                        </div>
                      ))}
                      <div className="sm:col-span-2">
                        <label className="block text-fg-muted text-xs font-600 mb-1 uppercase tracking-wider">Google Drive Download URL</label>
                        <input type="text" placeholder="https://drive.google.com/drive/folders/..." value={bundleForm.downloadUrl} onChange={(e) => setBundleForm({ ...bundleForm, downloadUrl: e.target.value })} className="input-dark w-full rounded-xl px-4 py-3 text-fg text-sm" />
                        <p className="text-fg-dim text-xs mt-1">Customers will be redirected here after purchase</p>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-fg-muted text-xs font-600 mb-1 uppercase tracking-wider">Short Description</label>
                        <input type="text" placeholder="Brief description shown in cards..." value={bundleForm.shortDescription} onChange={(e) => setBundleForm({ ...bundleForm, shortDescription: e.target.value })} className="input-dark w-full rounded-xl px-4 py-3 text-fg text-sm" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-fg-muted text-xs font-600 mb-1 uppercase tracking-wider">Full Description</label>
                        <textarea rows={3} placeholder="Full bundle description..." value={bundleForm.fullDescription} onChange={(e) => setBundleForm({ ...bundleForm, fullDescription: e.target.value })} className="input-dark w-full rounded-xl px-4 py-3 text-fg text-sm resize-none" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-fg-muted text-xs font-600 mb-1 uppercase tracking-wider">Feature Checklist (one per line)</label>
                        <textarea rows={5} placeholder={'500+ AI Hybrid Readymade Reel Videos\nNo Logo & No Watermark — Post-Ready\nInstant Download Link & Lifetime Access'} value={bundleFeaturesInput} onChange={(e) => setBundleFeaturesInput(e.target.value)} className="input-dark w-full rounded-xl px-4 py-3 text-fg text-sm resize-none" />
                      </div>
                      <div>
                        <label className="block text-fg-muted text-xs font-600 mb-1 uppercase tracking-wider">Status</label>
                        <select value={bundleForm.status} onChange={(e) => setBundleForm({ ...bundleForm, status: e.target.value as 'draft' | 'active' | 'inactive' })} className="input-dark w-full rounded-xl px-4 py-3 text-fg text-sm">
                          <option value="draft">Draft (hidden from website)</option>
                          <option value="active">Active (visible on website)</option>
                          <option value="inactive">Inactive (hidden from website)</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-3 pt-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={bundleForm.isFeatured} onChange={(e) => setBundleForm({ ...bundleForm, isFeatured: e.target.checked })} className="w-4 h-4 accent-yellow-500" />
                          <span className="text-fg-muted text-sm font-600">Featured Bundle (shown in hero)</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button onClick={() => setShowBundleModal(false)} className="flex-1 glass border-gold rounded-xl py-3 text-fg-muted font-700 text-sm hover:text-fg transition-colors">Cancel</button>
                      <button onClick={handleSaveBundle} disabled={bundleSaving || !bundleForm.name || !bundleForm.title} className="flex-1 btn-cta rounded-xl py-3 text-white font-display font-700 text-sm shadow-cta disabled:opacity-50">
                        {bundleSaving ? 'Saving...' : editingBundle ? 'Update Bundle' : 'Create Bundle'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Delete confirm */}
              {bundleDeleteId && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                  <div className="glass rounded-2xl p-6 w-full max-w-sm" style={{ border: '1px solid rgba(239,68,68,0.3)' }}>
                    <h3 className="font-display font-800 text-fg text-lg mb-2">Delete Bundle?</h3>
                    <p className="text-fg-dim text-sm mb-6">This action cannot be undone. The bundle will be permanently removed.</p>
                    <div className="flex gap-3">
                      <button onClick={() => setBundleDeleteId(null)} className="flex-1 glass border-gold rounded-xl py-3 text-fg-muted font-700 text-sm hover:text-fg transition-colors">Cancel</button>
                      <button onClick={() => handleDeleteBundle(bundleDeleteId)} className="flex-1 bg-red-600/80 hover:bg-red-600 rounded-xl py-3 text-white font-display font-700 text-sm transition-colors">Delete</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── CATEGORIES TAB ───────────────────────────────────────────────── */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-800 text-fg text-xl">Category Management</h2>
                  <p className="text-fg-dim text-xs mt-0.5">Only <span className="text-green-400 font-700">Active</span> categories appear on the website.</p>
                </div>
                <button onClick={openAddCategory} className="btn-cta flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-display font-700 text-sm shadow-cta">
                  <Icon name="PlusIcon" size={16} className="text-white" />
                  Add Category
                </button>
              </div>

              {categoriesLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                </div>
              ) : categories.length === 0 ? (
                <div className="glass rounded-2xl p-12 border-gold text-center">
                  <div className="text-4xl mb-3">🎬</div>
                  <p className="text-fg-muted font-display font-700 text-lg mb-1">No categories yet</p>
                  <p className="text-fg-dim text-sm">Create your first category to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {categories.map((cat) => (
                    <div key={cat.id} className="glass rounded-2xl p-5 border-gold card-hover">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-display font-800 text-fg text-base">{cat.name}</h3>
                          <span className="text-accent text-xs font-700">{cat.reelsCount}+ Reels</span>
                        </div>
                        <span className={`text-xs font-700 px-2 py-1 rounded-full ${statusColor(cat.status)}`}>{cat.status.toUpperCase()}</span>
                      </div>
                      <p className="text-fg-dim text-xs mb-3 line-clamp-2">{cat.description || 'No description'}</p>
                      {cat.demoVideoUrl && (
                        <a href={cat.demoVideoUrl} target="_blank" rel="noopener noreferrer" className="text-accent text-xs font-600 hover:underline flex items-center gap-1 mb-3">
                          <Icon name="PlayCircleIcon" size={14} />
                          Demo Video
                        </a>
                      )}
                      <div className="flex gap-2">
                        <button onClick={() => openEditCategory(cat)} className="flex-1 glass border-gold rounded-lg py-2 text-fg-muted text-xs font-600 hover:text-accent transition-colors flex items-center justify-center gap-1.5">
                          <Icon name="PencilIcon" size={12} />
                          Edit
                        </button>
                        <button onClick={() => setCategoryDeleteId(cat.id)} className="glass border-gold rounded-lg px-3 py-2 text-fg-muted hover:text-red-400 transition-colors">
                          <Icon name="TrashIcon" size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Category Modal */}
              {showCategoryModal && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                  <div className="glass rounded-3xl p-6 w-full max-w-lg" style={{ border: '1px solid rgba(201,168,76,0.3)' }}>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-display font-800 text-fg text-xl">{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
                      <button onClick={() => setShowCategoryModal(false)} className="text-fg-dim hover:text-fg"><Icon name="XMarkIcon" size={20} /></button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-fg-muted text-xs font-600 mb-1 uppercase tracking-wider">Category Name *</label>
                        <input type="text" placeholder="AI Creatures" value={categoryForm.name} onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })} className="input-dark w-full rounded-xl px-4 py-3 text-fg text-sm" />
                      </div>
                      <div>
                        <label className="block text-fg-muted text-xs font-600 mb-1 uppercase tracking-wider">Reels Count</label>
                        <input type="number" placeholder="120" value={categoryForm.reelsCount} onChange={(e) => setCategoryForm({ ...categoryForm, reelsCount: Number(e.target.value) })} className="input-dark w-full rounded-xl px-4 py-3 text-fg text-sm" />
                      </div>
                      <div>
                        <label className="block text-fg-muted text-xs font-600 mb-1 uppercase tracking-wider">Demo Video URL</label>
                        <input type="text" placeholder="https://youtube.com/..." value={categoryForm.demoVideoUrl} onChange={(e) => setCategoryForm({ ...categoryForm, demoVideoUrl: e.target.value })} className="input-dark w-full rounded-xl px-4 py-3 text-fg text-sm" />
                      </div>
                      <div>
                        <label className="block text-fg-muted text-xs font-600 mb-1 uppercase tracking-wider">Description</label>
                        <textarea rows={3} placeholder="Describe this category..." value={categoryForm.description} onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })} className="input-dark w-full rounded-xl px-4 py-3 text-fg text-sm resize-none" />
                      </div>
                      <div>
                        <label className="block text-fg-muted text-xs font-600 mb-1 uppercase tracking-wider">Status</label>
                        <select value={categoryForm.status} onChange={(e) => setCategoryForm({ ...categoryForm, status: e.target.value as 'active' | 'inactive' })} className="input-dark w-full rounded-xl px-4 py-3 text-fg text-sm">
                          <option value="active">Active (visible on website)</option>
                          <option value="inactive">Inactive (hidden from website)</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button onClick={() => setShowCategoryModal(false)} className="flex-1 glass border-gold rounded-xl py-3 text-fg-muted font-700 text-sm hover:text-fg transition-colors">Cancel</button>
                      <button onClick={handleSaveCategory} disabled={categorySaving || !categoryForm.name} className="flex-1 btn-cta rounded-xl py-3 text-white font-display font-700 text-sm shadow-cta disabled:opacity-50">
                        {categorySaving ? 'Saving...' : editingCategory ? 'Update Category' : 'Create Category'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Delete confirm */}
              {categoryDeleteId && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                  <div className="glass rounded-2xl p-6 w-full max-w-sm" style={{ border: '1px solid rgba(239,68,68,0.3)' }}>
                    <h3 className="font-display font-800 text-fg text-lg mb-2">Delete Category?</h3>
                    <p className="text-fg-dim text-sm mb-6">This action cannot be undone.</p>
                    <div className="flex gap-3">
                      <button onClick={() => setCategoryDeleteId(null)} className="flex-1 glass border-gold rounded-xl py-3 text-fg-muted font-700 text-sm hover:text-fg transition-colors">Cancel</button>
                      <button onClick={() => handleDeleteCategory(categoryDeleteId)} className="flex-1 bg-red-600/80 hover:bg-red-600 rounded-xl py-3 text-white font-display font-700 text-sm transition-colors">Delete</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── ORDERS TAB ───────────────────────────────────────────────────── */}
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
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="bg-transparent text-fg text-sm outline-none w-32 sm:w-48 placeholder:text-fg-dim"
                    />
                  </div>
                  <button onClick={loadOrders} className="glass border-gold rounded-xl px-4 py-2 text-fg-muted text-xs font-600 hover:text-accent transition-colors flex items-center gap-1.5">
                    <Icon name="ArrowPathIcon" size={14} />
                    Refresh
                  </button>
                </div>
              </div>

              {ordersLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="glass rounded-2xl border-gold overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
                          {['Order ID', 'Customer', 'Bundle', 'Amount', 'Status', 'Date'].map((h) => (
                            <th key={h} className="text-left px-4 py-4 text-fg-dim text-xs font-700 uppercase tracking-wider font-display whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-4 py-12 text-center text-fg-dim text-sm">
                              {orderSearch ? 'No orders match your search.' : 'No orders yet. Orders will appear here after purchases.'}
                            </td>
                          </tr>
                        ) : (
                          filteredOrders.map((order, i) => (
                            <tr key={order.id} className="transition-colors hover:bg-white/[0.02]" style={{ borderBottom: i < filteredOrders.length - 1 ? '1px solid rgba(201,168,76,0.06)' : 'none' }}>
                              <td className="px-4 py-4"><span className="font-mono text-accent text-xs font-700">{order.orderNumber}</span></td>
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-display font-800 text-bg text-xs flex-shrink-0" style={{ background: 'linear-gradient(135deg, #8B1A1A, #C9A84C)' }}>
                                    {order.customerName[0]?.toUpperCase()}
                                  </div>
                                  <div>
                                    <div className="font-display font-600 text-fg text-sm whitespace-nowrap">{order.customerName}</div>
                                    <div className="text-fg-dim text-xs">{order.customerEmail}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4"><span className="text-fg-muted text-sm whitespace-nowrap">{order.bundleName}</span></td>
                              <td className="px-4 py-4"><span className="font-display font-700 text-fg text-sm">₹{order.amount}</span></td>
                              <td className="px-4 py-4">
                                <span className={`inline-flex items-center gap-1 text-xs font-700 px-2.5 py-1 rounded-full ${orderStatusColor(order.status)}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${orderStatusDot(order.status)}`} />
                                  {order.status.toUpperCase()}
                                </span>
                              </td>
                              <td className="px-4 py-4"><span className="text-fg-dim text-xs whitespace-nowrap">{formatDate(order.createdAt)}</span></td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
                    <span className="text-fg-dim text-xs">Showing {filteredOrders.length} of {orders.length} orders</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── SETTINGS TAB ─────────────────────────────────────────────────── */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <h2 className="font-display font-800 text-fg text-xl">Store Settings</h2>
              <div className="glass rounded-2xl p-6 border-gold">
                <h3 className="font-display font-800 text-fg text-lg mb-5 flex items-center gap-2"><span>📦</span> Bundle Download URLs</h3>
                <p className="text-fg-dim text-sm mb-4">Set the Google Drive download URL for each bundle in the Bundles tab. Customers are redirected to this URL after a successful purchase.</p>
                <button onClick={() => setActiveTab('bundles')} className="glass border-gold rounded-xl px-5 py-2.5 text-accent text-sm font-700 hover:bg-accent/10 transition-colors">
                  Go to Bundles →
                </button>
              </div>
              <div className="glass rounded-2xl p-6 border-gold">
                <h3 className="font-display font-800 text-fg text-lg mb-5 flex items-center gap-2"><span>🔒</span> Security &amp; Download Protection</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Order-Protected Download Links', hint: 'Only users with a paid order ID can access download URLs' },
                    { label: 'Order Verification on Download', hint: 'Order status must be "paid" to access download page' },
                    { label: 'Unique Order Numbers', hint: 'Each order gets a unique RS-XXXXXXXX identifier' },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center justify-between py-3 ${i < 2 ? 'border-b border-accent/10' : ''}`}>
                      <div>
                        <div className="font-display font-600 text-fg text-sm">{item.label}</div>
                        <div className="text-fg-dim text-xs mt-0.5">{item.hint}</div>
                      </div>
                      <div className="w-10 h-6 bg-green-500/30 rounded-full border border-green-500/50 flex items-center justify-end px-0.5 cursor-pointer">
                        <div className="w-5 h-5 bg-green-400 rounded-full shadow" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass rounded-2xl p-6 border-gold">
                <h3 className="font-display font-800 text-fg text-lg mb-3 flex items-center gap-2"><span>📊</span> Database Status</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Bundles Table', status: 'Connected' },
                    { label: 'Categories Table', status: 'Connected' },
                    { label: 'Orders Table', status: 'Connected' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <span className="text-fg-muted text-sm">{item.label}</span>
                      <span className="text-green-400 text-xs font-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}