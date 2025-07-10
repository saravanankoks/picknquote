import React, { useState } from 'react';
import { Check, Star } from 'lucide-react';
import { comboPackages, addOns, freeAddOns } from '../data/comboPackages';
import { ComboPackage, AddOn, SelectedCombo } from '../types';

interface ComboPackageSelectorProps {
  onComboSelect: (combo: SelectedCombo) => void;
}

const ComboPackageSelector: React.FC<ComboPackageSelectorProps> = ({ onComboSelect }) => {
  const [selectedCombo, setSelectedCombo] = useState<ComboPackage | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [showAddOns, setShowAddOns] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleComboSelect = (combo: ComboPackage) => {
    setSelectedCombo(combo);
    setShowAddOns(true);
  };

  const handleAddOnToggle = (addOn: AddOn) => {
    setSelectedAddOns(prev => {
      const exists = prev.find(item => item.id === addOn.id);
      if (exists) {
        return prev.filter(item => item.id !== addOn.id);
      } else {
        return [...prev, addOn];
      }
    });
  };

  const handleProceed = () => {
    if (selectedCombo) {
      onComboSelect({
        combo: selectedCombo,
        addOns: selectedAddOns
      });
    }
  };

  const getTotalPrice = () => {
    const comboPrice = selectedCombo?.price || 0;
    const addOnsPrice = selectedAddOns.reduce((total, addOn) => total + addOn.price, 0);
    return comboPrice + addOnsPrice;
  };

  const getAddOnsByCategory = (category: string) => {
    return addOns.filter(addOn => addOn.category === category);
  };

  const categories = [
    { id: 'messaging', name: 'Messaging & Communication', icon: '💬' },
    { id: 'seo', name: 'SEO & Marketing', icon: '📈' },
    { id: 'maintenance', name: 'Maintenance & Support', icon: '🔧' },
    { id: 'analytics', name: 'Analytics & Tracking', icon: '📊' },
    { id: 'development', name: 'Development & Features', icon: '⚡' }
  ];

  if (showAddOns && selectedCombo) {
    return (
      <div className="space-y-6">
        {/* Selected Combo Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Selected Package</h3>
            <button
              onClick={() => setShowAddOns(false)}
              className="text-primary-600 hover:text-primary-700 text-sm"
            >
              Change Package
            </button>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="text-3xl">{selectedCombo.icon}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{selectedCombo.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{selectedCombo.description}</p>
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold text-primary-600">
                  {formatCurrency(selectedCombo.price)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {formatCurrency(selectedCombo.originalPrice)}
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                  {selectedCombo.discount}% OFF
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Add-ons Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Enhance Your Package</h3>
          
          {categories.map(category => {
            const categoryAddOns = getAddOnsByCategory(category.id);
            if (categoryAddOns.length === 0) return null;

            return (
              <div key={category.id} className="mb-6">
                <h4 className="flex items-center space-x-2 font-medium text-gray-900 mb-3">
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.name}</span>
                </h4>
                
                <div className="grid gap-3">
                  {categoryAddOns.map(addOn => {
                    const isSelected = selectedAddOns.some(item => item.id === addOn.id);
                    
                    return (
                      <div
                        key={addOn.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          isSelected
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleAddOnToggle(addOn)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                isSelected
                                  ? 'border-primary-500 bg-primary-500'
                                  : 'border-gray-300'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900">{addOn.name}</h5>
                                <p className="text-sm text-gray-600">{addOn.description}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            {addOn.originalPrice ? (
                              <div>
                                <span className="text-lg font-semibold text-primary-600">
                                  {formatCurrency(addOn.price)}
                                </span>
                                <div className="text-sm text-gray-500 line-through">
                                  {formatCurrency(addOn.originalPrice)}
                                </div>
                              </div>
                            ) : (
                              <span className="text-lg font-semibold text-primary-600">
                                {formatCurrency(addOn.price)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Free Add-ons */}
          <div className="mb-6">
            <h4 className="flex items-center space-x-2 font-medium text-gray-900 mb-3">
              <span className="text-xl">🎁</span>
              <span>Included Free</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {freeAddOns.map((freeAddOn, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-900">{freeAddOn}</span>
                  <span className="text-green-600 font-medium text-sm">FREE</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total and Proceed */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Package Total</h3>
              {selectedAddOns.length > 0 && (
                <p className="text-sm text-gray-600">
                  {selectedCombo.name} + {selectedAddOns.length} add-on{selectedAddOns.length > 1 ? 's' : ''}
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary-600">
                {formatCurrency(getTotalPrice())}
              </div>
              {selectedAddOns.length > 0 && (
                <div className="text-sm text-gray-500">
                  Base: {formatCurrency(selectedCombo.price)} + Add-ons: {formatCurrency(selectedAddOns.reduce((total, addOn) => total + addOn.price, 0))}
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={handleProceed}
            className="w-full bg-primary-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Limited Time Offer Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">🎉 Limited Time Offer!</h2>
        <p className="text-lg">Get 10% extra discount on your first purchase - Only for the first 5 customers!</p>
        <p className="text-sm mt-2 opacity-90">Hurry up! Offer expires soon.</p>
      </div>

      {/* Combo Packages */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Choose Your Perfect Combo Package</h3>
        
        <div className="grid gap-6">
          {comboPackages.map(combo => (
            <div
              key={combo.id}
              className={`border rounded-lg p-6 transition-all hover:shadow-md ${
                combo.popular ? 'border-primary-500 ring-2 ring-primary-100' : 'border-gray-200'
              }`}
            >
              {combo.popular && (
                <div className="flex items-center justify-center mb-4">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </span>
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{combo.icon}</div>
                
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{combo.name}</h4>
                  <p className="text-gray-600 mb-2">{combo.description}</p>
                  <p className="text-sm text-gray-500 mb-4">Target: {combo.target}</p>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-3xl font-bold text-primary-600">
                      {formatCurrency(combo.price)}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      {formatCurrency(combo.originalPrice)}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Save {combo.discount}%
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">Includes:</h5>
                    <ul className="space-y-1">
                      {combo.includes.map((item, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button
                    onClick={() => handleComboSelect(combo)}
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    Select Package
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Combo Packages */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">Why Choose Our Combo Packages?</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-blue-600" />
            <span>Save up to 19% compared to individual services</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-blue-600" />
            <span>Comprehensive solutions tailored for your business stage</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-blue-600" />
            <span>Seamless integration between all services</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-blue-600" />
            <span>Priority support and faster delivery</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ComboPackageSelector;