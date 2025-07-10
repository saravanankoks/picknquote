import React, { useState } from 'react';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import { seoFeatures, seoPackages } from '../data/seoFeatures';
import { SelectedSEOFeature } from '../types';

interface SEOFeatureSelectorProps {
  selectedFeatures: SelectedSEOFeature[];
  onFeatureAdd: (feature: SelectedSEOFeature) => void;
  onFeatureRemove: (featureId: string) => void;
}

const SEOFeatureSelector: React.FC<SEOFeatureSelectorProps> = ({
  selectedFeatures,
  onFeatureAdd,
  onFeatureRemove
}) => {
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<'basic' | 'standard' | 'premium'>('basic');
  const [isFeatureDropdownOpen, setIsFeatureDropdownOpen] = useState(false);
  const [isTierDropdownOpen, setIsTierDropdownOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getTotalAmount = () => {
    return selectedFeatures.reduce((total, feature) => total + feature.price, 0);
  };

  const handleAddFeature = () => {
    if (!selectedFeature) return;

    const feature = seoFeatures.find(f => f.id === selectedFeature);
    if (!feature || !feature.options[selectedTier]) return;

    const isAlreadySelected = selectedFeatures.some(f => f.featureId === selectedFeature);
    if (isAlreadySelected) return;

    const option = feature.options[selectedTier]!;
    const newFeature: SelectedSEOFeature = {
      featureId: selectedFeature,
      selectedTier,
      price: option.price,
      description: option.description
    };

    onFeatureAdd(newFeature);
    setSelectedFeature('');
    setSelectedTier('basic');
  };

  const selectedFeatureData = seoFeatures.find(f => f.id === selectedFeature);
  const availableTiers = selectedFeatureData ? Object.keys(selectedFeatureData.options) as ('basic' | 'standard' | 'premium')[] : [];

  return (
    <div className="space-y-6">
      {/* Package Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Package Options</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(seoPackages).map(([key, pkg]) => (
            <div key={key} className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
              <p className="text-2xl font-bold text-primary-600 mt-2">{formatCurrency(pkg.price)}</p>
              <p className="text-sm text-gray-600 mt-1">Complete package</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> You can either choose a complete package above or build your custom SEO solution by selecting individual features below.
          </p>
        </div>
      </div>

      {/* Feature Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Build Custom SEO Package</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {/* Feature Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Feature</label>
            <button
              onClick={() => setIsFeatureDropdownOpen(!isFeatureDropdownOpen)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <span className={selectedFeature ? 'text-gray-900' : 'text-gray-500'}>
                {selectedFeature 
                  ? seoFeatures.find(f => f.id === selectedFeature)?.name 
                  : 'Choose a feature...'}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isFeatureDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isFeatureDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {seoFeatures.map((feature) => {
                  const isSelected = selectedFeatures.some(f => f.featureId === feature.id);
                  return (
                    <button
                      key={feature.id}
                      onClick={() => {
                        if (!isSelected) {
                          setSelectedFeature(feature.id);
                          setSelectedTier('basic');
                        }
                        setIsFeatureDropdownOpen(false);
                      }}
                      disabled={isSelected}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                        isSelected ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
                      }`}
                    >
                      {feature.name} {isSelected && '(Already selected)'}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Tier Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Tier</label>
            <button
              onClick={() => setIsTierDropdownOpen(!isTierDropdownOpen)}
              disabled={!selectedFeature}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <span className={selectedTier ? 'text-gray-900' : 'text-gray-500'}>
                {selectedTier ? selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1) : 'Select tier...'}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isTierDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isTierDropdownOpen && selectedFeature && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                {availableTiers.map((tier) => {
                  const option = selectedFeatureData?.options[tier];
                  if (!option) return null;
                  
                  return (
                    <button
                      key={tier}
                      onClick={() => {
                        setSelectedTier(tier);
                        setIsTierDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{tier.charAt(0).toUpperCase() + tier.slice(1)}</span>
                        <span className="text-primary-600 font-semibold">{formatCurrency(option.price)}</span>
                      </div>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Add Button */}
          <div className="flex items-end">
            <button
              onClick={handleAddFeature}
              disabled={!selectedFeature || !selectedTier}
              className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              <span>Add Feature</span>
            </button>
          </div>
        </div>

        {/* Price Preview */}
        {selectedFeature && selectedTier && selectedFeatureData?.options[selectedTier] && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">{selectedFeatureData.name}</p>
                <p className="text-sm text-gray-600">{selectedFeatureData.options[selectedTier]!.description}</p>
              </div>
              <p className="text-lg font-semibold text-primary-600">
                {formatCurrency(selectedFeatureData.options[selectedTier]!.price)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Selected Features */}
      {selectedFeatures.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected SEO Features</h3>
          
          <div className="space-y-3">
            {selectedFeatures.map((feature) => {
              const featureData = seoFeatures.find(f => f.id === feature.featureId);
              return (
                <div key={feature.featureId} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{featureData?.name}</h4>
                    <p className="text-sm text-gray-600">
                      {feature.selectedTier.charAt(0).toUpperCase() + feature.selectedTier.slice(1)} - {feature.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(feature.price)}
                    </span>
                    <button
                      onClick={() => onFeatureRemove(feature.featureId)}
                      className="text-red-500 hover:text-red-700 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">Total Custom Package:</span>
              <span className="text-2xl font-bold text-primary-600">
                {formatCurrency(getTotalAmount())}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOFeatureSelector;