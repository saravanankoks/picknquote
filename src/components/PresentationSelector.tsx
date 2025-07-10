import React, { useState } from 'react';
import { Plus, Minus, ExternalLink } from 'lucide-react';
import { PresentationSelection } from '../types';

interface PresentationSelectorProps {
  onSelectionChange: (selection: PresentationSelection | null) => void;
}

const PresentationSelector: React.FC<PresentationSelectorProps> = ({ onSelectionChange }) => {
  const [presentationType, setPresentationType] = useState<'business' | 'advanced'>('business');
  const [slides, setSlides] = useState<number>(10);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculatePrice = (type: 'business' | 'advanced', slideCount: number) => {
    if (type === 'business') {
      if (slideCount <= 50) {
        return slideCount * 500;
      } else {
        return (50 * 500) + ((slideCount - 50) * 250);
      }
    } else { // advanced
      if (slideCount <= 20) {
        return slideCount * 1000;
      } else {
        return (20 * 1000) + ((slideCount - 20) * 500);
      }
    }
  };

  const updateSelection = (newType: 'business' | 'advanced', newSlides: number) => {
    const totalPrice = calculatePrice(newType, newSlides);
    
    const selection: PresentationSelection = {
      type: newType,
      slides: newSlides,
      totalPrice
    };
    
    onSelectionChange(selection);
  };

  const handleTypeChange = (type: 'business' | 'advanced') => {
    setPresentationType(type);
    updateSelection(type, slides);
  };

  const handleSlidesChange = (newSlides: number) => {
    if (newSlides < 1) return;
    setSlides(newSlides);
    updateSelection(presentationType, newSlides);
  };

  const currentTotalPrice = calculatePrice(presentationType, slides);
  const sampleUrl = presentationType === 'business' 
    ? 'https://business-presentation-demo.netlify.app'
    : 'https://advanced-presentation-demo.netlify.app';

  const getPricingBreakdown = () => {
    if (presentationType === 'business') {
      if (slides <= 50) {
        return `${slides} slides × ₹500 = ${formatCurrency(slides * 500)}`;
      } else {
        const regularSlides = 50;
        const extraSlides = slides - 50;
        return `${regularSlides} slides × ₹500 + ${extraSlides} slides × ₹250 = ${formatCurrency(currentTotalPrice)}`;
      }
    } else {
      if (slides <= 20) {
        return `${slides} slides × ₹1000 = ${formatCurrency(slides * 1000)}`;
      } else {
        const regularSlides = 20;
        const extraSlides = slides - 20;
        return `${regularSlides} slides × ₹1000 + ${extraSlides} slides × ₹500 = ${formatCurrency(currentTotalPrice)}`;
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Presentation Configuration</h3>
      
      {/* Presentation Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Presentation Type</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleTypeChange('business')}
            className={`p-4 border rounded-lg text-left transition-colors ${
              presentationType === 'business'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <h4 className="font-medium">Business Presentation</h4>
            <p className="text-sm text-gray-600 mt-1">Professional business presentations</p>
            <div className="mt-2 text-sm">
              <p>₹500 per slide (up to 50 slides)</p>
              <p>₹250 per slide (after 50 slides)</p>
            </div>
            <a
              href={sampleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              <span>View Sample</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </button>
          
          <button
            onClick={() => handleTypeChange('advanced')}
            className={`p-4 border rounded-lg text-left transition-colors ${
              presentationType === 'advanced'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <h4 className="font-medium">Advanced Business Presentation</h4>
            <p className="text-sm text-gray-600 mt-1">Premium presentations with animations</p>
            <div className="mt-2 text-sm">
              <p>₹1000 per slide (up to 20 slides)</p>
              <p>₹500 per slide (after 20 slides)</p>
            </div>
            <a
              href="https://advanced-presentation-demo.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              <span>View Sample</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </button>
        </div>
      </div>

      {/* Slides Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Number of Slides</label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleSlidesChange(slides - 1)}
            disabled={slides <= 1}
            className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <input
            type="number"
            value={slides}
            onChange={(e) => handleSlidesChange(parseInt(e.target.value) || 1)}
            min="1"
            className="w-24 text-center border border-gray-300 rounded-lg px-3 py-2"
          />
          
          <button
            onClick={() => handleSlidesChange(slides + 1)}
            className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pricing Display */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Slides:</span>
          <span className="font-medium">{slides} slides</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Pricing:</span>
          <span className="font-medium text-sm">{getPricingBreakdown()}</span>
        </div>
        <div className="border-t border-gray-200 pt-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total Price:</span>
            <span className="text-xl font-bold text-primary-600">
              {formatCurrency(currentTotalPrice)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Includes:</strong> Professional design, custom graphics, and 2 rounds of revisions
        </p>
      </div>
    </div>
  );
};

export default PresentationSelector;