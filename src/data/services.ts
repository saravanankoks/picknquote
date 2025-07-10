import { ServiceCategory } from '../types';

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'combo-packages',
    name: 'Combo Packages (Recommended)',
    services: []
  }, 
  {
    id: 'seo',
    name: 'SEO Services',
    services: [
      { 
        id: 'seo-basic', 
        name: 'Basic SEO Package', 
        price: 19999, 
        description: 'Complete basic SEO package with essential features',
        tooltip: 'Includes keyword research, on-page optimization, and basic link building to improve your search rankings.'
      },
      { 
        id: 'seo-standard', 
        name: 'Standard SEO Package', 
        price: 29999, 
        description: 'Complete standard SEO package with advanced features',
        tooltip: 'Advanced SEO with competitor analysis, content optimization, and monthly reporting for better visibility.'
      },
      { 
        id: 'seo-premium', 
        name: 'Premium SEO Package', 
        price: 39999, 
        description: 'Complete premium SEO package with all features',
        tooltip: 'Comprehensive SEO solution with technical audits, advanced link building, and dedicated account management.'
      },
      { 
        id: 'seo-custom', 
        name: 'Custom SEO Package', 
        price: 0, 
        description: 'Build your own SEO package with individual features',
        tooltip: 'Create a personalized SEO package by selecting only the features you need for your business.'
      }
    ]
  },
  {
    id: 'website',
    name: 'Website Development',
    services: [
      { 
        id: 'website-basic', 
        name: 'Basic Website', 
        price: 24999, 
        description: '5-page responsive website with modern design',
        sampleUrl: 'https://getstarted.themadrasmarketeer.com/website/',
        tooltip: 'Professional 5-page website with responsive design, contact forms, and basic SEO optimization.'
      },
      { 
        id: 'website-standard', 
        name: 'Standard Website', 
        price: 44999, 
        description: '10-page website with CMS and advanced features',
        sampleUrl: 'https://getstarted.themadrasmarketeer.com/standard-websites/',
        tooltip: 'Feature-rich website with content management system, blog functionality, and advanced integrations.'
      },
      { 
        id: 'website-premium', 
        name: 'Premium Website', 
        price: 74999, 
        description: 'Full-featured website with e-commerce capabilities',
        sampleUrl: 'https://getstarted.themadrasmarketeer.com/premium/',
        tooltip: 'Complete e-commerce solution with payment gateways, inventory management, and customer portal.'
      },
      { 
        id: 'website-vip', 
        name: 'VIP Website', 
        price: 99999, 
        description: 'Enterprise-level custom web application',
        sampleUrl: 'https://getstarted.themadrasmarketeer.com/super-premium/',
        tooltip: 'Custom enterprise web application with advanced features, API integrations, and scalable architecture.'
      }
    ]
  },
  {
    id: 'web-applications',
    name: 'Web/Mobile Applications',
    services: [
      { 
        id: 'webapp-simple', 
        name: 'Simple Web Application', 
        price: 0, 
        description: 'Basic web applications with standard features',
        tooltip: 'Simple web applications for basic business needs. Our team will contact you within 48 hours with detailed requirements and pricing.',
        requiresForm: true
      },
      { 
        id: 'webapp-complex', 
        name: 'Complex Web Application', 
        price: 0, 
        description: 'Advanced web applications with custom features',
        tooltip: 'Complex web applications with advanced functionality, integrations, and custom features. Our team will contact you within 48 hours with detailed requirements and pricing.',
        requiresForm: true
      },
      { 
        id: 'mobile-app', 
        name: 'Mobile Application', 
        price: 0, 
        description: 'Native or hybrid mobile applications',
        tooltip: 'Custom mobile applications for iOS and Android platforms. Our team will contact you within 48 hours with detailed requirements and pricing.',
        requiresForm: true
      }
    ]
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Suite',
    services: [
      { 
        id: 'whatsapp-yearly-starter', 
        name: 'Yearly Starter Plan', 
        price: 4999, 
        description: '20,000 messages/year with basic features',
        tooltip: 'Perfect for small businesses with text-only messaging and email support.'
      },
      { 
        id: 'whatsapp-yearly-standard', 
        name: 'Yearly Standard Plan', 
        price: 9999, 
        description: '40,000 messages/year with advanced features',
        tooltip: 'Ideal for growing businesses with image support, lead forms, and WhatsApp support.'
      },
      { 
        id: 'whatsapp-yearly-premium', 
        name: 'Yearly Premium Plan', 
        price: 14999, 
        description: '80,000 messages/year with all features',
        tooltip: 'Enterprise-grade solution with document support, Google Sheets integration, and priority support.'
      },
      { 
        id: 'whatsapp-cost-per-message', 
        name: 'Cost Per Message Plans', 
        price: 0, 
        description: 'Pay based on message volume (₹0.22-₹0.30 per message)',
        tooltip: 'Flexible pricing based on actual usage with various volume tiers and features.'
      },
      { 
        id: 'whatsapp-custom', 
        name: 'Custom WhatsApp Suite', 
        price: 0, 
        description: 'Build your own package with custom features',
        tooltip: 'Create a personalized WhatsApp solution by selecting individual features and add-ons.'
      }
    ]
  },
  {
    id: 'creative',
    name: 'Creative Posters',
    services: [
      { 
        id: 'poster-creative', 
        name: 'Creative Posters', 
        price: 650, 
        description: 'High-quality creative poster design',
        sampleUrl: 'https://getstarted.themadrasmarketeer.com/creative-posters-videos/',
        tooltip: 'Professional creative posters with custom graphics, brand elements, and high-resolution output for marketing campaigns.'
      },
      { 
        id: 'poster-normal', 
        name: 'Normal Posters', 
        price: 400, 
        description: 'Standard poster design',
        tooltip: 'Standard poster designs with basic graphics and text layouts for everyday promotional needs.'
      },
      { 
        id: 'logo-design', 
        name: 'Logo Design', 
        price: 7000, 
        description: 'Professional logo design with multiple concepts',
        sampleUrl: 'https://getstarted.themadrasmarketeer.com/logo-design-samples/',
        tooltip: 'Custom logo design with 3 initial concepts, unlimited revisions, and final files in all formats (PNG, JPG, SVG, AI).'
      }
    ]
  },
  {
    id: 'presentation',
    name: 'Presentation Services',
    services: [
      { 
        id: 'ppt-business', 
        name: 'Business Presentation', 
        price: 500, 
        description: 'Professional business presentation (₹500/slide)',
        sampleUrl: 'https://business-presentation-demo.netlify.app',
        tooltip: 'Professional business presentations with corporate design, charts, and infographics to impress your audience.'
      },
      { 
        id: 'ppt-advanced', 
        name: 'Advanced Business Presentation', 
        price: 1000, 
        description: 'Premium business presentation (₹1000/slide for first 20)',
        sampleUrl: 'https://advanced-presentation-demo.netlify.app',
        tooltip: 'Premium presentations with animations, interactive elements, and advanced visual effects for high-impact delivery.'
      }
    ]
  },
  {
    id: 'portfolio',
    name: 'Portfolio Development',
    services: [
      { 
        id: 'portfolio-personal', 
        name: 'Personal Portfolio', 
        price: 15000, 
        description: 'Professional portfolio website',
        tooltip: 'Showcase your skills and achievements with a stunning personal portfolio website that stands out to employers.'
      },
      { 
        id: 'portfolio-creative', 
        name: 'Creative Portfolio', 
        price: 18000, 
        description: 'Artist/designer portfolio',
        tooltip: 'Visually striking portfolio for artists and designers with gallery features and interactive showcases.'
      },
      { 
        id: 'portfolio-business', 
        name: 'Business Portfolio', 
        price: 22000, 
        description: 'Company showcase website',
        tooltip: 'Professional company portfolio highlighting your services, team, and success stories to attract clients.'
      },
      { 
        id: 'portfolio-maintenance', 
        name: 'Portfolio Maintenance', 
        price: 2000, 
        description: 'Monthly updates and maintenance',
        tooltip: 'Keep your portfolio fresh with monthly content updates, security patches, and performance optimization.'
      }
    ]
  },
  {
    id: 'video',
    name: 'Video Generation',
    services: [
      { 
        id: 'video-promo', 
        name: 'Promotional Video', 
        price: 5000, 
        description: '2-3 minute promotional video',
        tooltip: 'Engaging promotional videos with professional editing, music, and graphics to showcase your products or services.'
      },
      { 
        id: 'video-explainer', 
        name: 'Explanatory Video', 
        price: 8000, 
        description: '3-4 minute video with audio & subtitles',
        tooltip: 'Detailed explainer videos with voiceover, subtitles, and animations to educate your audience about complex topics.'
      },
      { 
        id: 'video-social', 
        name: 'Social Media Reels', 
        price: 1500, 
        description: 'Short social media video content',
        tooltip: 'Trendy social media reels optimized for Instagram, Facebook, and YouTube Shorts to boost engagement.'
      }
    ]
  },
  {
    id: 'social-media',
    name: 'Social Media Management',
    services: [
      { 
        id: 'social-standard', 
        name: 'Standard Package', 
        price: 30000, 
        description: '12 posts, 10 stories, 4 reels with full management',
        tooltip: 'Complete social media management with content creation, posting schedule, and engagement monitoring.'
      },
      { 
        id: 'social-premium', 
        name: 'Premium Package', 
        price: 50000, 
        description: '20 posts, 20 stories, 8 reels with full management',
        tooltip: 'Premium social media management with increased content volume, advanced analytics, and priority support.'
      },
      { 
        id: 'social-custom', 
        name: 'Custom Package', 
        price: 0, 
        description: 'Build your own social media package',
        tooltip: 'Create a personalized social media package by selecting individual services without profile management.'
      }
    ]
  },
  {
    id: 'production-shoot',
    name: 'Production Shoot',
    services: [
      { 
        id: 'photoshoot', 
        name: 'Photoshoot', 
        price: 0, 
        description: 'Professional photography services',
        tooltip: 'Professional photoshoot services with different packages available. Select to see package options.'
      },
      { 
        id: 'video-shoot', 
        name: 'Video Shoot', 
        price: 0, 
        description: 'Professional video production',
        tooltip: 'Professional video shoot services with different packages available. Select to see package options.'
      },
      { 
        id: 'product-shoot', 
        name: 'Product Shoot', 
        price: 0, 
        description: 'Product photography and videography',
        tooltip: 'Specialized product photography and videography for e-commerce and marketing materials.'
      },
      { 
        id: 'promo-shoot', 
        name: 'Promo Shoot', 
        price: 0, 
        description: 'Promotional content creation',
        tooltip: 'Promotional photo and video shoots for marketing campaigns and brand awareness.'
      },
      { 
        id: 'interior-exterior', 
        name: 'Interior/Exterior Shoot', 
        price: 0, 
        description: 'Architectural and space photography',
        tooltip: 'Professional interior and exterior photography for real estate, hospitality, and architectural projects.'
      },
      { 
        id: 'pitch-deck-video', 
        name: 'Pitch Deck Video', 
        price: 0, 
        description: 'Professional pitch presentation videos',
        tooltip: 'High-quality pitch deck videos for investors, clients, and business presentations.'
      },
      { 
        id: 'social-reels-shoot', 
        name: 'Social Media Reels Shoot', 
        price: 0, 
        description: 'Social media content creation',
        tooltip: 'Professional social media reels and content creation for Instagram, TikTok, and other platforms.'
      }
    ]
  },
  {
    id: 'lead-generation',
    name: 'Lead Generation',
    services: [
      { 
        id: 'google-ads', 
        name: 'Google Ads Package', 
        price: 20000, 
        description: '₹20,000 + ad spend (Creatives included)',
        tooltip: 'Complete Google Ads management with keyword research, ad creation, optimization, and monthly reporting.'
      },
      { 
        id: 'meta-ads', 
        name: 'Meta Ads Package', 
        price: 15000, 
        description: '₹15,000 + ad spend (Creatives included)',
        tooltip: 'Facebook and Instagram ads management with audience targeting, creative design, and performance optimization.'
      },
      { 
        id: 'whatsapp-campaign', 
        name: 'WhatsApp Campaign', 
        price: 5000, 
        description: '₹5,000/month (Creatives included)',
        tooltip: 'WhatsApp marketing campaigns with message templates, automation, and lead nurturing sequences.'
      },
      { 
        id: 'linkedin-campaign', 
        name: 'LinkedIn Campaign', 
        price: 25000, 
        description: '₹25,000 + ad spend (Creatives included)',
        tooltip: 'LinkedIn advertising for B2B lead generation with professional targeting and content creation.'
      },
      { 
        id: 'lead-combo', 
        name: 'All Platforms Combo', 
        price: 35000, 
        description: '₹35,000 + ad spend (All platforms + creatives)',
        tooltip: 'Complete multi-platform lead generation across Google, Meta, WhatsApp, and LinkedIn with unified strategy.'
      }
    ]
  }
];