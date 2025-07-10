import React, { useState } from 'react';
import { Tag, Check, X, Sparkles } from 'lucide-react';
import { PromoCode } from '../types';
import { validatePromoCode, calculateDiscount } from '../data/promoCodes';

interface PromoCodeInputProps {
  totalAmount: number;
  onPromoCodeApply: (promoCode: PromoCode | null) => void;
  appliedPromoCode: PromoCode | null;
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
  totalAmount,
  onPromoCodeApply,
  appliedPromoCode
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    
    setIsValidating(true);
    setError('');
    
    // Simulate API call delay
    setTimeout(() => {
      const validatedPromo = validatePromoCode(promoInput.trim(), totalAmount);
      
      if (validatedPromo && validatedPromo.isValid) {
        onPromoCodeApply(validatedPromo);
        setPromoInput('');
        setError('');
      } else if (validatedPromo && !validatedPromo.isValid) {
        setError(validatedPromo.description);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      } else {
        setError('Invalid promo code. Please check and try again.');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
      
      setIsValidating(false);
    }, 500);
  };

  const handleRemovePromo = () => {
    onPromoCodeApply(null);
    setError('');
  };

  const discountAmount = appliedPromoCode ? calculateDiscount(totalAmount, appliedPromoCode) : 0;

  return (
    <div className="glass rounded-2xl p-6 card-hover animate-fadeInUp stagger-3">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl">
          <Tag className="w-5 h-5 text-white" />
        </div>
        <span>Promo Code</span>
        <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
      </h3>
      
      {!appliedPromoCode ? (
        <div className="space-y-4">
          <div className={`flex space-x-3 ${isShaking ? 'animate-shake' : ''}`}>
            <div className="relative flex-1">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                placeholder="Enter your promo code"
                className={`w-full glass border-2 ${
                  error ? 'border-red-400' : 'border-white/30'
                } rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-yellow-400 transition-all duration-300 ${
                  isValidating ? 'animate-shimmer' : ''
                }`}
                disabled={isValidating}
              />
              {isValidating && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <button
              onClick={handleApplyPromo}
              disabled={!promoInput.trim() || isValidating}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>{isValidating ? 'Validating...' : 'Apply'}</span>
            </button>
          </div>
          
          {error && (
            <div className="flex items-center space-x-2 text-red-400 text-sm animate-fadeInUp">
              <X className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="text-sm text-white/70">
            <p className="font-medium mb-2">💡 Have a promo code? Enter it above to save more!</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl animate-glow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500 rounded-full">
                <Check className="w-4 h-4 text-white checkmark" />
              </div>
              <div>
                <p className="font-semibold text-green-400">{appliedPromoCode.code} Applied!</p>
                <p className="text-sm text-green-300">{appliedPromoCode.description}</p>
                {appliedPromoCode.code === 'LOGOWEBSITE20' && (
                  <p className="text-xs text-green-200 mt-1">🎉 Combo discount automatically applied!</p>
                )}
              </div>
            </div>
            <button
              onClick={appliedPromoCode.code === 'LOGOWEBSITE20' ? undefined : handleRemovePromo}
              disabled={appliedPromoCode.code === 'LOGOWEBSITE20'}
              className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-lg transition-all duration-300"
            >
              {appliedPromoCode.code === 'LOGOWEBSITE20' ? (
                <span className="text-xs text-gray-400">Auto</span>
              ) : (
                <X className="w-4 h-4" />
              )}
            </button>
          </div>
          
          <div className="flex justify-between items-center text-lg">
            <span className="text-white/90">Discount Applied:</span>
            <span className="font-bold text-green-400 animate-countUp">
              -{formatCurrency(discountAmount)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoCodeInput;