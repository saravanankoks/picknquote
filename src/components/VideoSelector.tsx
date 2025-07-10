import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { VideoSelection } from '../types';

interface VideoSelectorProps {
  onSelectionChange: (selection: VideoSelection | null) => void;
}

const VideoSelector: React.FC<VideoSelectorProps> = ({ onSelectionChange }) => {
  const [videoType, setVideoType] = useState<'promo' | 'explainer' | 'social'>('promo');
  const [quantity, setQuantity] = useState<number>(1);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getVideoDetails = (type: 'promo' | 'explainer' | 'social') => {
    switch (type) {
      case 'promo':
        return { price: 5000, description: '2-3 minute promotional video' };
      case 'explainer':
        return { price: 8000, description: '3-4 minute video with audio & subtitles' };
      case 'social':
        return { price: 1500, description: 'Short social media reel' };
    }
  };

  const calculatePrice = (type: 'promo' | 'explainer' | 'social', qty: number) => {
    if (qty === 0) return 0;
    
    const details = getVideoDetails(type);
    
    if (type === 'social' && qty >= 5) {
      return 6000; // Special price for 5 social media reels
    }
    
    return details.price * qty;
  };

  const getUnitPrice = (type: 'promo' | 'explainer' | 'social', qty: number) => {
    if (qty === 0) return 0;
    
    if (type === 'social' && qty >= 5) {
      return 1200; // 6000 / 5
    }
    return getVideoDetails(type).price;
  };

  const updateSelection = (newType: 'promo' | 'explainer' | 'social', newQuantity: number) => {
    if (newQuantity === 0) {
      onSelectionChange(null);
      return;
    }
    
    const unitPrice = getUnitPrice(newType, newQuantity);
    const totalPrice = calculatePrice(newType, newQuantity);
    
    const selection: VideoSelection = {
      type: newType,
      quantity: newQuantity,
      unitPrice,
      totalPrice
    };
    
    onSelectionChange(selection);
  };

  const handleTypeChange = (type: 'promo' | 'explainer' | 'social') => {
    setVideoType(type);
    updateSelection(type, quantity);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 0) return;
    setQuantity(newQuantity);
    updateSelection(videoType, newQuantity);
  };

  const currentUnitPrice = getUnitPrice(videoType, quantity);
  const currentTotalPrice = calculatePrice(videoType, quantity);

  return (
    <div className="glass rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center space-x-3">
        <span className="text-3xl">🎬</span>
        <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          Video Configuration
        </span>
      </h3>
      
      {/* Video Type Selection */}
      <div className="mb-8">
        <label className="block text-lg font-bold text-white mb-4">Video Type</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => handleTypeChange('promo')}
            className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 ${
              videoType === 'promo'
                ? 'border-cyan-400 bg-cyan-500/20 text-white'
                : 'border-white/30 hover:border-white/50 text-white/80'
            }`}
          >
            <h4 className="font-bold text-xl mb-2">Promotional Video</h4>
            <p className="text-sm mb-4">2-3 minute promo video</p>
            <p className="text-lg font-bold text-yellow-400">₹5,000</p>
          </button>
          
          <button
            onClick={() => handleTypeChange('explainer')}
            className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 ${
              videoType === 'explainer'
                ? 'border-cyan-400 bg-cyan-500/20 text-white'
                : 'border-white/30 hover:border-white/50 text-white/80'
            }`}
          >
            <h4 className="font-bold text-xl mb-2">Explanatory Video</h4>
            <p className="text-sm mb-4">3-4 min with audio & subtitles</p>
            <p className="text-lg font-bold text-yellow-400">₹8,000</p>
          </button>
          
          <button
            onClick={() => handleTypeChange('social')}
            className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 ${
              videoType === 'social'
                ? 'border-cyan-400 bg-cyan-500/20 text-white'
                : 'border-white/30 hover:border-white/50 text-white/80'
            }`}
          >
            <h4 className="font-bold text-xl mb-2">Social Media Reels</h4>
            <p className="text-sm mb-4">Short social media content</p>
            <p className="text-lg font-bold text-yellow-400">₹1,500</p>
            <p className="text-xs text-green-400 mt-2">5 reels for ₹6,000</p>
          </button>
        </div>
      </div>

      {/* Quantity Selection */}
      <div className="mb-8">
        <label className="block text-lg font-bold text-white mb-4">Quantity (0 to deselect)</label>
        <div className="flex items-center space-x-6">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 0}
            className="bg-white/20 text-white p-3 rounded-xl hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-5 h-5" />
          </button>
          
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
            min="0"
            className="w-24 text-center border-2 border-white/30 rounded-xl px-4 py-3 bg-white/10 text-white text-lg font-bold"
          />
          
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-3 rounded-xl transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Pricing Display */}
      {quantity > 0 && (
        <div className="glass rounded-xl p-6 border border-white/20">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/80">Unit Price:</span>
            <span className="font-bold text-white text-lg">{formatCurrency(currentUnitPrice)}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/80">Quantity:</span>
            <span className="font-bold text-white text-lg">{quantity} video{quantity > 1 ? 's' : ''}</span>
          </div>
          <div className="border-t border-white/20 pt-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white text-xl">Total Price:</span>
              <span className="text-2xl font-bold text-yellow-400">
                {formatCurrency(currentTotalPrice)}
              </span>
            </div>
          </div>
        </div>
      )}

      {videoType === 'social' && quantity >= 5 && (
        <div className="mt-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl">
          <p className="text-sm text-green-200">
            <strong>Special Offer:</strong> 5 social media reels for just ₹6,000 (₹1,200 each)!
          </p>
        </div>
      )}

      {quantity > 0 && (
        <div className="mt-6 p-4 bg-blue-500/20 border border-blue-400/30 rounded-xl">
          <p className="text-sm text-blue-200">
            <strong>Includes:</strong> Professional editing, music, transitions, and 2 rounds of revisions
          </p>
        </div>
      )}

      {quantity === 0 && (
        <div className="mt-6 p-4 bg-gray-500/20 border border-gray-400/30 rounded-xl">
          <p className="text-sm text-gray-300">
            Set quantity to 0 to deselect videos from your order.
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoSelector;