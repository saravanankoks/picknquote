import { SEOFeature } from '../types';

export const seoFeatures: SEOFeature[] = [
  {
    id: 'pages-optimize',
    name: 'Pages to Optimize',
    options: {
      basic: { price: 2500, description: '5 pages' },
      standard: { price: 5000, description: '10 pages' },
      premium: { price: 7500, description: '15 pages' }
    }
  },
  {
    id: 'image-optimization',
    name: 'Image Optimization',
    options: {
      basic: { price: 300, description: '10 images' },
      standard: { price: 600, description: '25 images' },
      premium: { price: 1000, description: '50 images' }
    }
  },
  {
    id: 'onpage-seo',
    name: 'On-Page SEO (Setup)',
    options: {
      basic: { price: 2500, description: 'Basic setup' },
      standard: { price: 4000, description: 'Standard setup' },
      premium: { price: 6000, description: 'Premium setup' }
    }
  },
  {
    id: 'blog-optimization',
    name: 'Blog Optimization',
    options: {
      basic: { price: 500, description: '1 blog' },
      standard: { price: 1000, description: '2 blogs' },
      premium: { price: 2000, description: '4 blogs' }
    }
  },
  {
    id: 'blog-writing-seo',
    name: 'Blog Writing + SEO',
    options: {
      standard: { price: 1500, description: '1 blog' },
      premium: { price: 3000, description: '2 blogs' }
    }
  },
  {
    id: 'keyword-research',
    name: 'Keyword Research',
    options: {
      basic: { price: 500, description: '5 keywords' },
      standard: { price: 800, description: '10 keywords' },
      premium: { price: 1500, description: '20 keywords' }
    }
  },
  {
    id: 'competitor-analysis',
    name: 'Competitor Analysis',
    options: {
      standard: { price: 500, description: '1 competitor' },
      premium: { price: 1000, description: '3 competitors' }
    }
  },
  {
    id: 'google-business-optimization',
    name: 'Google Business Optimization',
    options: {
      basic: { price: 1000, description: 'Setup only' },
      standard: { price: 1500, description: 'Monthly boost' },
      premium: { price: 2500, description: 'Boost + reviews' }
    }
  },
  {
    id: 'backlink-building-basic',
    name: 'Backlink Building (Basic)',
    options: {
      basic: { price: 1000, description: '10 links' },
      standard: { price: 2000, description: '20 links' },
      premium: { price: 3000, description: '40 links' }
    }
  },
  {
    id: 'backlink-building-advanced',
    name: 'Backlink Building (Advanced)',
    options: {
      premium: { price: 2500, description: '10 high-DA' }
    }
  },
  {
    id: 'forum-posting',
    name: 'Forum Posting',
    options: {
      basic: { price: 500, description: '5 posts' },
      standard: { price: 800, description: '10 posts' },
      premium: { price: 1200, description: '20 posts' }
    }
  },
  {
    id: 'social-bookmarking',
    name: 'Social Bookmarking',
    options: {
      basic: { price: 500, description: '10 bookmarks' },
      standard: { price: 900, description: '20 bookmarks' },
      premium: { price: 1200, description: '30 bookmarks' }
    }
  },
  {
    id: 'technical-seo-audit',
    name: 'Technical SEO Audit',
    options: {
      basic: { price: 1000, description: 'Basic audit' },
      standard: { price: 1500, description: 'Full report' },
      premium: { price: 2500, description: 'With fixes' }
    }
  },
  {
    id: 'schema-markup',
    name: 'Schema Markup',
    options: {
      basic: { price: 800, description: '1 type' },
      standard: { price: 1200, description: '2 types' },
      premium: { price: 2200, description: '5 types' }
    }
  },
  {
    id: 'robots-sitemap',
    name: 'Robots.txt & Sitemap',
    options: {
      basic: { price: 500, description: 'Basic' },
      standard: { price: 800, description: 'Advanced' },
      premium: { price: 1200, description: 'Dynamic' }
    }
  },
  {
    id: 'search-console-setup',
    name: 'Search Console Setup',
    options: {
      basic: { price: 800, description: 'Setup' },
      standard: { price: 1000, description: '+Insights' },
      premium: { price: 1500, description: 'Monitoring' }
    }
  },
  {
    id: 'speed-optimization',
    name: 'Speed Optimization',
    options: {
      basic: { price: 500, description: 'Report only' },
      standard: { price: 800, description: 'W/ suggestions' },
      premium: { price: 1500, description: 'With fix' }
    }
  },
  {
    id: 'seo-reporting',
    name: 'SEO Reporting',
    options: {
      basic: { price: 1000, description: 'Monthly' },
      standard: { price: 1200, description: 'Monthly + GSC' },
      premium: { price: 2500, description: 'Weekly + dash' }
    }
  },
  {
    id: 'local-citations',
    name: 'Local Citations',
    options: {
      basic: { price: 700, description: '5 listings' },
      standard: { price: 1200, description: '10 listings' },
      premium: { price: 2000, description: '20 listings' }
    }
  },
  {
    id: 'content-strategy-plan',
    name: 'Content Strategy Plan',
    options: {
      standard: { price: 1500, description: 'Monthly' },
      premium: { price: 3000, description: 'Quarterly' }
    }
  },
  {
    id: 'review-management',
    name: 'Review Management (GMB)',
    options: {
      standard: { price: 1200, description: 'Monthly' },
      premium: { price: 2000, description: 'Weekly' }
    }
  }
];

export const seoPackages = {
  basic: { name: 'Basic', price: 21999 },
  standard: { name: 'Standard', price: 30999 },
  premium: { name: 'Premium', price: 39999 }
};