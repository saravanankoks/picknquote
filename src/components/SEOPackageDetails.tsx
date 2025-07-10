import React from 'react';
import { CheckCircle } from 'lucide-react';
import { seoFeatures } from '../data/seoFeatures';

interface SEOPackageDetailsProps {
  packageType: 'basic' | 'standard' | 'premium';
  onClose: () => void;
  onProceed: () => void;
}

const SEOPackageDetails: React.FC<SEOPackageDetailsProps> = ({
  packageType,
  onClose,
  onProceed
}) => {
  const getPackageFeatures = () => {
    return seoFeatures.map(feature => {
      const option = feature.options[packageType];
      if (!option) return null;
      
      return {
        name: feature.name,
        description: option.description
      };
    }).filter(Boolean);
  };

  const getTotalPrice = () => {
    const prices = { basic: 19999, standard: 29999, premium: 39999 };
    return prices[packageType];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const features = getPackageFeatures();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {packageType.charAt(0).toUpperCase() + packageType.slice(1)} SEO Package Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-3xl font-bold text-primary-600 mt-2">
            {formatCurrency(getTotalPrice())}
          </p>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Included Features:</h3>
          
          <div className="grid gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{feature?.name}</h4>
                  <p className="text-sm text-gray-600">{feature?.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Package Benefits:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Complete SEO setup and optimization</li>
              <li>• Monthly performance reports</li>
              <li>• Dedicated account manager</li>
              <li>• 24/7 support</li>
              <li>• 3 months of free maintenance</li>
            </ul>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-900">Total Package Price:</span>
              <span className="text-2xl font-bold text-primary-600">
                {formatCurrency(getTotalPrice())}
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={onProceed}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOPackageDetails;