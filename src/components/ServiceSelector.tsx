import React, { useState, useRef } from 'react';
import { ChevronDown, Plus, Minus, Trash2, ExternalLink, Sparkles, Star, Check } from 'lucide-react';
import { serviceCategories } from '../data/services';
import { Service, SelectedService, SelectedSEOFeature, SelectedCombo, PosterSelection, PresentationSelection, VideoSelection, SocialMediaSelection, LeadGenerationSelection, ProductionShootSelection, WhatsAppSuiteSelection } from '../types';
import SEOFeatureSelector from './SEOFeatureSelector';
import SEOPackageDetails from './SEOPackageDetails';
import PosterSelector from './PosterSelector';
import PresentationSelector from './PresentationSelector';
import VideoSelector from './VideoSelector';
import SocialMediaSelector from './SocialMediaSelector';
import LeadGenerationSelector from './LeadGenerationSelector';
import ProductionShootSelector from './ProductionShootSelector';
import WhatsAppSuiteSelector from './WhatsAppSuiteSelector';
import ComboPackageSelector from './ComboPackageSelector';
import Tooltip from './Tooltip';
import AnimatedCounter from './AnimatedCounter';

interface ServiceSelectorProps {
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
  onServiceAdd: (service: Service) => void;
  onServiceRemove: (serviceId: string) => void;
  onQuantityChange: (serviceId: string, quantity: number) => void;
  onSEOFeatureAdd: (feature: SelectedSEOFeature) => void;
  onSEOFeatureRemove: (featureId: string) => void;
  onComboSelect: (combo: SelectedCombo) => void;
  onComboRemove: () => void;
  onPosterSelectionChange: (selection: PosterSelection | null) => void;
  onPresentationSelectionChange: (selection: PresentationSelection | null) => void;
  onVideoSelectionChange: (selection: VideoSelection | null) => void;
  onSocialMediaSelectionChange: (selection: SocialMediaSelection | null) => void;
  onLeadGenerationSelectionChange: (selection: LeadGenerationSelection | null) => void;
  onProductionShootSelectionChange: (selection: ProductionShootSelection | null) => void;
  onWhatsAppSuiteSelectionChange: (selection: WhatsAppSuiteSelection | null) => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
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
  onServiceAdd,
  onServiceRemove,
  onQuantityChange,
  onSEOFeatureAdd,
  onSEOFeatureRemove,
  onComboSelect,
  onComboRemove,
  onPosterSelectionChange,
  onPresentationSelectionChange,
  onVideoSelectionChange,
  onSocialMediaSelectionChange,
  onLeadGenerationSelectionChange,
  onProductionShootSelectionChange,
  onWhatsAppSuiteSelectionChange
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSEOFeatures, setShowSEOFeatures] = useState(false);
  const [showSEOPackageDetails, setShowSEOPackageDetails] = useState<'basic' | 'standard' | 'premium' | null>(null);
  
  const addToCartRef = useRef<HTMLDivElement>(null);
  const selectedServicesRef = useRef<HTMLDivElement>(null);

  const scrollToElement = (elementRef: React.RefObject<HTMLDivElement>) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsDropdownOpen(false);
    setShowSEOFeatures(false);
    
    // Scroll to add to cart section after category selection
    setTimeout(() => {
      scrollToElement(addToCartRef);
    }, 300);
  };

  const handleServiceAdd = (service: Service) => {
    if (service.id === 'seo-custom') {
      setShowSEOFeatures(true);
    } else if (service.id.includes('seo-') && service.id !== 'seo-custom') {
      const packageType = service.id.replace('seo-', '') as 'basic' | 'standard' | 'premium';
      setShowSEOPackageDetails(packageType);
    } else {
      onServiceAdd(service);
      // Scroll to selected services after adding
      setTimeout(() => {
        scrollToElement(selectedServicesRef);
      }, 300);
    }
  };

  const handleSEOPackageProceed = () => {
    if (showSEOPackageDetails) {
      const packageService = serviceCategories
        .find(cat => cat.id === 'seo')
        ?.services.find(s => s.id === `seo-${showSEOPackageDetails}`);
      
      if (packageService) {
        onServiceAdd(packageService);
        setTimeout(() => {
          scrollToElement(selectedServicesRef);
        }, 300);
      }
      setShowSEOPackageDetails(null);
    }
  };

  const handleSEOCustomPackageAdd = () => {
    if (selectedSEOFeatures.length > 0) {
      const totalPrice = selectedSEOFeatures.reduce((total, feature) => total + feature.price, 0);
      const customSEOService: Service = {
        id: 'seo-custom-pack',
        name: 'SEO Custom Pack',
        price: totalPrice,
        description: `Custom SEO package with ${selectedSEOFeatures.length} selected features`
      };
      
      onServiceAdd(customSEOService);
      
      // Clear SEO features after adding to cart
      selectedSEOFeatures.forEach(feature => {
        onSEOFeatureRemove(feature.featureId);
      });
      
      setShowSEOFeatures(false);
      
      setTimeout(() => {
        scrollToElement(selectedServicesRef);
      }, 300);
    }
  };

  const selectedCategoryData = serviceCategories.find(cat => cat.id === selectedCategory);

  const getTotalAmount = () => {
    const servicesTotal = selectedServices.reduce((total, item) => total + (item.service.price * item.quantity), 0);
    const comboTotal = selectedCombo ? selectedCombo.combo.price + selectedCombo.addOns.reduce((total, addOn) => total + addOn.price, 0) : 0;
    const posterTotal = posterSelection ? posterSelection.totalPrice : 0;
    const presentationTotal = presentationSelection ? presentationSelection.totalPrice : 0;
    const videoTotal = videoSelection ? videoSelection.totalPrice : 0;
    const socialMediaTotal = socialMediaSelection ? socialMediaSelection.totalPrice : 0;
    const leadGenerationTotal = leadGenerationSelection ? leadGenerationSelection.totalPrice : 0;
    const productionShootTotal = productionShootSelection ? productionShootSelection.totalPrice : 0;
    const whatsappSuiteTotal = whatsappSuiteSelection ? whatsappSuiteSelection.totalPrice : 0;
    
    return servicesTotal + comboTotal + posterTotal + presentationTotal + videoTotal + socialMediaTotal + leadGenerationTotal + productionShootTotal + whatsappSuiteTotal;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getCategoryIcon = (categoryId: string) => {
    const icons: Record<string, string> = {
      'combo-packages': '🎁',
      'seo': '📈',
      'website': '🌐',
      'web-applications': '💻',
      'whatsapp': '💬',
      'creative': '🎨',
      'presentation': '📊',
      'portfolio': '💼',
      'video': '🎬',
      'social-media': '📱',
      'production-shoot': '📸',
      'lead-generation': '🎯'
    };
    return icons[categoryId] || '⚡';
  };

  const hasSelectedItems = selectedServices.length > 0 || selectedCombo || posterSelection || presentationSelection || videoSelection || socialMediaSelection || leadGenerationSelection || productionShootSelection || whatsappSuiteSelection;

  // Organize categories in 2 columns of 6 each
  const leftColumnCategories = serviceCategories.slice(0, 6);
  const rightColumnCategories = serviceCategories.slice(6, 12);

  return (
    <div className="space-y-8">
      {/* Category Selector */}
      <div className="glass rounded-2xl p-8 card-hover animate-fadeInUp stagger-1 relative z-50">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Select Service Category
          </span>
        </h2>
        
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full glass border-2 border-white/30 rounded-2xl px-8 py-6 text-left flex items-center justify-between hover:border-cyan-400 focus:outline-none focus:border-cyan-400 transition-all duration-300 group shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center space-x-4">
              {selectedCategory && (
                <span className="text-3xl animate-bounce-gentle">
                  {getCategoryIcon(selectedCategory)}
                </span>
              )}
              <span className={`text-xl font-medium ${selectedCategory ? 'text-white' : 'text-white/60'}`}>
                {selectedCategory 
                  ? serviceCategories.find(cat => cat.id === selectedCategory)?.name 
                  : 'Choose a service category...'}
              </span>
            </div>
            <ChevronDown className={`w-7 h-7 text-white/60 transition-transform duration-300 group-hover:text-white ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="fixed inset-0 z-[9999]" onClick={() => setIsDropdownOpen(false)}>
              <div 
                className="absolute bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl overflow-hidden max-w-4xl"
                style={{
                  top: '100%',
                  left: '0',
                  right: '0',
                  marginTop: '12px'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid grid-cols-2 gap-1">
                  {/* Left Column */}
                  <div className="border-r border-gray-700">
                    {leftColumnCategories.map((category, index) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-800 transition-all duration-300 flex items-center space-x-3 group border-b border-gray-700 last:border-b-0"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <span className="text-2xl group-hover:animate-bounce-gentle">
                          {getCategoryIcon(category.id)}
                        </span>
                        <span className="text-white group-hover:text-cyan-300 transition-colors font-medium text-sm">
                          {category.name}
                        </span>
                        {category.id === 'combo-packages' && (
                          <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Right Column */}
                  <div>
                    {rightColumnCategories.map((category, index) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-800 transition-all duration-300 flex items-center space-x-3 group border-b border-gray-700 last:border-b-0"
                        style={{ animationDelay: `${(index + 6) * 0.05}s` }}
                      >
                        <span className="text-2xl group-hover:animate-bounce-gentle">
                          {getCategoryIcon(category.id)}
                        </span>
                        <span className="text-white group-hover:text-cyan-300 transition-colors font-medium text-sm">
                          {category.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add to Cart Section */}
      <div ref={addToCartRef}>
        {/* SEO Package Details Modal */}
        {showSEOPackageDetails && (
          <SEOPackageDetails
            packageType={showSEOPackageDetails}
            onClose={() => setShowSEOPackageDetails(null)}
            onProceed={handleSEOPackageProceed}
          />
        )}

        {/* Combo Package Selector */}
        {selectedCategory === 'combo-packages' && (
          <div className="animate-slideInFromTop">
            <ComboPackageSelector onComboSelect={onComboSelect} />
          </div>
        )}

        {/* SEO Feature Selector */}
        {selectedCategory === 'seo' && showSEOFeatures && (
          <div className="animate-slideInFromTop">
            <SEOFeatureSelector
              selectedFeatures={selectedSEOFeatures}
              onFeatureAdd={onSEOFeatureAdd}
              onFeatureRemove={onSEOFeatureRemove}
            />
            
            {/* Add SEO Custom Pack to Cart */}
            {selectedSEOFeatures.length > 0 && (
              <div className="mt-6 glass rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">SEO Custom Pack</h3>
                    <p className="text-white/70">{selectedSEOFeatures.length} selected features</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-yellow-400">
                      <AnimatedCounter 
                        value={selectedSEOFeatures.reduce((total, feature) => total + feature.price, 0)} 
                        prefix="₹" 
                      />
                    </span>
                    <button
                      onClick={handleSEOCustomPackageAdd}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-bold flex items-center space-x-2 group transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Plus className="w-5 h-5 group-hover:animate-bounce-gentle" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Poster Selector */}
        {selectedCategory === 'creative' && (
          <div className="animate-slideInFromTop">
            <PosterSelector onSelectionChange={onPosterSelectionChange} />
          </div>
        )}

        {/* Presentation Selector */}
        {selectedCategory === 'presentation' && (
          <div className="animate-slideInFromTop">
            <PresentationSelector onSelectionChange={onPresentationSelectionChange} />
          </div>
        )}

        {/* Video Selector */}
        {selectedCategory === 'video' && (
          <div className="animate-slideInFromTop">
            <VideoSelector onSelectionChange={onVideoSelectionChange} />
          </div>
        )}

        {/* Social Media Selector */}
        {selectedCategory === 'social-media' && (
          <div className="animate-slideInFromTop">
            <SocialMediaSelector onSelectionChange={onSocialMediaSelectionChange} />
          </div>
        )}

        {/* Lead Generation Selector */}
        {selectedCategory === 'lead-generation' && (
          <div className="animate-slideInFromTop">
            <LeadGenerationSelector onSelectionChange={onLeadGenerationSelectionChange} />
          </div>
        )}

        {/* Production Shoot Selector */}
        {selectedCategory === 'production-shoot' && (
          <div className="animate-slideInFromTop">
            <ProductionShootSelector onSelectionChange={onProductionShootSelectionChange} />
          </div>
        )}

        {/* WhatsApp Suite Selector */}
        {selectedCategory === 'whatsapp' && (
          <div className="animate-slideInFromTop">
            <WhatsAppSuiteSelector 
              onSelectionChange={onWhatsAppSuiteSelectionChange}
              existingSelection={whatsappSuiteSelection}
            />
          </div>
        )}

        {/* Service Options */}
        {selectedCategoryData && !showSEOFeatures && !['creative', 'presentation', 'video', 'combo-packages', 'social-media', 'lead-generation', 'production-shoot', 'whatsapp'].includes(selectedCategory) && (
          <div className="glass rounded-2xl p-8 animate-slideInFromTop">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center space-x-4">
              <span className="text-4xl animate-bounce-gentle">{getCategoryIcon(selectedCategory)}</span>
              <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                {selectedCategoryData.name}
              </span>
            </h3>
            
            <div className="grid gap-8">
              {selectedCategoryData.services.map((service, index) => {
                const isSelected = selectedServices.some(item => item.service.id === service.id);
                
                return (
                  <div 
                    key={service.id} 
                    className="glass border border-white/20 rounded-2xl p-8 hover:border-cyan-400 transition-all duration-300 card-hover animate-fadeInUp shadow-lg hover:shadow-xl"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Special badge for logo design */}
                    {service.id === 'logo-design' && (
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                        🎨 NEW!
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h4 className="font-bold text-white text-xl">{service.name}</h4>
                          {service.tooltip && (
                            <Tooltip content={service.tooltip} />
                          )}
                          {service.id === 'logo-design' && (
                            <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-lg px-2 py-1">
                              <span className="text-yellow-300 text-xs font-medium">💡 Combo with Website = 20% OFF</span>
                            </div>
                          )}
                        </div>
                        {service.description && (
                          <p className="text-white/80 mt-3 text-lg">{service.description}</p>
                        )}
                        {service.price > 0 && (
                          <p className="text-3xl font-bold text-yellow-400 mt-4">
                            {formatCurrency(service.price)}
                          </p>
                        )}
                        {service.sampleUrl && (
                          <a
                            href={service.sampleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-cyan-300 hover:text-cyan-200 text-sm mt-4 group"
                          >
                            <span>View Sample</span>
                            <ExternalLink className="w-4 h-4 group-hover:animate-bounce-gentle" />
                          </a>
                        )}
                        {service.requiresForm && (
                          <p className="text-sm text-cyan-300 mt-3">Click to submit requirements - Our team will contact you in 48 hours</p>
                        )}
                        {service.id === 'seo-custom' && (
                          <p className="text-sm text-cyan-300 mt-3">Click to build custom package</p>
                        )}
                      </div>
                      
                      <div className="ml-8">
                        {!isSelected ? (
                          <button
                            onClick={() => handleServiceAdd(service)}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-3 group transition-all duration-300 shadow-lg hover:shadow-xl"
                          >
                            <Plus className="w-6 h-6 group-hover:animate-bounce-gentle" />
                            <span>
                              {service.requiresForm ? 'Submit Requirements' : 
                               service.id === 'seo-custom' ? 'Build' : 
                               service.id.includes('seo-') && service.id !== 'seo-custom' ? 'Details' : 'Add'}
                            </span>
                          </button>
                        ) : (
                          <div className="flex items-center space-x-4 animate-zoomIn">
                            <button
                              onClick={() => {
                                const currentItem = selectedServices.find(item => item.service.id === service.id);
                                if (currentItem && currentItem.quantity > 1) {
                                  onQuantityChange(service.id, currentItem.quantity - 1);
                                } else {
                                  onServiceRemove(service.id);
                                }
                              }}
                              className="glass border border-white/30 text-white p-4 rounded-2xl hover:bg-red-500/20 hover:border-red-400 transition-all duration-300"
                            >
                              <Minus className="w-6 h-6" />
                            </button>
                            
                            <span className="font-bold text-white text-2xl min-w-[4rem] text-center animate-countUp">
                              {selectedServices.find(item => item.service.id === service.id)?.quantity || 0}
                            </span>
                            
                            <button
                              onClick={() => {
                                const currentItem = selectedServices.find(item => item.service.id === service.id);
                                if (currentItem) {
                                  onQuantityChange(service.id, currentItem.quantity + 1);
                                }
                              }}
                              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                              <Plus className="w-6 h-6" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Selected Services Summary */}
      {hasSelectedItems && (
        <div ref={selectedServicesRef} className="glass rounded-2xl p-8 animate-fadeInUp stagger-4">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
              <Check className="w-6 h-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Selected Services
            </span>
          </h3>
          
          <div className="space-y-6">
            {/* Selected Combo Package */}
            {selectedCombo && (
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-2xl p-8 animate-glow">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-6">
                    <span className="text-4xl animate-bounce-gentle">{selectedCombo.combo.icon}</span>
                    <div>
                      <h4 className="font-bold text-purple-300 text-xl">{selectedCombo.combo.name}</h4>
                      <p className="text-sm text-purple-200">Combo Package</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="font-bold text-yellow-400 text-2xl">
                      <AnimatedCounter 
                        value={selectedCombo.combo.price + selectedCombo.addOns.reduce((total, addOn) => total + addOn.price, 0)}
                        prefix="₹"
                      />
                    </span>
                    <button
                      onClick={onComboRemove}
                      className="text-red-400 hover:text-red-300 p-3 hover:bg-red-500/20 rounded-xl transition-all duration-300"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                
                {selectedCombo.addOns.length > 0 && (
                  <div className="border-t border-purple-400/30 pt-6">
                    <p className="text-sm font-medium text-purple-300 mb-4">Add-ons:</p>
                    <div className="space-y-3">
                      {selectedCombo.addOns.map((addOn, index) => (
                        <div 
                          key={addOn.id} 
                          className="flex justify-between text-sm text-purple-200 animate-fadeInUp"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <span>{addOn.name}</span>
                          <span><AnimatedCounter value={addOn.price} prefix="₹" /></span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Regular Services */}
            {selectedServices.map((item, index) => (
              <div 
                key={item.service.id} 
                className="flex items-center justify-between py-6 border-b border-white/10 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <h4 className="font-bold text-white text-lg">{item.service.name}</h4>
                    {item.service.tooltip && (
                      <Tooltip content={item.service.tooltip} />
                    )}
                    {item.service.id === 'logo-design' && (
                      <span className="bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded-lg text-xs font-medium">
                        🎨 Logo Design
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-white/70 mt-1">
                    <AnimatedCounter value={item.service.price} prefix="₹" /> × {item.quantity}
                  </p>
                </div>
                
                <div className="flex items-center space-x-6">
                  <span className="font-bold text-yellow-400 text-xl">
                    <AnimatedCounter value={item.service.price * item.quantity} prefix="₹" />
                  </span>
                  <button
                    onClick={() => onServiceRemove(item.service.id)}
                    className="text-red-400 hover:text-red-300 p-3 hover:bg-red-500/20 rounded-xl transition-all duration-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Other selections */}
            {posterSelection && (
              <div className="flex items-center justify-between py-6 border-b border-white/10 animate-fadeInUp">
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg">
                    {posterSelection.type.charAt(0).toUpperCase() + posterSelection.type.slice(1)} Posters
                  </h4>
                  <p className="text-sm text-white/70 mt-1">
                    {posterSelection.quantity} posters × <AnimatedCounter value={posterSelection.unitPrice} prefix="₹" /> (3 revisions included)
                  </p>
                </div>
                
                <div className="flex items-center space-x-6">
                  <span className="font-bold text-yellow-400 text-xl">
                    <AnimatedCounter value={posterSelection.totalPrice} prefix="₹" />
                  </span>
                  <button
                    onClick={() => onPosterSelectionChange(null)}
                    className="text-red-400 hover:text-red-300 p-3 hover:bg-red-500/20 rounded-xl transition-all duration-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {presentationSelection && (
              <div className="flex items-center justify-between py-6 border-b border-white/10 animate-fadeInUp">
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg">
                    {presentationSelection.type.charAt(0).toUpperCase() + presentationSelection.type.slice(1)} Presentation
                  </h4>
                  <p className="text-sm text-white/70 mt-1">
                    {presentationSelection.slides} slides
                  </p>
                </div>
                
                <div className="flex items-center space-x-6">
                  <span className="font-bold text-yellow-400 text-xl">
                    <AnimatedCounter value={presentationSelection.totalPrice} prefix="₹" />
                  </span>
                  <button
                    onClick={() => onPresentationSelectionChange(null)}
                    className="text-red-400 hover:text-red-300 p-3 hover:bg-red-500/20 rounded-xl transition-all duration-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {videoSelection && (
              <div className="flex items-center justify-between py-6 border-b border-white/10 animate-fadeInUp">
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg">
                    {videoSelection.type.charAt(0).toUpperCase() + videoSelection.type.slice(1)} Video
                  </h4>
                  <p className="text-sm text-white/70 mt-1">
                    {videoSelection.quantity} video{videoSelection.quantity > 1 ? 's' : ''} × <AnimatedCounter value={videoSelection.unitPrice} prefix="₹" />
                  </p>
                </div>
                
                <div className="flex items-center space-x-6">
                  <span className="font-bold text-yellow-400 text-xl">
                    <AnimatedCounter value={videoSelection.totalPrice} prefix="₹" />
                  </span>
                  <button
                    onClick={() => onVideoSelectionChange(null)}
                    className="text-red-400 hover:text-red-300 p-3 hover:bg-red-500/20 rounded-xl transition-all duration-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {socialMediaSelection && (
              <div className="flex items-center justify-between py-6 border-b border-white/10 animate-fadeInUp">
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg">
                    Social Media {socialMediaSelection.type.charAt(0).toUpperCase() + socialMediaSelection.type.slice(1)} Package
                  </h4>
                  <p className="text-sm text-white/70 mt-1">
                    {socialMediaSelection.type === 'custom' 
                      ? `${socialMediaSelection.posts} posts, ${socialMediaSelection.reels} reels, ${socialMediaSelection.carousels} carousels`
                      : `${socialMediaSelection.posts} posts, ${socialMediaSelection.stories} stories, ${socialMediaSelection.reels} reels`
                    }
                    {socialMediaSelection.managementIncluded && ' (Management included)'}
                  </p>
                </div>
                
                <div className="flex items-center space-x-6">
                  <span className="font-bold text-yellow-400 text-xl">
                    <AnimatedCounter value={socialMediaSelection.totalPrice} prefix="₹" />
                  </span>
                  <button
                    onClick={() => onSocialMediaSelectionChange(null)}
                    className="text-red-400 hover:text-red-300 p-3 hover:bg-red-500/20 rounded-xl transition-all duration-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {leadGenerationSelection && (
              <div className="flex items-center justify-between py-6 border-b border-white/10 animate-fadeInUp">
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg">
                    {leadGenerationSelection.type === 'combo' ? 'All Platforms Combo' : 
                     leadGenerationSelection.type.charAt(0).toUpperCase() + leadGenerationSelection.type.slice(1) + ' Ads'} Package
                  </h4>
                  <p className="text-sm text-white/70 mt-1">
                    Lead generation campaign {leadGenerationSelection.adSpendIncluded && '+ ad spend'}
                  </p>
                </div>
                
                <div className="flex items-center space-x-6">
                  <span className="font-bold text-yellow-400 text-xl">
                    <AnimatedCounter value={leadGenerationSelection.totalPrice} prefix="₹" />
                    {leadGenerationSelection.adSpendIncluded && <span className="text-sm text-white/70 ml-1">+ ad spend</span>}
                  </span>
                  <button
                    onClick={() => onLeadGenerationSelectionChange(null)}
                    className="text-red-400 hover:text-red-300 p-3 hover:bg-red-500/20 rounded-xl transition-all duration-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {productionShootSelection && (
              <div className="flex items-center justify-between py-6 border-b border-white/10 animate-fadeInUp">
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg">
                    {productionShootSelection.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} - {productionShootSelection.package.charAt(0).toUpperCase() + productionShootSelection.package.slice(1)} Package
                  </h4>
                  <p className="text-sm text-white/70 mt-1">
                    Professional production shoot services
                  </p>
                </div>
                
                <div className="flex items-center space-x-6">
                  <span className="font-bold text-yellow-400 text-xl">
                    <AnimatedCounter value={productionShootSelection.totalPrice} prefix="₹" />
                  </span>
                  <button
                    onClick={() => onProductionShootSelectionChange(null)}
                    className="text-red-400 hover:text-red-300 p-3 hover:bg-red-500/20 rounded-xl transition-all duration-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {whatsappSuiteSelection && (
              <div className="flex items-center justify-between py-6 border-b border-white/10 animate-fadeInUp">
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg">
                    WhatsApp Suite - {whatsappSuiteSelection.planType === 'custom' ? 'Custom Package' : 
                    whatsappSuiteSelection.planDetails?.name || 'Selected Plan'}
                  </h4>
                  <p className="text-sm text-white/70 mt-1">
                    {whatsappSuiteSelection.planType === 'custom' 
                      ? `${parseInt(whatsappSuiteSelection.customConfig?.baseVolume || '0').toLocaleString()} messages with custom features`
                      : `${whatsappSuiteSelection.planDetails?.messages?.toLocaleString()} messages`
                    }
                  </p>
                </div>
                
                <div className="flex items-center space-x-6">
                  <span className="font-bold text-yellow-400 text-xl">
                    <AnimatedCounter value={whatsappSuiteSelection.totalPrice} prefix="₹" />
                  </span>
                  <button
                    onClick={() => onWhatsAppSuiteSelectionChange(null)}
                    className="text-red-400 hover:text-red-300 p-3 hover:bg-red-500/20 rounded-xl transition-all duration-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-10 pt-8 border-t border-white/20">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-white">Total Amount:</span>
              <span className="text-4xl font-bold text-yellow-400">
                <AnimatedCounter value={getTotalAmount()} prefix="₹" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Back to Services Button */}
      {showSEOFeatures && (
        <div className="flex justify-center animate-fadeInUp">
          <button
            onClick={() => setShowSEOFeatures(false)}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-10 py-4 rounded-2xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl"
          >
            Back to SEO Packages
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceSelector;