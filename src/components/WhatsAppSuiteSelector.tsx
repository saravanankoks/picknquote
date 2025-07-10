import React, { useState } from 'react';
import { Check, Star, Plus, Minus } from 'lucide-react';
import { WhatsAppSuiteSelection } from '../types';

interface WhatsAppSuiteSelectorProps {
  onSelectionChange: (selection: WhatsAppSuiteSelection | null) => void;
  existingSelection?: WhatsAppSuiteSelection | null;
}

const WhatsAppSuiteSelector: React.FC<WhatsAppSuiteSelectorProps> = ({ 
  onSelectionChange, 
  existingSelection 
}) => {
  const [planType, setPlanType] = useState<'yearly' | 'cost-per-message' | 'custom'>(
    existingSelection?.planType || 'yearly'
  );
  
  // Custom plan state
  const [customConfig, setCustomConfig] = useState({
    baseVolume: existingSelection?.customConfig?.baseVolume || '5000',
    imageText: existingSelection?.customConfig?.imageText || false,
    documentText: existingSelection?.customConfig?.documentText || false,
    leadForms: existingSelection?.customConfig?.leadForms || 0,
    googleSheetIntegration: existingSelection?.customConfig?.googleSheetIntegration || false,
    autoReply: existingSelection?.customConfig?.autoReply || false,
    templates: existingSelection?.customConfig?.templates || 0,
    strategySession: existingSelection?.customConfig?.strategySession || false,
    prebuiltFunnel: existingSelection?.customConfig?.prebuiltFunnel || false,
    supportLevel: existingSelection?.customConfig?.supportLevel || 'email'
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const yearlyPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 4999,
      messages: 20000,
      color: 'green',
      features: {
        textOnly: true,
        imageText: false,
        documentText: false,
        leadForm: false,
        autoReply: false,
        adminNotification: false,
        googleSheet: false,
        campaignReport: false,
        support: 'Email Support'
      }
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 9999,
      messages: 40000,
      color: 'blue',
      popular: true,
      features: {
        textOnly: true,
        imageText: true,
        documentText: false,
        leadForm: true,
        autoReply: true,
        adminNotification: false,
        googleSheet: false,
        campaignReport: true,
        support: 'WhatsApp Support'
      }
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 14999,
      messages: 80000,
      color: 'purple',
      features: {
        textOnly: true,
        imageText: true,
        documentText: true,
        leadForm: true,
        autoReply: true,
        adminNotification: true,
        googleSheet: true,
        campaignReport: true,
        support: 'Priority Support'
      }
    }
  ];

  const costPerMessagePlans = [
    {
      id: 'lite',
      name: 'Lite',
      messages: 5000,
      price: 1499,
      costPerMessage: 0.30,
      formats: 'Text only',
      leadForm: false,
      autoReply: false,
      support: 'Email'
    },
    {
      id: 'smart',
      name: 'Smart',
      messages: 10000,
      price: 2799,
      costPerMessage: 0.28,
      formats: 'Text + Image',
      leadForm: false,
      autoReply: false,
      support: 'WhatsApp'
    },
    {
      id: 'pro',
      name: 'Pro',
      messages: 25000,
      price: 6499,
      costPerMessage: 0.26,
      formats: 'Text + Image + Document',
      leadForm: false,
      autoReply: false,
      support: 'WhatsApp'
    },
    {
      id: 'business',
      name: 'Business',
      messages: 50000,
      price: 11999,
      costPerMessage: 0.24,
      formats: 'All Formats',
      leadForm: true,
      autoReply: true,
      support: 'Priority'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      messages: 100000,
      price: 21999,
      costPerMessage: 0.22,
      formats: 'All Formats',
      leadForm: true,
      autoReply: true,
      support: 'Dedicated'
    }
  ];

  const addOns = [
    { id: 'extra-messages-yearly', name: 'Extra 10,000 Messages', price: 1499, category: 'messages' },
    { id: 'image-text-unlock', name: 'Image + Text Messaging (Unlock in Starter)', price: 799, category: 'formats' },
    { id: 'document-text-unlock', name: 'Document + Text Messaging (Unlock in Starter/Standard)', price: 999, category: 'formats' },
    { id: 'extra-lead-form', name: 'Extra Lead Form Setup', price: 999, category: 'leads' },
    { id: 'auto-reply-setup', name: 'Auto WhatsApp Reply Setup', price: 999, category: 'automation' },
    { id: 'google-sheet-pipeline', name: 'Lead to Google Sheet / CRM Pipeline', price: 999, category: 'integration' },
    { id: 'custom-template', name: 'Custom WhatsApp Template', price: 499, category: 'templates' },
    { id: 'strategy-call', name: '30-min Campaign Strategy Call', price: 999, category: 'consultation' }
  ];

  const getBaseVolumePrice = (volume: string) => {
    const prices: Record<string, number> = {
      '5000': 1499,
      '10000': 2799,
      '25000': 6499,
      '50000': 11999,
      '100000': 21999
    };
    return prices[volume] || 0;
  };

  const calculateCustomPrice = () => {
    let total = getBaseVolumePrice(customConfig.baseVolume);
    
    // Media formats
    if (customConfig.imageText && ['5000', '10000'].includes(customConfig.baseVolume)) {
      total += 499;
    }
    if (customConfig.documentText && ['5000', '10000', '25000'].includes(customConfig.baseVolume)) {
      total += 699;
    }
    
    // Lead management
    total += customConfig.leadForms * 999;
    if (customConfig.googleSheetIntegration) total += 999;
    if (customConfig.autoReply) total += 999;
    
    // Automation & templates
    total += customConfig.templates * 499;
    if (customConfig.strategySession) total += 999;
    if (customConfig.prebuiltFunnel) total += 1499;
    
    // Support
    if (customConfig.supportLevel === 'whatsapp') total += 399;
    if (customConfig.supportLevel === 'priority') total += 799;
    
    return total;
  };

  const getSuggestedUpgrade = () => {
    const customPrice = calculateCustomPrice();
    const volume = parseInt(customConfig.baseVolume);
    
    // Check if custom config matches any standard plan
    for (const plan of costPerMessagePlans) {
      if (plan.messages === volume && Math.abs(plan.price - customPrice) <= 500) {
        return {
          plan: plan.name,
          savings: customPrice - plan.price
        };
      }
    }
    return null;
  };

  const updateSelection = (type: 'yearly' | 'cost-per-message' | 'custom', planId?: string) => {
    let selection: WhatsAppSuiteSelection;

    if (type === 'yearly' && planId) {
      const plan = yearlyPlans.find(p => p.id === planId);
      if (!plan) return;
      
      selection = {
        planType: 'yearly',
        selectedPlan: planId,
        totalPrice: plan.price,
        planDetails: {
          name: plan.name,
          messages: plan.messages,
          features: plan.features
        }
      };
    } else if (type === 'cost-per-message' && planId) {
      const plan = costPerMessagePlans.find(p => p.id === planId);
      if (!plan) return;
      
      selection = {
        planType: 'cost-per-message',
        selectedPlan: planId,
        totalPrice: plan.price,
        planDetails: {
          name: plan.name,
          messages: plan.messages,
          costPerMessage: plan.costPerMessage
        }
      };
    } else if (type === 'custom') {
      selection = {
        planType: 'custom',
        totalPrice: calculateCustomPrice(),
        customConfig: { ...customConfig }
      };
    } else {
      return;
    }

    onSelectionChange(selection);
  };

  const handlePlanTypeChange = (type: 'yearly' | 'cost-per-message' | 'custom') => {
    setPlanType(type);
    if (type === 'yearly') {
      updateSelection('yearly', 'standard');
    } else if (type === 'cost-per-message') {
      updateSelection('cost-per-message', 'smart');
    } else {
      updateSelection('custom');
    }
  };

  const handleCustomConfigChange = (key: string, value: any) => {
    const newConfig = { ...customConfig, [key]: value };
    setCustomConfig(newConfig);
    setTimeout(() => updateSelection('custom'), 0);
  };

  // Initialize selection on mount
  React.useEffect(() => {
    if (!existingSelection) {
      updateSelection('yearly', 'standard');
    }
  }, []);

  return (
    <div className="glass rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center space-x-3">
        <span className="text-3xl">💬</span>
        <span className="bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
          WhatsApp Suite
        </span>
      </h3>
      
      {/* Plan Type Selection */}
      <div className="mb-8">
        <label className="block text-lg font-bold text-white mb-4">Choose Plan Type</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handlePlanTypeChange('yearly')}
            className={`p-4 border-2 rounded-xl text-left transition-all duration-300 ${
              planType === 'yearly'
                ? 'border-cyan-400 bg-cyan-500/20 text-white'
                : 'border-white/30 hover:border-white/50 text-white/80'
            }`}
          >
            <h4 className="font-bold text-lg mb-2">Yearly Plans</h4>
            <p className="text-sm">Fixed annual packages with all features</p>
          </button>
          
          <button
            onClick={() => handlePlanTypeChange('cost-per-message')}
            className={`p-4 border-2 rounded-xl text-left transition-all duration-300 ${
              planType === 'cost-per-message'
                ? 'border-cyan-400 bg-cyan-500/20 text-white'
                : 'border-white/30 hover:border-white/50 text-white/80'
            }`}
          >
            <h4 className="font-bold text-lg mb-2">Cost Per Message</h4>
            <p className="text-sm">Pay based on message volume</p>
          </button>
          
          <button
            onClick={() => handlePlanTypeChange('custom')}
            className={`p-4 border-2 rounded-xl text-left transition-all duration-300 ${
              planType === 'custom'
                ? 'border-cyan-400 bg-cyan-500/20 text-white'
                : 'border-white/30 hover:border-white/50 text-white/80'
            }`}
          >
            <h4 className="font-bold text-lg mb-2">Custom Builder</h4>
            <p className="text-sm">Build your own package</p>
          </button>
        </div>
      </div>

      {/* Yearly Plans */}
      {planType === 'yearly' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {yearlyPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-6 border-2 rounded-2xl transition-all duration-300 cursor-pointer ${
                  plan.popular ? 'border-yellow-400 bg-yellow-500/10' : 'border-white/30 hover:border-white/50'
                }`}
                onClick={() => updateSelection('yearly', plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-4">
                  <h4 className="text-xl font-bold text-white mb-2">
                    🟢 {plan.name}
                  </h4>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {formatCurrency(plan.price)}
                  </div>
                  <p className="text-white/70">{plan.messages.toLocaleString()} messages/year</p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Text-Only Messages</span>
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Image + Text</span>
                    {plan.features.imageText ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <span className="text-red-400">❌</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Document + Text</span>
                    {plan.features.documentText ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <span className="text-red-400">❌</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Lead Form Integration</span>
                    {plan.features.leadForm ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <span className="text-red-400">❌</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Auto Reply</span>
                    {plan.features.autoReply ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <span className="text-red-400">❌</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Support</span>
                    <span className="text-white font-medium">{plan.features.support}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Add-ons for Yearly */}
          <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-6">
            <h4 className="font-bold text-blue-200 mb-4">🧩 Add-Ons (Optional – One-Time Purchase)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {addOns.map((addon) => (
                <div key={addon.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-blue-200 text-sm">{addon.name}</span>
                  <span className="text-blue-300 font-semibold">{formatCurrency(addon.price)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cost Per Message Plans */}
      {planType === 'cost-per-message' && (
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 text-white font-semibold">Plan</th>
                  <th className="text-center py-3 text-white font-semibold">Messages</th>
                  <th className="text-center py-3 text-white font-semibold">Price</th>
                  <th className="text-center py-3 text-white font-semibold">Cost/Message</th>
                  <th className="text-center py-3 text-white font-semibold">Formats</th>
                  <th className="text-center py-3 text-white font-semibold">Support</th>
                  <th className="text-center py-3 text-white font-semibold">Select</th>
                </tr>
              </thead>
              <tbody>
                {costPerMessagePlans.map((plan) => (
                  <tr key={plan.id} className="border-b border-white/10">
                    <td className="py-4 text-white font-medium">{plan.name}</td>
                    <td className="py-4 text-center text-white">{plan.messages.toLocaleString()}</td>
                    <td className="py-4 text-center text-yellow-400 font-semibold">{formatCurrency(plan.price)}</td>
                    <td className="py-4 text-center text-white">₹{plan.costPerMessage}/msg</td>
                    <td className="py-4 text-center text-white text-xs">{plan.formats}</td>
                    <td className="py-4 text-center text-white">{plan.support}</td>
                    <td className="py-4 text-center">
                      <button
                        onClick={() => updateSelection('cost-per-message', plan.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Custom Builder */}
      {planType === 'custom' && (
        <div className="space-y-6">
          {/* Step 1: Base Volume */}
          <div className="glass rounded-xl p-6 border border-white/20">
            <h4 className="font-bold text-white mb-4">Step 1: Select Base Message Volume (Mandatory)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['5000', '10000', '25000', '50000', '100000'].map((volume) => (
                <button
                  key={volume}
                  onClick={() => handleCustomConfigChange('baseVolume', volume)}
                  className={`p-4 border-2 rounded-xl transition-all duration-300 ${
                    customConfig.baseVolume === volume
                      ? 'border-cyan-400 bg-cyan-500/20 text-white'
                      : 'border-white/30 hover:border-white/50 text-white/80'
                  }`}
                >
                  <div className="text-lg font-bold">{parseInt(volume).toLocaleString()} msgs</div>
                  <div className="text-yellow-400 font-semibold">{formatCurrency(getBaseVolumePrice(volume))}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Media Formats */}
          <div className="glass rounded-xl p-6 border border-white/20">
            <h4 className="font-bold text-white mb-4">Step 2: Choose Media Formats (Optional Add-ons)</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-500/20 rounded-lg">
                <span className="text-white">✅ Text (Free)</span>
                <span className="text-green-400 font-semibold">Included</span>
              </div>
              
              {['5000', '10000'].includes(customConfig.baseVolume) && (
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <label className="flex items-center space-x-3 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customConfig.imageText}
                      onChange={(e) => handleCustomConfigChange('imageText', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span>🖼️ Image + Text</span>
                  </label>
                  <span className="text-yellow-400 font-semibold">₹499</span>
                </div>
              )}
              
              {['5000', '10000', '25000'].includes(customConfig.baseVolume) && (
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <label className="flex items-center space-x-3 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customConfig.documentText}
                      onChange={(e) => handleCustomConfigChange('documentText', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span>📄 Document + Text</span>
                  </label>
                  <span className="text-yellow-400 font-semibold">₹699</span>
                </div>
              )}
            </div>
          </div>

          {/* Step 3: Lead Management */}
          <div className="glass rounded-xl p-6 border border-white/20">
            <h4 className="font-bold text-white mb-4">Step 3: Lead Management (Optional)</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-white">🧾 Lead Forms</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCustomConfigChange('leadForms', Math.max(0, customConfig.leadForms - 1))}
                      className="bg-white/20 text-white p-1 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-white w-8 text-center">{customConfig.leadForms}</span>
                    <button
                      onClick={() => handleCustomConfigChange('leadForms', customConfig.leadForms + 1)}
                      className="bg-green-500 text-white p-1 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <span className="text-yellow-400 font-semibold">₹{customConfig.leadForms * 999}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <label className="flex items-center space-x-3 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customConfig.googleSheetIntegration}
                    onChange={(e) => handleCustomConfigChange('googleSheetIntegration', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>📊 Google Sheet Integration</span>
                </label>
                <span className="text-yellow-400 font-semibold">₹999</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <label className="flex items-center space-x-3 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customConfig.autoReply}
                    onChange={(e) => handleCustomConfigChange('autoReply', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>🔁 Auto WhatsApp Reply Setup</span>
                </label>
                <span className="text-yellow-400 font-semibold">₹999</span>
              </div>
            </div>
          </div>

          {/* Step 4: Automation & Templates */}
          <div className="glass rounded-xl p-6 border border-white/20">
            <h4 className="font-bold text-white mb-4">Step 4: Automation & Templates</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-white">🧩 WhatsApp Templates</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCustomConfigChange('templates', Math.max(0, customConfig.templates - 1))}
                      className="bg-white/20 text-white p-1 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-white w-8 text-center">{customConfig.templates}</span>
                    <button
                      onClick={() => handleCustomConfigChange('templates', customConfig.templates + 1)}
                      className="bg-green-500 text-white p-1 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <span className="text-yellow-400 font-semibold">₹{customConfig.templates * 499}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <label className="flex items-center space-x-3 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customConfig.strategySession}
                    onChange={(e) => handleCustomConfigChange('strategySession', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>📞 Strategy Session (30 mins)</span>
                </label>
                <span className="text-yellow-400 font-semibold">₹999</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <label className="flex items-center space-x-3 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customConfig.prebuiltFunnel}
                    onChange={(e) => handleCustomConfigChange('prebuiltFunnel', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>🔁 Ready-to-use Prebuilt Funnel</span>
                </label>
                <span className="text-yellow-400 font-semibold">₹1,499</span>
              </div>
            </div>
          </div>

          {/* Step 5: Support Level */}
          <div className="glass rounded-xl p-6 border border-white/20">
            <h4 className="font-bold text-white mb-4">Step 5: Support Level (Choose One)</h4>
            <div className="space-y-3">
              {[
                { id: 'email', name: 'Email Support', price: 0 },
                { id: 'whatsapp', name: 'WhatsApp Support', price: 399 },
                { id: 'priority', name: 'Priority Support', price: 799 }
              ].map((support) => (
                <div key={support.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <label className="flex items-center space-x-3 text-white cursor-pointer">
                    <input
                      type="radio"
                      name="support"
                      checked={customConfig.supportLevel === support.id}
                      onChange={() => handleCustomConfigChange('supportLevel', support.id)}
                      className="w-4 h-4"
                    />
                    <span>{support.name}</span>
                  </label>
                  <span className="text-yellow-400 font-semibold">
                    {support.price === 0 ? 'Free' : formatCurrency(support.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Total */}
          <div className="glass rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-white text-xl">Custom Package Total</h4>
              <span className="text-3xl font-bold text-yellow-400">
                {formatCurrency(calculateCustomPrice())}
              </span>
            </div>
            
            {/* Upgrade Suggestion */}
            {getSuggestedUpgrade() && (
              <div className="p-4 bg-blue-500/20 border border-blue-400/30 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 font-medium">
                      💰 Upgrade to {getSuggestedUpgrade()?.plan} Pack & Save ₹{getSuggestedUpgrade()?.savings}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const suggested = getSuggestedUpgrade();
                      if (suggested) {
                        const plan = costPerMessagePlans.find(p => p.name === suggested.plan);
                        if (plan) {
                          setPlanType('cost-per-message');
                          updateSelection('cost-per-message', plan.id);
                        }
                      }
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Upgrade Now
                  </button>
                </div>
              </div>
            )}
            
            <div className="mt-4 text-sm text-white/70">
              <p>✅ Free Setup</p>
              <p>⏳ Validity: 12 months from activation</p>
            </div>
          </div>
        </div>
      )}

      {/* Validity Information */}
      <div className="mt-6 bg-green-500/20 border border-green-400/30 rounded-xl p-6">
        <h4 className="font-bold text-green-200 mb-3">✅ Validity Information:</h4>
        <ul className="text-sm text-green-200 space-y-2">
          <li>• Plans are valid for 1 year from date of activation</li>
          <li>• Or until the allotted message count is fully used — whichever occurs first</li>
          <li>• Add-on features also follow this same validity</li>
          <li>• All plans include free setup assistance</li>
        </ul>
      </div>
    </div>
  );
};

export default WhatsAppSuiteSelector;