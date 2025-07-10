import React, { useState } from 'react';
import { Search, Facebook, MessageCircle, Linkedin, Youtube, Star, Zap } from 'lucide-react';
import { LeadGenerationSelection } from '../types';

interface LeadGenerationSelectorProps {
  onSelectionChange: (selection: LeadGenerationSelection | null) => void;
}

const LeadGenerationSelector: React.FC<LeadGenerationSelectorProps> = ({ onSelectionChange }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [adSpend, setAdSpend] = useState<number>(10000);
  const [selectedBundle, setSelectedBundle] = useState<string>('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [showAIRecommender, setShowAIRecommender] = useState(false);
  const [aiInputs, setAiInputs] = useState({
    industry: '',
    goal: '',
    budget: ''
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const platforms = [
    {
      id: 'meta',
      name: 'Meta (FB/Instagram)',
      icon: Facebook,
      startingPrice: 3999,
      bestFor: 'B2C, Local Businesses',
      label: 'Most Popular',
      labelColor: 'bg-green-500',
      cplRange: [40, 60],
      color: 'from-blue-500 to-purple-500',
      description: 'Perfect for reaching local customers and B2C audiences with visual content'
    },
    {
      id: 'google',
      name: 'Google Ads',
      icon: Search,
      startingPrice: 6999,
      bestFor: 'High-Intent, Search-Based',
      label: 'High Conversion Potential',
      labelColor: 'bg-orange-500',
      cplRange: [60, 100],
      color: 'from-red-500 to-yellow-500',
      description: 'Capture high-intent customers actively searching for your services'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      startingPrice: 8999,
      bestFor: 'B2B, Professional Leads',
      label: 'Best for B2B',
      labelColor: 'bg-blue-600',
      cplRange: [80, 150],
      color: 'from-blue-600 to-indigo-600',
      description: 'Target professionals and decision-makers for B2B lead generation'
    },
    {
      id: 'youtube',
      name: 'YouTube Ads',
      icon: Youtube,
      startingPrice: 5999,
      bestFor: 'Brand Awareness',
      label: 'Visual Engagement',
      labelColor: 'bg-red-500',
      cplRange: [50, 70],
      color: 'from-red-500 to-pink-500',
      description: 'Engage audiences with video content and build brand awareness'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Lead Ads',
      icon: MessageCircle,
      startingPrice: 4999,
      bestFor: 'Conversational, Fast Leads',
      label: 'Quick Response Campaigns',
      labelColor: 'bg-green-600',
      cplRange: [35, 50],
      color: 'from-green-500 to-emerald-500',
      description: 'Direct conversations with prospects for immediate engagement'
    }
  ];

  const bundledPackages = [
    {
      id: 'starter-leads',
      name: 'Starter Leads',
      platform: 'Meta',
      serviceFee: 3999,
      minAdSpend: 10000,
      description: '1 Ad, Targeted Audience, Simple Lead Form',
      icon: '🚀',
      popular: false
    },
    {
      id: 'growth-funnel',
      name: 'Growth Funnel',
      platform: 'Google Ads',
      serviceFee: 6999,
      minAdSpend: 20000,
      description: '2 Ads, Conversion Landing Page, Geo Targeting',
      icon: '📈',
      popular: true
    },
    {
      id: 'pro-b2b-boost',
      name: 'Pro B2B Boost',
      platform: 'LinkedIn',
      serviceFee: 8999,
      minAdSpend: 20000,
      description: 'Job Title Targeting, Custom Message, Follow-Up Option',
      icon: '💼',
      popular: false
    },
    {
      id: 'insta-yt-combo',
      name: 'Insta+YT Combo',
      platform: 'Meta + YT',
      serviceFee: 7999,
      minAdSpend: 15000,
      description: '1 Video Ad + 1 Carousel, Engagement + Lead Generation',
      icon: '🎬',
      popular: false
    },
    {
      id: 'wa-blaster',
      name: 'WA Blaster',
      platform: 'WhatsApp',
      serviceFee: 4999,
      minAdSpend: 6000,
      description: 'WhatsApp Click-to-Lead Campaign, Direct Conversations',
      icon: '💬',
      popular: false
    }
  ];

  const addOns = [
    { id: 'lead-form', name: 'Lead Form Integration', price: 999, description: 'Website / Landing page forms' },
    { id: 'whatsapp-auto-reply', name: 'WhatsApp Auto-Reply', price: 999, description: 'Setup message template' },
    { id: 'google-sheet-sync', name: 'Google Sheet Sync', price: 999, description: 'Lead sheet automation' },
    { id: 'retargeting-pixel', name: 'Retargeting Pixel Setup', price: 799, description: 'Facebook, Google, LinkedIn pixel integration' },
    { id: 'crm-push', name: 'CRM Push via API', price: 1499, description: 'Zapier, Pabbly, Make integration (Coming Soon)' },
    { id: 'custom-funnel', name: 'Custom Funnel Setup', price: 1999, description: 'Multiple steps + logic with branching flows' }
  ];

  const industryFunnels = [
    {
      id: 'real-estate',
      industry: 'Real Estate',
      goal: 'Get Verified Buyer Leads',
      icon: '🏠',
      color: 'from-blue-500 to-cyan-500',
      flow: ['Facebook Ad', 'Instant WhatsApp Message', 'Lead Saved to Google Sheet'],
      outcome: 'High-volume leads with quick response',
      recommended: 'meta'
    },
    {
      id: 'coaching',
      industry: 'Coaching/Education',
      goal: 'Webinar/Consult Registration',
      icon: '🎓',
      color: 'from-yellow-500 to-orange-500',
      flow: ['Instagram Ad', 'Landing Page Form', 'WhatsApp Reminder'],
      outcome: 'Good for Zoom/Google Meet promotions',
      recommended: 'meta'
    },
    {
      id: 'ecommerce',
      industry: 'E-commerce/Products',
      goal: 'Purchase Intent',
      icon: '🛒',
      color: 'from-green-500 to-emerald-500',
      flow: ['Google Search Ad', 'Product Landing Page', 'WhatsApp CTA'],
      outcome: 'Great for impulse-based shopping',
      recommended: 'google'
    },
    {
      id: 'health-wellness',
      industry: 'Health & Wellness Clinics',
      goal: 'Appointment Booking',
      icon: '🏥',
      color: 'from-red-500 to-pink-500',
      flow: ['FB Carousel Ad', 'WhatsApp Business API', 'CRM / Google Sheet'],
      outcome: 'Warm leads with fast conversions',
      recommended: 'meta'
    },
    {
      id: 'b2b-services',
      industry: 'B2B Services / Consultants',
      goal: 'Professional Leads',
      icon: '💼',
      color: 'from-purple-500 to-indigo-500',
      flow: ['LinkedIn Sponsored Message', 'Lead Form', 'Email Follow-up'],
      outcome: 'Targeted & niche',
      recommended: 'linkedin'
    }
  ];

  const calculateCPL = (platformId: string, spend: number) => {
    const platform = platforms.find(p => p.id === platformId);
    if (!platform) return { min: 0, max: 0 };
    
    // Adjust CPL based on spend (higher spend = better CPL)
    const baseMin = platform.cplRange[0];
    const baseMax = platform.cplRange[1];
    const adjustment = Math.min(spend / 50000, 0.3); // Max 30% improvement
    
    return {
      min: Math.round(baseMin * (1 - adjustment)),
      max: Math.round(baseMax * (1 - adjustment))
    };
  };

  const calculateProjectedLeads = (platformId: string, spend: number) => {
    const cpl = calculateCPL(platformId, spend);
    return {
      min: Math.floor(spend / cpl.max),
      max: Math.floor(spend / cpl.min)
    };
  };

  const calculateCampaignDuration = (spend: number) => {
    // Assuming daily spend of 500-1000
    const dailySpend = Math.max(500, Math.min(1000, spend / 20));
    return Math.ceil(spend / dailySpend);
  };

  const getAIRecommendation = () => {
    const { industry, goal, budget } = aiInputs;
    
    if (!industry || !goal || !budget) return null;

    // Simple rule-based recommendation
    let recommendedPlatform = 'meta';
    let recommendedBundle = 'starter-leads';
    
    if (industry === 'b2b' || goal === 'leads') {
      recommendedPlatform = 'linkedin';
      recommendedBundle = 'pro-b2b-boost';
    } else if (goal === 'awareness') {
      recommendedPlatform = 'youtube';
      recommendedBundle = 'insta-yt-combo';
    } else if (industry === 'ecom') {
      recommendedPlatform = 'google';
      recommendedBundle = 'growth-funnel';
    }

    const platform = platforms.find(p => p.id === recommendedPlatform);
    const budgetNum = parseInt(budget.replace(/[^\d]/g, ''));
    const leads = calculateProjectedLeads(recommendedPlatform, budgetNum);
    const cpl = calculateCPL(recommendedPlatform, budgetNum);

    return {
      platform: platform?.name,
      bundle: recommendedBundle,
      leads: `${leads.min}–${leads.max}`,
      cpl: `₹${cpl.min}–₹${cpl.max}`
    };
  };

  const updateSelection = () => {
    let totalPrice = 0;

    if (selectedPlatform) {
      const platform = platforms.find(p => p.id === selectedPlatform);
      if (platform) {
        totalPrice = platform.startingPrice;
      }
    } else if (selectedBundle) {
      const bundle = bundledPackages.find(b => b.id === selectedBundle);
      if (bundle) {
        totalPrice = bundle.serviceFee;
      }
    }

    // Add add-ons
    selectedAddOns.forEach(addonId => {
      const addon = addOns.find(a => a.id === addonId);
      if (addon) {
        totalPrice += addon.price;
      }
    });

    if (totalPrice > 0) {
      const selection: LeadGenerationSelection = {
        type: selectedPlatform as any || 'custom',
        totalPrice,
        adSpendIncluded: false,
        customConfig: {
          platform: selectedPlatform,
          bundle: selectedBundle,
          adSpend,
          addOns: selectedAddOns
        }
      };
      onSelectionChange(selection);
    } else {
      onSelectionChange(null);
    }
  };

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId);
    setSelectedBundle('');
    setTimeout(updateSelection, 0);
  };

  const handleBundleSelect = (bundleId: string) => {
    setSelectedBundle(bundleId);
    setSelectedPlatform('');
    setTimeout(updateSelection, 0);
  };

  const handleAddOnToggle = (addonId: string) => {
    setSelectedAddOns(prev => {
      const newAddOns = prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId];
      setTimeout(updateSelection, 0);
      return newAddOns;
    });
  };

  React.useEffect(() => {
    updateSelection();
  }, [adSpend]);

  return (
    <div className="glass rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center space-x-3">
        <span className="text-3xl">🎯</span>
        <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
          Enhanced Lead Generation System
        </span>
      </h3>

      {/* AI Campaign Recommender */}
      <div className="mb-8">
        <button
          onClick={() => setShowAIRecommender(!showAIRecommender)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
        >
          <Zap className="w-5 h-5" />
          <span>🤖 AI Campaign Recommender</span>
        </button>

        {showAIRecommender && (
          <div className="mt-4 glass rounded-xl p-6 border border-white/20">
            <h4 className="font-bold text-white mb-4">Get AI-Powered Recommendations</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <select
                value={aiInputs.industry}
                onChange={(e) => setAiInputs(prev => ({ ...prev, industry: e.target.value }))}
                className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white"
              >
                <option value="">Select Industry</option>
                <option value="real-estate">Real Estate</option>
                <option value="education">Education</option>
                <option value="ecom">E-commerce</option>
                <option value="services">Services</option>
                <option value="b2b">B2B</option>
              </select>

              <select
                value={aiInputs.goal}
                onChange={(e) => setAiInputs(prev => ({ ...prev, goal: e.target.value }))}
                className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white"
              >
                <option value="">Select Goal</option>
                <option value="leads">Leads</option>
                <option value="awareness">Awareness</option>
                <option value="engagement">Engagement</option>
              </select>

              <select
                value={aiInputs.budget}
                onChange={(e) => setAiInputs(prev => ({ ...prev, budget: e.target.value }))}
                className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white"
              >
                <option value="">Monthly Budget</option>
                <option value="5k-10k">₹5k–₹10k</option>
                <option value="10k-25k">₹10k–₹25k</option>
                <option value="25k-50k">₹25k–₹50k</option>
                <option value="50k+">₹50k+</option>
              </select>
            </div>

            {getAIRecommendation() && (
              <div className="p-4 bg-purple-500/20 border border-purple-400/30 rounded-xl">
                <h5 className="font-bold text-purple-200 mb-2">🔎 AI Recommendation:</h5>
                <p className="text-purple-200">
                  "We recommend {getAIRecommendation()?.platform} with Lead Form Integration & Auto Replies. 
                  Estimated {getAIRecommendation()?.leads} leads at {getAIRecommendation()?.cpl} per lead."
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Platform Cards */}
      <div className="mb-8">
        <h4 className="text-xl font-bold text-white mb-6">🟣 1. Platform Selection (Interactive Cards)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isSelected = selectedPlatform === platform.id;
            
            return (
              <div
                key={platform.id}
                onClick={() => handlePlatformSelect(platform.id)}
                className={`relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-500/20 transform scale-105'
                    : 'border-white/30 hover:border-white/50 hover:transform hover:scale-102'
                }`}
              >
                {/* Label */}
                <div className={`absolute -top-3 left-4 ${platform.labelColor} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                  {platform.label}
                </div>

                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-3 bg-gradient-to-r ${platform.color} rounded-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-lg">{platform.name}</h5>
                    <p className="text-white/70 text-sm">{platform.bestFor}</p>
                  </div>
                </div>

                <p className="text-white/80 text-sm mb-4">{platform.description}</p>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-yellow-400 font-bold text-lg">
                      {formatCurrency(platform.startingPrice)}*
                    </p>
                    <p className="text-white/60 text-xs">+ Ad Spend</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-sm">CPL Range</p>
                    <p className="text-green-400 font-semibold">₹{platform.cplRange[0]}–₹{platform.cplRange[1]}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-white/60 text-sm mt-4">
          *Platform Service Fee includes: ad setup, creatives (1-2), targeting setup, and integration.
        </p>
      </div>

      {/* Ad Spend Slider */}
      {selectedPlatform && (
        <div className="mb-8">
          <h4 className="text-xl font-bold text-white mb-6">🔵 2. Interactive Ad Spend Slider</h4>
          <div className="glass rounded-xl p-6 border border-white/20">
            <div className="mb-6">
              <label className="block text-white font-semibold mb-4">
                Ad Spend Budget: {formatCurrency(adSpend)}
              </label>
              <input
                type="range"
                min="5000"
                max="100000"
                step="1000"
                value={adSpend}
                onChange={(e) => setAdSpend(parseInt(e.target.value))}
                className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-white/60 text-sm mt-2">
                <span>₹5,000</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Estimates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-500/20 rounded-xl">
                <div className="text-2xl mb-2">💰</div>
                <p className="text-green-200 font-semibold">Estimated Cost per Lead</p>
                <p className="text-green-400 text-xl font-bold">
                  ₹{calculateCPL(selectedPlatform, adSpend).min} – ₹{calculateCPL(selectedPlatform, adSpend).max}
                </p>
              </div>
              
              <div className="text-center p-4 bg-blue-500/20 rounded-xl">
                <div className="text-2xl mb-2">🔢</div>
                <p className="text-blue-200 font-semibold">Projected Leads</p>
                <p className="text-blue-400 text-xl font-bold">
                  {calculateProjectedLeads(selectedPlatform, adSpend).min} – {calculateProjectedLeads(selectedPlatform, adSpend).max}
                </p>
              </div>
              
              <div className="text-center p-4 bg-purple-500/20 rounded-xl">
                <div className="text-2xl mb-2">⏳</div>
                <p className="text-purple-200 font-semibold">Campaign Duration</p>
                <p className="text-purple-400 text-xl font-bold">
                  ~{calculateCampaignDuration(adSpend)} Days
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-400/30 rounded-lg">
              <p className="text-yellow-200 text-sm">
                <strong>Note:</strong> These are approximate estimates based on market standards. 
                Final numbers will be confirmed after detailed requirements analysis.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pre-Built Bundled Packages */}
      <div className="mb-8">
        <h4 className="text-xl font-bold text-white mb-6">🟠 3. Pre-Built Bundled Packages</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bundledPackages.map((bundle) => (
            <div
              key={bundle.id}
              onClick={() => handleBundleSelect(bundle.id)}
              className={`relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                selectedBundle === bundle.id
                  ? 'border-cyan-400 bg-cyan-500/20 transform scale-105'
                  : 'border-white/30 hover:border-white/50'
              }`}
            >
              {bundle.popular && (
                <div className="absolute -top-3 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>Popular</span>
                </div>
              )}

              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{bundle.icon}</div>
                <h5 className="font-bold text-white text-lg">{bundle.name}</h5>
                <p className="text-white/70 text-sm">{bundle.platform}</p>
              </div>

              <p className="text-white/80 text-sm mb-4">{bundle.description}</p>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Service Fee:</span>
                  <span className="text-yellow-400 font-bold">{formatCurrency(bundle.serviceFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Min Ad Spend:</span>
                  <span className="text-white">{formatCurrency(bundle.minAdSpend)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-500/20 border border-blue-400/30 rounded-xl">
          <h5 className="font-bold text-blue-200 mb-2">📦 All Packages Include:</h5>
          <ul className="text-blue-200 text-sm space-y-1">
            <li>• Basic creative (1 static/image or video)</li>
            <li>• Campaign tracking</li>
            <li>• Daily performance overview</li>
            <li>• Service fees vary according to budget</li>
          </ul>
        </div>
      </div>

      {/* Campaign Funnel Visual */}
      <div className="mb-8">
        <h4 className="text-xl font-bold text-white mb-6">🟢 4. Campaign Funnel Visual</h4>
        <div className="glass rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-center space-x-4 mb-6 overflow-x-auto">
            <div className="flex items-center space-x-2 bg-blue-500/20 px-4 py-2 rounded-lg">
              <span className="text-2xl">📢</span>
              <span className="text-white font-medium">Ad</span>
            </div>
            <div className="text-white">→</div>
            <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-lg">
              <span className="text-2xl">🖥️</span>
              <span className="text-white font-medium">Landing Page</span>
            </div>
            <div className="text-white">→</div>
            <div className="flex items-center space-x-2 bg-purple-500/20 px-4 py-2 rounded-lg">
              <span className="text-2xl">📝</span>
              <span className="text-white font-medium">Lead Form</span>
            </div>
            <div className="text-white">→</div>
            <div className="flex items-center space-x-2 bg-yellow-500/20 px-4 py-2 rounded-lg">
              <span className="text-2xl">🤖</span>
              <span className="text-white font-medium">Auto Response</span>
            </div>
            <div className="text-white">→</div>
            <div className="flex items-center space-x-2 bg-orange-500/20 px-4 py-2 rounded-lg">
              <span className="text-2xl">🧾</span>
              <span className="text-white font-medium">Sheet Export</span>
            </div>
          </div>
          
          <div className="p-3 bg-cyan-500/20 border border-cyan-400/30 rounded-lg">
            <p className="text-cyan-200 text-sm">
              <strong>Note:</strong> Landing pages optional for WhatsApp & Meta. 
              Google & LinkedIn need forms or websites.
            </p>
          </div>
        </div>
      </div>

      {/* Industry-Specific Funnels */}
      <div className="mb-8">
        <h4 className="text-xl font-bold text-white mb-6">✅ Industry-Specific Sample Funnels</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industryFunnels.map((funnel) => (
            <div
              key={funnel.id}
              className={`p-6 border-2 rounded-2xl transition-all duration-300 cursor-pointer ${
                selectedPlatform === funnel.recommended
                  ? 'border-cyan-400 bg-cyan-500/20'
                  : 'border-white/30 hover:border-white/50'
              }`}
              onClick={() => handlePlatformSelect(funnel.recommended)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 bg-gradient-to-r ${funnel.color} rounded-xl text-2xl`}>
                  {funnel.icon}
                </div>
                <div>
                  <h5 className="font-bold text-white">{funnel.industry}</h5>
                  <p className="text-white/70 text-sm">{funnel.goal}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-white/80 text-sm font-medium mb-2">📈 Funnel Flow:</p>
                <ol className="text-white/70 text-sm space-y-1">
                  {funnel.flow.map((step, index) => (
                    <li key={index}>{index + 1}. {step}</li>
                  ))}
                </ol>
              </div>

              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-green-400 text-sm">
                  <strong>🛠️ Outcome:</strong> {funnel.outcome}
                </p>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300">
                Start with this Funnel
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add-On Feature Toggles */}
      <div className="mb-8">
        <h4 className="text-xl font-bold text-white mb-6">🟤 5. Add-On Feature Toggles</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addOns.map((addon) => {
            const isSelected = selectedAddOns.includes(addon.id);
            const isRelevant = !selectedPlatform || 
              (addon.id === 'whatsapp-auto-reply' && ['meta', 'whatsapp'].includes(selectedPlatform)) ||
              (addon.id === 'retargeting-pixel' && ['meta', 'google', 'linkedin'].includes(selectedPlatform)) ||
              ['lead-form', 'google-sheet-sync', 'crm-push', 'custom-funnel'].includes(addon.id);

            return (
              <div
                key={addon.id}
                className={`p-4 border-2 rounded-xl transition-all duration-300 ${
                  !isRelevant ? 'opacity-50 cursor-not-allowed' :
                  isSelected ? 'border-cyan-400 bg-cyan-500/20' : 'border-white/30 hover:border-white/50 cursor-pointer'
                }`}
                onClick={() => isRelevant && handleAddOnToggle(addon.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                      isSelected ? 'border-cyan-400 bg-cyan-500' : 'border-white/30'
                    }`}>
                      {isSelected && <span className="text-white text-xs">✓</span>}
                    </div>
                    <div>
                      <h6 className="font-medium text-white">{addon.name}</h6>
                      <p className="text-white/70 text-sm">{addon.description}</p>
                    </div>
                  </div>
                  <span className="text-yellow-400 font-bold">{formatCurrency(addon.price)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selection Summary */}
      {(selectedPlatform || selectedBundle) && (
        <div className="glass rounded-xl p-6 border border-white/20">
          <h4 className="font-bold text-white text-xl mb-4">Selection Summary</h4>
          
          {selectedPlatform && (
            <div className="mb-4">
              <p className="text-white">
                <strong>Platform:</strong> {platforms.find(p => p.id === selectedPlatform)?.name}
              </p>
              <p className="text-white">
                <strong>Ad Spend:</strong> {formatCurrency(adSpend)}
              </p>
              <p className="text-white">
                <strong>Estimated Leads:</strong> {calculateProjectedLeads(selectedPlatform, adSpend).min}–{calculateProjectedLeads(selectedPlatform, adSpend).max}
              </p>
            </div>
          )}

          {selectedBundle && (
            <div className="mb-4">
              <p className="text-white">
                <strong>Bundle:</strong> {bundledPackages.find(b => b.id === selectedBundle)?.name}
              </p>
            </div>
          )}

          {selectedAddOns.length > 0 && (
            <div className="mb-4">
              <p className="text-white font-medium">Add-ons:</p>
              <ul className="text-white/80 text-sm">
                {selectedAddOns.map(addonId => {
                  const addon = addOns.find(a => a.id === addonId);
                  return addon ? (
                    <li key={addonId}>• {addon.name} - {formatCurrency(addon.price)}</li>
                  ) : null;
                })}
              </ul>
            </div>
          )}

          <div className="border-t border-white/20 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-white font-bold text-lg">Total Service Fee:</span>
              <span className="text-yellow-400 font-bold text-2xl">
                {formatCurrency(
                  (selectedPlatform ? platforms.find(p => p.id === selectedPlatform)?.startingPrice || 0 : 0) +
                  (selectedBundle ? bundledPackages.find(b => b.id === selectedBundle)?.serviceFee || 0 : 0) +
                  selectedAddOns.reduce((total, addonId) => {
                    const addon = addOns.find(a => a.id === addonId);
                    return total + (addon?.price || 0);
                  }, 0)
                )}
              </span>
            </div>
            {selectedPlatform && (
              <p className="text-white/70 text-sm mt-2">
                + {formatCurrency(adSpend)} ad spend
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadGenerationSelector;