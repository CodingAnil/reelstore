import { createClient } from '@/lib/supabase/client';

export interface Bundle {
  id: string;
  name: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  thumbnailUrl: string;
  mockupImageUrl: string;
  originalPrice: number;
  offerPrice: number;
  reelsCount: number;
  category: string;
  features: string[];
  status: 'draft' | 'active' | 'inactive';
  isFeatured: boolean;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  reelsCount: number;
  demoVideoUrl: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bundleId: string | null;
  bundleName: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentId: string | null;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  razorpaySignature: string | null;
  downloadUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BundleSalesStats {
  bundleId: string | null;
  bundleName: string;
  totalSales: number;
  totalRevenue: number;
}

function mapBundle(row: Record<string, unknown>): Bundle {
  return {
    id: row.id as string,
    name: row.name as string,
    title: row.title as string,
    shortDescription: (row.short_description as string) || '',
    fullDescription: (row.full_description as string) || '',
    thumbnailUrl: (row.thumbnail_url as string) || '',
    mockupImageUrl: (row.mockup_image_url as string) || '',
    originalPrice: Number(row.original_price) || 0,
    offerPrice: Number(row.offer_price) || 0,
    reelsCount: Number(row.reels_count) || 0,
    category: (row.category as string) || '',
    features: Array.isArray(row.features) ? (row.features as string[]) : [],
    status: (row.status as 'draft' | 'active' | 'inactive') || 'draft',
    isFeatured: Boolean(row.is_featured),
    downloadUrl: (row.download_url as string) || '',
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function mapCategory(row: Record<string, unknown>): Category {
  return {
    id: row.id as string,
    name: row.name as string,
    reelsCount: Number(row.reels_count) || 0,
    demoVideoUrl: (row.demo_video_url as string) || '',
    description: (row.description as string) || '',
    status: (row.status as 'active' | 'inactive') || 'active',
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function mapOrder(row: Record<string, unknown>): Order {
  return {
    id: row.id as string,
    orderNumber: (row.order_number as string) || '',
    customerName: (row.customer_name as string) || '',
    customerEmail: (row.customer_email as string) || '',
    customerPhone: (row.customer_phone as string) || '',
    bundleId: (row.bundle_id as string) || null,
    bundleName: (row.bundle_name as string) || '',
    amount: Number(row.amount) || 0,
    currency: (row.currency as string) || 'INR',
    status: (row.status as 'pending' | 'paid' | 'failed' | 'refunded') || 'pending',
    paymentId: (row.payment_id as string) || null,
    razorpayOrderId: (row.razorpay_order_id as string) || null,
    razorpayPaymentId: (row.razorpay_payment_id as string) || null,
    razorpaySignature: (row.razorpay_signature as string) || null,
    downloadUrl: (row.download_url as string) || null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

// ─── BUNDLE SERVICE ────────────────────────────────────────────────────────────

export const bundleService = {
  async getActiveBundles(): Promise<Bundle[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('bundles')
      .select('*')
      .eq('status', 'active')
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching active bundles:', error.message);
      return [];
    }
    return (data || []).map((row) => mapBundle(row as Record<string, unknown>));
  },

  async getFeaturedBundle(): Promise<Bundle | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('bundles')
      .select('*')
      .eq('status', 'active')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching featured bundle:', error.message);
      return null;
    }
    return data ? mapBundle(data as Record<string, unknown>) : null;
  },

  async getBundleById(id: string): Promise<Bundle | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('bundles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching bundle by id:', error.message);
      return null;
    }
    return data ? mapBundle(data as Record<string, unknown>) : null;
  },

  async getAllBundles(): Promise<Bundle[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('bundles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all bundles:', error.message);
      return [];
    }
    return (data || []).map((row) => mapBundle(row as Record<string, unknown>));
  },

  async createBundle(bundle: Omit<Bundle, 'id' | 'createdAt' | 'updatedAt'>): Promise<Bundle | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('bundles')
      .insert({
        name: bundle.name,
        title: bundle.title,
        short_description: bundle.shortDescription,
        full_description: bundle.fullDescription,
        thumbnail_url: bundle.thumbnailUrl,
        mockup_image_url: bundle.mockupImageUrl,
        original_price: bundle.originalPrice,
        offer_price: bundle.offerPrice,
        reels_count: bundle.reelsCount,
        category: bundle.category,
        features: bundle.features,
        status: bundle.status,
        is_featured: bundle.isFeatured,
        download_url: bundle.downloadUrl,
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error creating bundle:', error.message);
      return null;
    }
    return data ? mapBundle(data as Record<string, unknown>) : null;
  },

  async updateBundle(id: string, bundle: Partial<Omit<Bundle, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Bundle | null> {
    const supabase = createClient();
    const updateData: Record<string, unknown> = {};
    if (bundle.name !== undefined) updateData.name = bundle.name;
    if (bundle.title !== undefined) updateData.title = bundle.title;
    if (bundle.shortDescription !== undefined) updateData.short_description = bundle.shortDescription;
    if (bundle.fullDescription !== undefined) updateData.full_description = bundle.fullDescription;
    if (bundle.thumbnailUrl !== undefined) updateData.thumbnail_url = bundle.thumbnailUrl;
    if (bundle.mockupImageUrl !== undefined) updateData.mockup_image_url = bundle.mockupImageUrl;
    if (bundle.originalPrice !== undefined) updateData.original_price = bundle.originalPrice;
    if (bundle.offerPrice !== undefined) updateData.offer_price = bundle.offerPrice;
    if (bundle.reelsCount !== undefined) updateData.reels_count = bundle.reelsCount;
    if (bundle.category !== undefined) updateData.category = bundle.category;
    if (bundle.features !== undefined) updateData.features = bundle.features;
    if (bundle.status !== undefined) updateData.status = bundle.status;
    if (bundle.isFeatured !== undefined) updateData.is_featured = bundle.isFeatured;
    if (bundle.downloadUrl !== undefined) updateData.download_url = bundle.downloadUrl;

    const { data, error } = await supabase
      .from('bundles')
      .update(updateData)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating bundle:', error.message);
      return null;
    }
    return data ? mapBundle(data as Record<string, unknown>) : null;
  },

  async deleteBundle(id: string): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase.from('bundles').delete().eq('id', id);
    if (error) {
      console.error('Error deleting bundle:', error.message);
      return false;
    }
    return true;
  },
};

// ─── CATEGORY SERVICE ──────────────────────────────────────────────────────────

export const categoryService = {
  async getActiveCategories(): Promise<Category[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching active categories:', error.message);
      return [];
    }
    return (data || []).map((row) => mapCategory(row as Record<string, unknown>));
  },

  async getAllCategories(): Promise<Category[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all categories:', error.message);
      return [];
    }
    return (data || []).map((row) => mapCategory(row as Record<string, unknown>));
  },

  async createCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('categories')
      .insert({
        name: category.name,
        reels_count: category.reelsCount,
        demo_video_url: category.demoVideoUrl,
        description: category.description,
        status: category.status,
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error creating category:', error.message);
      return null;
    }
    return data ? mapCategory(data as Record<string, unknown>) : null;
  },

  async updateCategory(id: string, category: Partial<Omit<Category, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Category | null> {
    const supabase = createClient();
    const updateData: Record<string, unknown> = {};
    if (category.name !== undefined) updateData.name = category.name;
    if (category.reelsCount !== undefined) updateData.reels_count = category.reelsCount;
    if (category.demoVideoUrl !== undefined) updateData.demo_video_url = category.demoVideoUrl;
    if (category.description !== undefined) updateData.description = category.description;
    if (category.status !== undefined) updateData.status = category.status;

    const { data, error } = await supabase
      .from('categories')
      .update(updateData)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating category:', error.message);
      return null;
    }
    return data ? mapCategory(data as Record<string, unknown>) : null;
  },

  async deleteCategory(id: string): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      console.error('Error deleting category:', error.message);
      return false;
    }
    return true;
  },
};

// ─── ORDER SERVICE ─────────────────────────────────────────────────────────────

export const orderService = {
  generateOrderNumber(): string {
    return `RS-${Date.now().toString().slice(-8)}`;
  },

  async createOrder(order: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    bundleId: string;
    bundleName: string;
    amount: number;
    downloadUrl: string;
  }): Promise<Order | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('orders')
      .insert({
        order_number: orderService.generateOrderNumber(),
        customer_name: order.customerName,
        customer_email: order.customerEmail,
        customer_phone: order.customerPhone,
        bundle_id: order.bundleId,
        bundle_name: order.bundleName,
        amount: order.amount,
        currency: 'INR',
        status: 'pending',
        download_url: order.downloadUrl,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error.message);
      return null;
    }
    return mapOrder(data as Record<string, unknown>);
  },

  async markOrderPaid(orderId: string, paymentId?: string): Promise<Order | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('orders')
      .update({
        status: 'paid',
        payment_id: paymentId || `PAY-${Date.now()}`,
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      console.error('Error marking order paid:', error.message);
      return null;
    }
    return mapOrder(data as Record<string, unknown>);
  },

  async getOrderById(orderId: string): Promise<Order | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching order:', error.message);
      return null;
    }
    return data ? mapOrder(data as Record<string, unknown>) : null;
  },

  async getOrderByNumber(orderNumber: string): Promise<Order | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber)
      .maybeSingle();

    if (error) {
      console.error('Error fetching order by number:', error.message);
      return null;
    }
    return data ? mapOrder(data as Record<string, unknown>) : null;
  },

  async getAllOrders(): Promise<Order[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all orders:', error.message);
      return [];
    }
    return (data || []).map((row) => mapOrder(row as Record<string, unknown>));
  },

  async markOrderFailed(orderId: string): Promise<Order | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'failed' })
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      console.error('Error marking order failed:', error.message);
      return null;
    }
    return mapOrder(data as Record<string, unknown>);
  },

  async getOrderStats(): Promise<{
    totalRevenue: number;
    totalOrders: number;
    paidOrders: number;
    failedOrders: number;
    pendingOrders: number;
    bundleSales: BundleSalesStats[];
  }> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('orders')
      .select('amount, status, bundle_id, bundle_name');

    if (error) {
      console.error('Error fetching order stats:', error.message);
      return { totalRevenue: 0, totalOrders: 0, paidOrders: 0, failedOrders: 0, pendingOrders: 0, bundleSales: [] };
    }

    const orders = data || [];
    const paid = orders.filter((o) => o.status === 'paid');

    // ── Bundle-wise sales (verified payments only) ──────────────────────────
    const bundleMap = new Map<string, BundleSalesStats>();
    paid.forEach((o) => {
      const key = (o.bundle_id as string) || 'unknown';
      const existing = bundleMap.get(key);
      if (existing) {
        existing.totalSales += 1;
        existing.totalRevenue += Number(o.amount);
      } else {
        bundleMap.set(key, {
          bundleId: (o.bundle_id as string) || null,
          bundleName: (o.bundle_name as string) || 'Unknown Bundle',
          totalSales: 1,
          totalRevenue: Number(o.amount),
        });
      }
    });

    return {
      totalRevenue: paid.reduce((sum, o) => sum + Number(o.amount), 0),
      totalOrders: orders.length,
      paidOrders: paid.length,
      failedOrders: orders.filter((o) => o.status === 'failed').length,
      pendingOrders: orders.filter((o) => o.status === 'pending').length,
      bundleSales: Array.from(bundleMap.values()).sort((a, b) => b.totalRevenue - a.totalRevenue),
    };
  },
};
