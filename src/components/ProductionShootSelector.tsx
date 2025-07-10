import React, { useState } from 'react';
import { Camera, Video, Package, Megaphone, Home, Presentation as PresentationChart, Instagram } from 'lucide-react';
import { ProductionShootSelection } from '../types';

interface ProductionShootSelectorProps {
  onSelectionChange: (selection: ProductionShootSelection | null) => void;
}

const ProductionShootSelector: React.FC<ProductionShootSelectorProps> = ({ onSelectionChange }) => {
  const [shootType, setShootType] = useState<'photoshoot' | 'video-shoot' | 'product-shoot' | 'promo-shoot' | 'interior-exterior' | 'pitch-deck' | 'social-reels'>('photoshoot');
  const [packageType, setPackageType] = useState<'basic' | 'standard' | 'premium'>('basic');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const shootTypes = [
    {
      id: 'photoshoot' as const,
      name: 'Photoshoot',
      icon: Camera,
      description: 'Professional photography services',
      packages: {
        basic: { price: 15000, description: '2-3 hours, 50 edited photos, 1 location' },
        standard: { price: 25000, description: '4-5 hours, 100 edited photos, 2 locations' },
        premium: { price: 40000, description: '8 hours, 200 edited photos, 3 locations, styling' }
      }
    },
    {
      id: 'video-shoot' as const,
      name: 'Video Shoot',
      icon: Video,
      description: 'Professional video production',
      packages: {
        basic: { price: 25000, description: '2-3 hours, 1 final video (2-3 min), basic editing' },
        standard: { price: 45000, description: '4-5 hours, 2 final videos, advanced editing' },
        premium: { price: 75000, description: '8 hours, 3 final videos, premium editing, motion graphics' }
      }
    },
    {
      id: 'product-shoot' as const,
      name: 'Product Shoot',
      icon: Package,
      description: 'Product photography and videography',
      packages: {
        basic: { price: 12000, description: '20 products, white background, basic editing' },
        standard: { price: 20000, description: '40 products, lifestyle shots, advanced editing' },
        premium: { price: 35000, description: '60 products, multiple angles, 360° shots, premium editing' }
      }
    },
    {
      id: 'promo-shoot' as const,
      name: 'Promo Shoot',
      icon: Megaphone,
      description: 'Promotional content creation',
      packages: {
        basic: { price: 20000, description: '3-4 hours, promotional photos & 1 video' },
        standard: { price: 35000, description: '6 hours, extensive promo content, 2 videos' },
        premium: { price: 55000, description: '8 hours, complete campaign content, 3 videos, graphics' }
      }
    },
    {
      id: 'interior-exterior' as const,
      name: 'Interior/Exterior',
      icon: Home,
      description: 'Architectural and space photography',
      packages: {
        basic: { price: 18000, description: '3-4 hours, 30 edited photos, 1 property' },
        standard: { price: 30000, description: '6 hours, 60 edited photos, drone shots' },
        premium: { price: 50000, description: '8 hours, 100 photos, drone, virtual tour, video walkthrough' }
      }
    },
    {
      id: 'pitch-deck' as const,
      name: 'Pitch Deck Video',
      icon: PresentationChart,
      description: 'Professional pitch presentation videos',
      packages: {
        basic: { price: 30000, description: '5-7 min pitch video, basic graphics' },
        standard: { price: 50000, description: '10-12 min pitch video, advanced graphics, animations' },
        premium: { price: 80000, description: '15+ min comprehensive pitch, premium graphics, multiple versions' }
      }
    },
    {
      id: 'social-reels' as const,
      name: 'Social Media Reels',
      icon: Instagram,
      description: 'Social media content creation',
      packages: {
        basic: { price: 8000, description: '5 reels, basic editing, trending audio' },
        standard: { price: 15000, description: '10 reels, advanced editing, custom graphics' },
        premium: { price: 25000, description: '15 reels, premium editing, motion graphics, custom music' }
      }
    }
  ];

  const selectedShootType = shootTypes.find(type => type.id === shootType);
  const selectedPackage = selectedShootType?.packages[packageType];

  const updateSelection = () => {
    if (selectedPackage) {
      const selection: ProductionShootSelection = {
        type: shootType,
        package: packageType,
        totalPrice: selectedPackage.price
      };
      onSelectionChange(selection);
    }
  };

  const handleShootTypeChange = (type: typeof shootType) => {
    setShootType(type);
    setTimeout(updateSelection, 0);
  };

  const handlePackageChange = (pkg: typeof packageType) => {
    setPackageType(pkg);
    setTimeout(updateSelection, 0);
  };

  // Initialize selection
  React.useEffect(() => {
    updateSelection();
  }, []);

  return (
    <div className="glass rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center space-x-3">
        <span className="text-3xl">📸</span>
        <span className="bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
          Production Shoot Services
        </span>
      </h3>
      
      {/* Shoot Type Selection */}
      <div className="mb-8">
        <label className="block text-lg font-bold text-white mb-4">Select Shoot Type</label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shootTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => handleShootTypeChange(type.id)}
                className={`p-4 border-2 rounded-xl text-left transition-all duration-300 ${
                  shootType === type.id
                    ? 'border-cyan-400 bg-cyan-500/20 text-white'
                    : 'border-white/30 hover:border-white/50 text-white/80'
                }`}
              >
                <Icon className="w-6 h-6 mb-2" />
                <h4 className="font-bold text-sm mb-1">{type.name}</h4>
                <p className="text-xs">{type.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Package Selection */}
      {selectedShootType && (
        <div className="mb-8">
          <label className="block text-lg font-bold text-white mb-4">Select Package</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(selectedShootType.packages).map(([pkg, details]) => (
              <button
                key={pkg}
                onClick={() => handlePackageChange(pkg as typeof packageType)}
                className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 ${
                  packageType === pkg
                    ? 'border-cyan-400 bg-cyan-500/20 text-white'
                    : 'border-white/30 hover:border-white/50 text-white/80'
                }`}
              >
                <h4 className="font-bold text-xl mb-2 capitalize">{pkg} Package</h4>
                <p className="text-sm mb-4">{details.description}</p>
                <p className="text-lg font-bold text-yellow-400">{formatCurrency(details.price)}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Package Summary */}
      {selectedShootType && selectedPackage && (
        <div className="glass rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-white text-lg">
                {selectedShootType.name} - {packageType.charAt(0).toUpperCase() + packageType.slice(1)} Package
              </h4>
              <p className="text-white/70 mt-1">{selectedPackage.description}</p>
            </div>
            <span className="text-2xl font-bold text-yellow-400">
              {formatCurrency(selectedPackage.price)}
            </span>
          </div>
        </div>
      )}

      {/* Additional Information */}
      <div className="mt-6 bg-green-500/20 border border-green-400/30 rounded-xl p-6">
        <h4 className="font-bold text-green-200 mb-3">What's Included:</h4>
        <ul className="text-sm text-green-200 space-y-2">
          <li>• Professional equipment and crew</li>
          <li>• Pre-production planning and consultation</li>
          <li>• Post-production editing and enhancement</li>
          <li>• High-resolution final deliverables</li>
          <li>• 2 rounds of revisions included</li>
          <li>• Commercial usage rights</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductionShootSelector;