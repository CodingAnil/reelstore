/**
 * Static dummy categories for the homepage "Assets Categories" section (no API).
 */

export type HomepageAssetCategory = {
  id: string;
  name: string;
  shortDescription: string;
  /** Remote placeholder (Unsplash — allowed in image-hosts.config.js) */
  imageUrl: string;
};

export const ASSET_CATEGORIES_STATIC: HomepageAssetCategory[] = [
  {
    id: 'ai-creatures',
    name: 'AI Creatures',
    shortDescription: 'Surreal animals and fantasy beings built for viral short-form hooks.',
    imageUrl:
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'cyberpunk-cities',
    name: 'Cyberpunk Cities',
    shortDescription: 'Neon skylines and rainy streets perfect for high-energy edits.',
    imageUrl:
      'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'motivation-reels',
    name: 'Motivation Reels',
    shortDescription: 'Quotes and grit visuals that stop the scroll in the first second.',
    imageUrl:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'business-ads',
    name: 'Business Ads',
    shortDescription: 'Clean B-roll and office aesthetics for promos and lead magnets.',
    imageUrl:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'fitness-content',
    name: 'Fitness Content',
    shortDescription: 'Gym energy, motion, and transformation-friendly clips.',
    imageUrl:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'travel-clips',
    name: 'Travel Clips',
    shortDescription: 'Wanderlust shots from coasts to peaks for escape-style reels.',
    imageUrl:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'luxury-lifestyle',
    name: 'Luxury Lifestyle',
    shortDescription: 'Premium cars, interiors, and gold-hour glamour moments.',
    imageUrl:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'meme-content',
    name: 'Meme Content',
    shortDescription: 'Trend-ready reactions and comedic timing templates.',
    imageUrl:
      'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'educational-reels',
    name: 'Educational Reels',
    shortDescription: 'Explainers and listicles that teach fast without feeling dry.',
    imageUrl:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'food-cooking',
    name: 'Food & Cooking',
    shortDescription: 'Satisfying prep, sizzles, and plating shots for foodtok.',
    imageUrl:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'tech-gadgets',
    name: 'Tech & Gadgets',
    shortDescription: 'Desk setups, unboxings, and futuristic UI moods.',
    imageUrl:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'fashion-beauty',
    name: 'Fashion & Beauty',
    shortDescription: 'Runway-inspired looks and glow-ups for style-forward audiences.',
    imageUrl:
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80&auto=format&fit=crop',
  },
];
