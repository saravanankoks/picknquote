import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { PosterSelection } from '../types';

interface PosterSelectorProps {
  onSelectionChange: (selection: PosterSelection | null) => void;
}

const PosterSelector: React.FC<PosterSelectorProps> = ({ onSelectionChange }) => {
  const [posterType, setPosterType] = useState<'creative' | 'normal'>('creative');
  const [quantity, setQuantity] = useState<number>(1);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculatePrice = (type: 'creative' | 'normal', qty: number) => {
    if (qty === 0) return 0;
    
    if (type === 'creative') {
      if (qty === 1) return 650;
      if (qty >= 10 && qty < 20) return qty * 550;
      if (qty >= 20) return qty * 500;
      return qty * 650; // For quantities 2-9
    } else {
      return qty * 400; // Normal posters
    }
  };

  const getUnitPrice = (type: 'creative' | 'normal', qty: number) => {
    if (qty === 0) return 0;
    
    if (type === 'creative') {
      if (qty === 1) return 650;
      if (qty >= 10 && qty < 20) return 550;
      if (qty >= 20) return 500;
      return 650;
    } else {
      return 400;
    }
  };

  const updateSelection = (newType: 'creative' | 'normal', newQuantity: number) => {
    if (newQuantity === 0) {
      onSelectionChange(null);
      return;
    }
    
    const unitPrice = getUnitPrice(newType, newQuantity);
    const totalPrice = calculatePrice(newType, newQuantity);
    
    const selection: PosterSelection = {
      type: newType,
      quantity: newQuantity,
      unitPrice,
      totalPrice
    };
    
    onSelectionChange(selection);
  };

  const handleTypeChange = (type: 'creative' | 'normal') => {
    setPosterType(type);
    updateSelection(type, quantity);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 0) return;
    setQuantity(newQuantity);
    updateSelection(posterType, newQuantity);
  };

  const currentUnitPrice = getUnitPrice(posterType, quantity);
  const currentTotalPrice = calculatePrice(posterType, quantity);

  return (
    <div className="glass rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center space-x-3">
        <span className="text-3xl">🎨</span>
        <span className="bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
          Poster Configuration
        </span>
      </h3>
      
      {/* Poster Type Selection */}
      <div className="mb-8">
        <label className="block text-lg font-bold text-white mb-4">Poster Type</label>
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => handleTypeChange('creative')}
            className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 ${
              posterType === 'creative'
                ? 'border-cyan-400 bg-cyan-500/20 text-white'
                : 'border-white/30 hover:border-white/50 text-white/80'
            }`}
          >
            <h4 className="font-bold text-xl mb-2">Creative Posters</h4>
            <p className="text-sm mb-4">High-quality creative designs with 3 revisions</p>
            <div className="text-sm space-y-1">
              <p>1 poster: ₹650</p>
              <p>10+ posters: ₹550 each</p>
              <p>20+ posters: ₹500 each</p>
            </div>
          </button>
          
          <button
            onClick={() => handleTypeChange('normal')}
            className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 ${
              posterType === 'normal'
                ? 'border-cyan-400 bg-cyan-500/20 text-white'
                : 'border-white/30 hover:border-white/50 text-white/80'
            }`}
          >
            <h4 className="font-bold text-xl mb-2">Normal Posters</h4>
            <p className="text-sm mb-4">Standard poster designs with 3 revisions</p>
            <div className="text-sm">
              <p>₹400 per poster</p>
            </div>
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
            <span className="font-bold text-white text-lg">{quantity} posters</span>
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

      {posterType === 'creative' && quantity > 0 && (
        <div className="mt-6 p-4 bg-blue-500/20 border border-blue-400/30 rounded-xl">
          <p className="text-sm text-blue-200">
            <strong>Bulk Discount:</strong> Order 10+ for ₹550 each, or 20+ for ₹500 each!
          </p>
        </div>
      )}

      {quantity === 0 && (
        <div className="mt-6 p-4 bg-gray-500/20 border border-gray-400/30 rounded-xl">
          <p className="text-sm text-gray-300">
            Set quantity to 0 to deselect posters from your order.
          </p>
        </div>
      )}
    </div>
  );
};

export default PosterSelector;