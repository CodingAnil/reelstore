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
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating bundle:', error.message);
      return null;
    }
    return mapBundle(data as Record<string, unknown>);
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

    const { data, error } = await supabase
      .from('bundles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating bundle:', error.message);
      return null;
    }
    return mapBundle(data as Record<string, unknown>);
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
      .single();

    if (error) {
      console.error('Error creating category:', error.message);
      return null;
    }
    return mapCategory(data as Record<string, unknown>);
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
      .single();

    if (error) {
      console.error('Error updating category:', error.message);
      return null;
    }
    return mapCategory(data as Record<string, unknown>);
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
