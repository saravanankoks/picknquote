import React, { useState } from 'react';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import { SelectedService, SelectedSEOFeature, SelectedCombo, PromoCode, PosterSelection, PresentationSelection, VideoSelection, SocialMediaSelection, LeadGenerationSelection, ProductionShootSelection, WhatsAppSuiteSelection } from '../types';
import { seoFeatures } from '../data/seoFeatures';
import { calculateDiscount } from '../data/promoCodes';

interface OrderSummaryProps {
  selectedServices: SelectedService[];
  selectedSEOFeatures: SelectedSEOFeature[];
  selectedCombo: SelectedCombo | null;
  posterSelection: PosterSelection | null;
  presentationSelection: PresentationSelection | null;
  videoSelection: VideoSelection | null;
  socialMediaSelection: SocialMediaSelection | null;
  leadGenerationSelection: LeadGenerationSelection | null;
  productionShootSelection: ProductionShootSelection | null;
  whatsappSuiteSelection: WhatsAppSuiteSelection | null;
  appliedPromoCode: PromoCode | null;
  onBack: () => void;
  onGeneratePDF: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedServices,
  selectedSEOFeatures,
  selectedCombo,
  posterSelection,
  presentationSelection,
  videoSelection,
  socialMediaSelection,
  leadGenerationSelection,
  productionShootSelection,
  whatsappSuiteSelection,
  appliedPromoCode,
  onBack,
  onGeneratePDF
}) => {
  const [includeGST] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    onBack();
    scrollToTop();
  };

  const getSubtotal = () => {
    const servicesTotal = selectedServices.reduce((total, item) => total + (item.service.price * item.quantity), 0);
    const seoFeaturesTotal = selectedSEOFeatures.reduce((total, feature) => total + feature.price, 0);
    const comboTotal = selectedCombo ? selectedCombo.combo.price + selectedCombo.addOns.reduce((total, addOn) => total + addOn.price, 0) : 0;
    const posterTotal = posterSelection ? posterSelection.totalPrice : 0;
    const presentationTotal = presentationSelection ? presentationSelection.totalPrice : 0;
    const videoTotal = videoSelection ? videoSelection.totalPrice : 0;
    const socialMediaTotal = socialMediaSelection ? socialMediaSelection.totalPrice : 0;
    const leadGenerationTotal = leadGenerationSelection ? leadGenerationSelection.totalPrice : 0;
    const productionShootTotal = productionShootSelection ? productionShootSelection.totalPrice : 0;
    const whatsappSuiteTotal = whatsappSuiteSelection ? whatsappSuiteSelection.totalPrice : 0;
    
    return servicesTotal + seoFeaturesTotal + comboTotal + posterTotal + presentationTotal + videoTotal + socialMediaTotal + leadGenerationTotal + productionShootTotal + whatsappSuiteTotal;
  };

  const getDiscountAmount = () => {
    return appliedPromoCode ? calculateDiscount(getSubtotal(), appliedPromoCode) : 0;
  };

  const getAmountAfterDiscount = () => {
    return getSubtotal() - getDiscountAmount();
  };

  const getGSTAmount = () => {
    return includeGST ? getAmountAfterDiscount() * 0.18 : 0;
  };

  const getTotalAmount = () => {
    return getAmountAfterDiscount() + getGSTAmount();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const allItems = [
    // Combo Package
    ...(selectedCombo ? [{
      type: 'combo' as const,
      name: selectedCombo.combo.name,
      description: selectedCombo.combo.description,
      quantity: 1,
      unitPrice: selectedCombo.combo.price,
      total: selectedCombo.combo.price,
      isCombo: true
    }] : []),
    // Combo Add-ons
    ...(selectedCombo ? selectedCombo.addOns.map(addOn => ({
      type: 'combo-addon' as const,
      name: `${addOn.name} (Add-on)`,
      description: addOn.description,
      quantity: 1,
      unitPrice: addOn.price,
      total: addOn.price,
      isCombo: true
    })) : []),
    // Regular Services
    ...selectedServices.map(item => ({
      type: 'service' as const,
      name: item.service.name,
      description: item.service.description,
      quantity: item.quantity,
      unitPrice: item.service.price,
      total: item.service.price * item.quantity,
      isCombo: false
    })),
    // SEO Features
    ...selectedSEOFeatures.map(feature => {
      const featureData = seoFeatures.find(f => f.id === feature.featureId);
      return {
        type: 'seo-feature' as const,
        name: featureData?.name || 'SEO Feature',
        description: `${feature.selectedTier.charAt(0).toUpperCase() + feature.selectedTier.slice(1)} - ${feature.description}`,
        quantity: 1,
        unitPrice: feature.price,
        total: feature.price,
        isCombo: false
      };
    }),
    // Poster Selection
    ...(posterSelection ? [{
      type: 'poster' as const,
      name: `${posterSelection.type.charAt(0).toUpperCase() + posterSelection.type.slice(1)} Posters`,
      description: `${posterSelection.quantity} high-quality poster designs (3 revisions included)`,
      quantity: posterSelection.quantity,
      unitPrice: posterSelection.unitPrice,
      total: posterSelection.totalPrice,
      isCombo: false
    }] : []),
    // Presentation Selection
    ...(presentationSelection ? [{
      type: 'presentation' as const,
      name: `${presentationSelection.type.charAt(0).toUpperCase() + presentationSelection.type.slice(1)} Presentation`,
      description: `Professional presentation with ${presentationSelection.slides} slides`,
      quantity: 1,
      unitPrice: presentationSelection.totalPrice,
      total: presentationSelection.totalPrice,
      isCombo: false
    }] : []),
    // Video Selection
    ...(videoSelection ? [{
      type: 'video' as const,
      name: `${videoSelection.type.charAt(0).toUpperCase() + videoSelection.type.slice(1)} Video`,
      description: `Professional video content`,
      quantity: videoSelection.quantity,
      unitPrice: videoSelection.unitPrice,
      total: videoSelection.totalPrice,
      isCombo: false
    }] : []),
    // Social Media Selection
    ...(socialMediaSelection ? [{
      type: 'social-media' as const,
      name: `Social Media ${socialMediaSelection.type.charAt(0).toUpperCase() + socialMediaSelection.type.slice(1)} Package`,
      description: socialMediaSelection.type === 'custom' 
        ? `${socialMediaSelection.posts || 0} posts, ${socialMediaSelection.reels || 0} reels, ${socialMediaSelection.carousels || 0} carousels, ${socialMediaSelection.motionPosters || 0} motion posters (No management)`
        : `${socialMediaSelection.posts} posts, ${socialMediaSelection.stories} stories, ${socialMediaSelection.reels} reels (Full management)`,
      quantity: 1,
      unitPrice: socialMediaSelection.totalPrice,
      total: socialMediaSelection.totalPrice,
      isCombo: false
    }] : []),
    // Lead Generation Selection
    ...(leadGenerationSelection ? [{
      type: 'lead-generation' as const,
      name: `${leadGenerationSelection.type === 'combo' ? 'All Platforms Combo' : 
             leadGenerationSelection.type.charAt(0).toUpperCase() + leadGenerationSelection.type.slice(1) + ' Ads'} Package`,
      description: `Lead generation campaign${leadGenerationSelection.adSpendIncluded ? ' (+ ad spend)' : ''}`,
      quantity: 1,
      unitPrice: leadGenerationSelection.totalPrice,
      total: leadGenerationSelection.totalPrice,
      isCombo: false
    }] : []),
    // Production Shoot Selection
    ...(productionShootSelection ? [{
      type: 'production-shoot' as const,
      name: `${productionShootSelection.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} - ${productionShootSelection.package.charAt(0).toUpperCase() + productionShootSelection.package.slice(1)} Package`,
      description: `Professional production shoot services`,
      quantity: 1,
      unitPrice: productionShootSelection.totalPrice,
      total: productionShootSelection.totalPrice,
      isCombo: false
    }] : []),
    // WhatsApp Suite Selection
    ...(whatsappSuiteSelection ? [{
      type: 'whatsapp-suite' as const,
      name: `WhatsApp Suite - ${whatsappSuiteSelection.planType === 'custom' ? 'Custom Package' : 
             whatsappSuiteSelection.planDetails?.name || 'Selected Plan'}`,
      description: whatsappSuiteSelection.planType === 'custom' 
        ? `${parseInt(whatsappSuiteSelection.customConfig?.baseVolume || '0').toLocaleString()} messages with custom features`
        : `${whatsappSuiteSelection.planDetails?.messages?.toLocaleString()} messages - ${whatsappSuiteSelection.planType} plan`,
      quantity: 1,
      unitPrice: whatsappSuiteSelection.totalPrice,
      total: whatsappSuiteSelection.totalPrice,
      isCombo: false
    }] : [])
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl transition-colors font-bold shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Selection</span>
        </button>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
          <button
            onClick={onGeneratePDF}
            className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg transition-colors font-bold"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div id="order-summary" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* Company Header */}
        <div className="text-center mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <img 
              src="/TMM_Logo.jpg" 
              alt="TMM Logo" 
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TheMadrasMarketeer</h1>
              <p className="text-gray-600">Digital Marketing Solutions</p>
            </div>
          </div>
        </div>

        {/* Quote Details */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Service Quotation</h2>
              <p className="text-gray-600">Date: {getCurrentDate()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Quote #: TMM-{Date.now().toString().slice(-6)}</p>
              <p className="text-sm text-gray-600">Valid for: 30 days</p>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 font-semibold text-gray-900">Service</th>
                <th className="text-center py-3 font-semibold text-gray-900">Quantity</th>
                <th className="text-right py-3 font-semibold text-gray-900">Unit Price</th>
                <th className="text-right py-3 font-semibold text-gray-900">Total</th>
              </tr>
            </thead>
            <tbody>
              {allItems.map((item, index) => (
                <tr key={`${item.type}-${index}`} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${item.isCombo ? 'bg-primary-50' : ''}`}>
                  <td className="py-4">
                    <div>
                      <p className={`font-medium ${item.isCombo ? 'text-primary-900' : 'text-gray-900'}`}>
                        {item.name}
                        {item.isCombo && <span className="ml-2 text-xs bg-primary-200 text-primary-800 px-2 py-1 rounded">COMBO</span>}
                      </p>
                      {item.description && (
                        <p className={`text-sm ${item.isCombo ? 'text-primary-700' : 'text-gray-600'}`}>{item.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 text-center">{item.quantity}</td>
                  <td className="py-4 text-right">{formatCurrency(item.unitPrice)}</td>
                  <td className="py-4 text-right font-medium">
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{formatCurrency(getSubtotal())}</span>
              </div>
              
              {appliedPromoCode && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-600">Discount ({appliedPromoCode.code}):</span>
                  <span className="font-medium text-green-600">-{formatCurrency(getDiscountAmount())}</span>
                </div>
              )}
              
              {/* GST Display - Only show amount if GST is included */}
              {getGSTAmount() > 0 && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">GST (18%):</span>
                  <span className="font-medium">{formatCurrency(getGSTAmount())}</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                  <span className="text-xl font-bold text-primary-600">
                    {formatCurrency(getTotalAmount())}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Combo Package Savings */}
        {selectedCombo && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">🎉 Combo Package Savings!</h3>
            <p className="text-sm text-green-800">
              You saved <strong>{formatCurrency(selectedCombo.combo.originalPrice - selectedCombo.combo.price)}</strong> ({selectedCombo.combo.discount}% off) by choosing the {selectedCombo.combo.name}!
            </p>
          </div>
        )}

        {/* Promo Code Savings */}
        {appliedPromoCode && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">💰 Promo Code Applied!</h3>
            <p className="text-sm text-blue-800">
              <strong>{appliedPromoCode.code}</strong> - {appliedPromoCode.description}
            </p>
            <p className="text-sm text-blue-800">
              You saved <strong>{formatCurrency(getDiscountAmount())}</strong> with this promo code!
            </p>
          </div>
        )}

        {/* Terms and Contact */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Terms & Conditions:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 50% advance payment required</li>
                <li>• Delivery within agreed timeline</li>
                <li>• 3 rounds of revisions included for posters</li>
                <li>• 2 rounds of revisions for other services</li>
                <li>• Final payment due on completion</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact Information:</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>SaravanaKumar</p>
                <p>Phone: 8825065657</p>
                <p>Email: letsconnect@themadrasmarketeer.com</p>
                <p>Egmore, Chennai</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;