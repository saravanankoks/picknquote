import { ComboPackage, AddOn } from '../types';

export const comboPackages: ComboPackage[] = [
  {
    id: 'starter-success',
    name: 'Starter Success Combo',
    description: 'Get online in just 7 days — your digital presence starts here!',
    target: 'New businesses getting online',
    price: 34999,
    originalPrice: 42999,
    discount: 19,
    includes: [
      'Basic Website Package',
      'Google My Business setup',
      'Business email setup (Zoho/Gmail)',
      'WhatsApp chat integration',
      'Basic SEO (3 keywords)',
      'Free SSL + Domain for 1 year'
    ],
    icon: '🔗',
    popular: false
  },
  {
    id: 'digital-essentials',
    name: 'Digital Essentials Combo',
    description: 'Cover the must-haves of digital business in one smart package.',
    target: 'Small business owners and service providers',
    price: 49999,
    originalPrice: 59999,
    discount: 17,
    includes: [
      'Standard website (6–7 pages)',
      'WhatsApp + Live Chat',
      'Blog setup',
      'Google Analytics + Search Console',
      '1-month AMC',
      '3 social media creatives'
    ],
    icon: '⚙️',
    popular: true
  },
  {
    id: 'ecommerce-starter',
    name: 'E-Commerce Starter Combo',
    description: 'Launch your online store and start selling in days — zero tech hassle.',
    target: 'Product sellers wanting a store online',
    price: 64999,
    originalPrice: 79999,
    discount: 19,
    includes: [
      'E-commerce Website (WooCommerce, up to 200 products)',
      'Razorpay/Cashfree Payment Gateway',
      'WhatsApp Cart Integration',
      'Inventory system setup',
      '1-month AMC'
    ],
    icon: '💰',
    popular: false
  },
  {
    id: 'growth-pro',
    name: 'Growth Pro Combo',
    description: 'Built for scaling — smart tech, faster lead capture, better brand visibility.',
    target: 'Businesses scaling up marketing',
    price: 89999,
    originalPrice: 109999,
    discount: 18,
    includes: [
      'Premium Website (10 pages, blog, service areas)',
      'PWA (Progressive Web App)',
      'Bulk WhatsApp Messaging Setup (6 Months)',
      'Lead Generation Form + WhatsApp automation',
      '3 Blog articles + SEO setup',
      'Google My Business',
      '2 months AMC'
    ],
    icon: '🚀',
    popular: false
  }
];

export const addOns: AddOn[] = [
  {
    id: 'whatsapp-bulk-setup',
    name: 'WhatsApp Bulk Messaging Setup',
    description: 'Setup + Campaign Setup',
    price: 1500,
    category: 'messaging'
  },
  {
    id: 'gmb-setup',
    name: 'Google My Business Setup',
    description: 'Full profile setup + optimization + image uploads',
    price: 1000,
    category: 'seo'
  },
  {
    id: 'amc-monthly',
    name: 'Annual Maintenance Contract (Monthly)',
    description: 'Ongoing updates, backup, minor edits',
    price: 5000,
    category: 'maintenance'
  },
  {
    id: 'amc-yearly',
    name: 'Annual Maintenance Contract (Yearly)',
    description: 'Ongoing updates, backup, minor edits - Save 58%!',
    price: 25000,
    originalPrice: 60000,
    category: 'maintenance'
  },
  {
    id: 'analytics-setup',
    name: 'Google Analytics Setup',
    description: 'Setup + dashboard configuration',
    price: 1000,
    category: 'analytics'
  },
  {
    id: 'pwa-setup',
    name: 'Progressive Web App (PWA)',
    description: 'Website installable like an app',
    price: 500,
    category: 'development'
  }
];

export const freeAddOns = [
  'Speed Optimization',
  'Google Maps Location Embed',
  'Social Media Account Creation',
  'WhatsApp Integration'
];