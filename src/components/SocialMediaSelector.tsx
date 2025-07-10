import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { SocialMediaSelection } from '../types';

interface SocialMediaSelectorProps {
  onSelectionChange: (selection: SocialMediaSelection | null) => void;
}

const SocialMediaSelector: React.FC<SocialMediaSelectorProps> = ({ onSelectionChange }) => {
  const [packageType, setPackageType] = useState<'standard' | 'premium' | 'custom'>('standard');
  const [customPosts, setCustomPosts] = useState<number>(0);
  const [customReels, setCustomReels] = useState<number>(0);
  const [customCarousels, setCustomCarousels] = useState<number>(0);
  const [customMotionPosters, setCustomMotionPosters] = useState<number>(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculateCustomPrice = () => {
    const posterPrice = customPosts * 600;
    const reelPrice = customReels * 2500;
    const carouselPrice = customCarousels * 800;
    const motionPosterPrice = customMotionPosters * 800;
    return posterPrice + reelPrice + carouselPrice + motionPosterPrice;
  };

  const updateSelection = (type: 'standard' | 'premium' | 'custom') => {
    let selection: SocialMediaSelection;

    if (type === 'standard') {
      selection = {
        type: 'standard',
        posts: 12,
        stories: 10,
        reels: 4,
        totalPrice: 30000,
        managementIncluded: true
      };
    } else if (type === 'premium') {
      selection = {
        type: 'premium',
        posts: 20,
        stories: 20,
        reels: 8,
        totalPrice: 50000,
        managementIncluded: true
      };
    } else {
      const totalPrice = calculateCustomPrice();
      if (totalPrice === 0) {
        onSelectionChange(null);
        return;
      }
      selection = {
        type: 'custom',
        posts: customPosts,
        reels: customReels,
        carousels: customCarousels,
        motionPosters: customMotionPosters,
        totalPrice,
        managementIncluded: false
      };
    }

    onSelectionChange(selection);
  };

  const handlePackageChange = (type: 'standard' | 'premium' | 'custom') => {
    setPackageType(type);
    updateSelection(type);
  };

  const handleCustomChange = () => {
    if (packageType === 'custom') {
      updateSelection('custom');
    }
  };

  const getSuggestedPlan = () => {
    const totalContent = customPosts + customReels + customCarousels + customMotionPosters;
    
    if (totalContent >= 20) {
      return 'premium';
    } else if (totalContent >= 12) {
      return 'standard';
    }
    return null;
  };

  const UpgradeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Managed Plans?</h3>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Custom plans are perfect for content-only needs. For full social media management—including planning, publishing, and profile engagement—choose a managed package.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-blue-900 mb-2">Managed Plans Include:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Strategy & Content Planning</li>
              <li>• Calendar & Scheduling</li>
              <li>• Posting + Caption Writing</li>
              <li>• Hashtag Research</li>
              <li>• Community Engagement (DMs, comments)</li>
              <li>• Performance Monitoring & Reporting</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> These services are not included in custom pricing. Custom is content only.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Optional Add-ons for Custom:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>Scheduling + Hashtag research</span>
              <span className="font-semibold">₹5,000</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>Basic profile management</span>
              <span className="font-semibold">₹7,500</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => setShowUpgradeModal(false)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Continue Custom
          </button>
          <button
            onClick={() => {
              setShowUpgradeModal(false);
              const suggested = getSuggestedPlan();
              if (suggested) {
                handlePackageChange(suggested);
              }
            }}
            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Switch to Managed
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="glass rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center space-x-3">
        <span className="text-3xl">📱</span>
        <span className="bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
          Social Media Management
        </span>
      </h3>
      
      {/* Package Type Selection */}
      <div className="mb-8">
        <label className="block text-lg font-bold text-white mb-4">Package Type</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => handlePackageChange('standard')}
            className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 ${
              packageType === 'standard'
                ? 'border-cyan-400 bg-cyan-500/20 text-white'
                : 'border-white/30 hover:border-white/50 text-white/80'
            }`}
          >
            <h4 className="font-bold text-xl mb-2">Standard Package</h4>
            <p className="text-sm mb-4">Complete social media management</p>
            <div className="space-y-1 text-sm">
              <p>• 12 posts</p>
              <p>• 10 stories</p>
              <p>• 4 reels</p>
              <p>• Full profile management</p>
            </div>
            <p className="text-lg font-bold text-yellow-400 mt-4">₹30,000/month</p>
          </button>
          
          <button
            onClick={() => handlePackageChange('premium')}
            className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 ${
              packageType === 'premium'
                ? 'border-cyan-400 bg-cyan-500/20 text-white'
                : 'border-white/30 hover:border-white/50 text-white/80'
            }`}
          >
            <h4 className="font-bold text-xl mb-2">Premium Package</h4>
            <p className="text-sm mb-4">Enhanced social media management</p>
            <div className="space-y-1 text-sm">
              <p>• 20 posts</p>
              <p>• 20 stories</p>
              <p>• 8 reels</p>
              <p>• Full profile management</p>
            </div>
            <p className="text-lg font-bold text-yellow-400 mt-4">₹50,000/month</p>
          </button>
          
          <button
            onClick={() => handlePackageChange('custom')}
            className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 ${
              packageType === 'custom'
                ? 'border-cyan-400 bg-cyan-500/20 text-white'
                : 'border-white/30 hover:border-white/50 text-white/80'
            }`}
          >
            <h4 className="font-bold text-xl mb-2">Custom Package</h4>
            <p className="text-sm mb-4">Build your own package</p>
            <div className="space-y-1 text-sm">
              <p>• Posts: ₹600 each</p>
              <p>• Reels: ₹2,500 each</p>
              <p>• Carousels: ₹800 each</p>
              <p>• Motion Posters: ₹800 each</p>
            </div>
            <p className="text-lg font-bold text-yellow-400 mt-4">Custom pricing</p>
          </button>
        </div>
      </div>

      {/* Custom Package Configuration */}
      {packageType === 'custom' && (
        <div className="mb-8 glass rounded-xl p-6 border border-white/20">
          <h4 className="text-lg font-bold text-white mb-6">Configure Custom Package</h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Posts */}
            <div>
              <label className="block text-white mb-2">Posts (₹600 each)</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setCustomPosts(Math.max(0, customPosts - 1));
                    setTimeout(handleCustomChange, 0);
                  }}
                  className="bg-white/20 text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={customPosts}
                  onChange={(e) => {
                    setCustomPosts(parseInt(e.target.value) || 0);
                    setTimeout(handleCustomChange, 0);
                  }}
                  min="0"
                  className="w-16 text-center border border-white/30 rounded-lg px-2 py-1 bg-white/10 text-white"
                />
                <button
                  onClick={() => {
                    setCustomPosts(customPosts + 1);
                    setTimeout(handleCustomChange, 0);
                  }}
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Reels */}
            <div>
              <label className="block text-white mb-2">Reels (₹2,500 each)</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setCustomReels(Math.max(0, customReels - 1));
                    setTimeout(handleCustomChange, 0);
                  }}
                  className="bg-white/20 text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={customReels}
                  onChange={(e) => {
                    setCustomReels(parseInt(e.target.value) || 0);
                    setTimeout(handleCustomChange, 0);
                  }}
                  min="0"
                  className="w-16 text-center border border-white/30 rounded-lg px-2 py-1 bg-white/10 text-white"
                />
                <button
                  onClick={() => {
                    setCustomReels(customReels + 1);
                    setTimeout(handleCustomChange, 0);
                  }}
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Carousels */}
            <div>
              <label className="block text-white mb-2">Carousels (₹800 each)</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setCustomCarousels(Math.max(0, customCarousels - 1));
                    setTimeout(handleCustomChange, 0);
                  }}
                  className="bg-white/20 text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={customCarousels}
                  onChange={(e) => {
                    setCustomCarousels(parseInt(e.target.value) || 0);
                    setTimeout(handleCustomChange, 0);
                  }}
                  min="0"
                  className="w-16 text-center border border-white/30 rounded-lg px-2 py-1 bg-white/10 text-white"
                />
                <button
                  onClick={() => {
                    setCustomCarousels(customCarousels + 1);
                    setTimeout(handleCustomChange, 0);
                  }}
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Motion Posters */}
            <div>
              <label className="block text-white mb-2">Motion Posters (₹800 each)</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setCustomMotionPosters(Math.max(0, customMotionPosters - 1));
                    setTimeout(handleCustomChange, 0);
                  }}
                  className="bg-white/20 text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={customMotionPosters}
                  onChange={(e) => {
                    setCustomMotionPosters(parseInt(e.target.value) || 0);
                    setTimeout(handleCustomChange, 0);
                  }}
                  min="0"
                  className="w-16 text-center border border-white/30 rounded-lg px-2 py-1 bg-white/10 text-white"
                />
                <button
                  onClick={() => {
                    setCustomMotionPosters(customMotionPosters + 1);
                    setTimeout(handleCustomChange, 0);
                  }}
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Custom Package Total and Upgrade Suggestion */}
          {calculateCustomPrice() > 0 && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-white">Total Content Value</h5>
                    <p className="text-sm text-white/70">Content only - No management</p>
                  </div>
                  <span className="text-2xl font-bold text-yellow-400">
                    {formatCurrency(calculateCustomPrice())}
                  </span>
                </div>
              </div>

              {/* Upgrade Suggestion */}
              {getSuggestedPlan() && (
                <div className="p-4 bg-blue-500/20 border border-blue-400/30 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-200 font-medium">
                        Need Help with Posting & Strategy? 👉
                      </p>
                      <p className="text-sm text-blue-300">
                        Switch to {getSuggestedPlan()!.charAt(0).toUpperCase() + getSuggestedPlan()!.slice(1)} Plan
                      </p>
                    </div>
                    <button
                      onClick={() => setShowUpgradeModal(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Custom Package Justification */}
          <div className="mt-6 p-4 bg-yellow-500/20 border border-yellow-400/30 rounded-xl">
            <h5 className="font-semibold text-yellow-200 mb-2">Why is Custom more flexible?</h5>
            <p className="text-sm text-yellow-200">
              Custom plans are perfect for content-only needs. You get professional creatives without the overhead of full management services.
            </p>
          </div>
        </div>
      )}

      {/* Package Benefits */}
      <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-6">
        <h4 className="font-bold text-blue-200 mb-3">
          {packageType === 'custom' ? 'Custom Package Features:' : 'Package Includes:'}
        </h4>
        <ul className="text-sm text-blue-200 space-y-2">
          {packageType !== 'custom' ? (
            <>
              <li>• Content creation and design</li>
              <li>• Posting schedule management</li>
              <li>• Community management</li>
              <li>• Monthly analytics report</li>
              <li>• Hashtag research and optimization</li>
              <li>• Engagement monitoring</li>
            </>
          ) : (
            <>
              <li>• Professional content creation</li>
              <li>• High-quality designs</li>
              <li>• 2 rounds of revisions per content</li>
              <li>• Content delivered in required formats</li>
              <li>• No social media management</li>
              <li>• Perfect for in-house teams</li>
            </>
          )}
        </ul>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && <UpgradeModal />}
    </div>
  );
};

export default SocialMediaSelector;