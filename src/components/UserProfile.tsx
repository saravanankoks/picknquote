import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Calendar, CreditCard, Check, Star } from 'lucide-react';
import { User, UserQuote, SUBSCRIPTION_FEATURES } from '../types/user';
import { getUserQuotes } from '../services/quoteService';
import AnimatedCounter from './AnimatedCounter';

interface UserProfileProps {
  user: User;
  onSignOut: () => void;
  onBackToDashboard: () => void;
  onGenerateQuotePDF: (quote: UserQuote) => Promise<void>;
  onConvertToAccount?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  onSignOut, 
  onBackToDashboard,
  onGenerateQuotePDF,
  onConvertToAccount
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'quotes' | 'plans'>('overview');
  const [quotes, setQuotes] = useState<UserQuote[]>([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const features = SUBSCRIPTION_FEATURES[user.subscriptionTier];
  const isTrialExpired = !user.isTrialActive && user.subscriptionTier === 'free';
  const quotesRemaining = features.quotesLimit === -1 ? '∞' : Math.max(0, features.quotesLimit - user.quotesUsed);

  useEffect(() => {
    if (activeTab === 'quotes') {
      loadQuotes();
    }
  }, [activeTab]);

  const loadQuotes = async () => {
    setIsLoadingQuotes(true);
    try {
      const userQuotes = await getUserQuotes(user.uid);
      setQuotes(userQuotes);
    } catch (error) {
      console.error('Error loading quotes:', error);
    } finally {
      setIsLoadingQuotes(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const subscriptionPlans = [
    {
      id: 'free',
      name: 'Free Trial',
      price: 0,
      duration: '7 days',
      features: [
        '3 quotes per trial',
        '3 PDF downloads',
        'Basic features only',
        'Email support'
      ],
      color: 'from-gray-500 to-gray-600',
      icon: '🆓',
      current: user.subscriptionTier === 'free'
    },
    {
      id: 'standard',
      name: 'Standard Plan',
      price: 999,
      duration: 'month',
      features: [
        '15 quotes per month',
        '15 PDF downloads',
        'All advanced features',
        'WhatsApp support',
        'Priority processing'
      ],
      color: 'from-blue-500 to-blue-600',
      icon: '⭐',
      popular: true,
      current: user.subscriptionTier === 'standard'
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 1999,
      duration: 'month',
      features: [
        'Unlimited quotes',
        'Unlimited PDF downloads',
        'All premium features',
        'Priority support',
        'Custom branding',
        'Dedicated account manager'
      ],
      color: 'from-purple-500 to-purple-600',
      icon: '👑',
      current: user.subscriptionTier === 'premium'
    }
  ];

  const UpgradeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Upgrade Your Plan</h2>
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            You've reached your quote limit. Upgrade to continue creating quotes.
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subscriptionPlans.filter(plan => plan.id !== 'free').map((plan) => (
              <div
                key={plan.id}
                className={`relative p-6 border-2 rounded-2xl transition-all duration-300 ${
                  plan.popular ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">{plan.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    ₹{plan.price}
                    <span className="text-lg text-gray-600">/{plan.duration}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full bg-gradient-to-r ${plan.color} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
                >
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              All plans include secure payment processing and can be cancelled anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToDashboard}
            className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-all duration-300 border border-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
          
          <button
            onClick={onSignOut}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 mb-8">
          {/* Guest Mode Banner */}
          {user.isGuest && (
            <div className="bg-orange-500/20 border border-orange-400/30 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👤</span>
                  <div>
                    <h3 className="text-orange-200 font-bold">Guest Mode Active</h3>
                    <p className="text-orange-300 text-sm">
                      You're using guest access. Create a permanent account to save your data.
                    </p>
                  </div>
                </div>
                {onConvertToAccount && (
                  <button
                    onClick={onConvertToAccount}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Create Account
                  </button>
                )}
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {user.isGuest ? '👤' : user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome, {user.isGuest ? 'Guest User' : user.name}!
              </h1>
              <p className="text-white/80 text-lg">
                {user.isGuest ? 'Guest Access' : user.email}
              </p>
              <div className="flex items-center space-x-4 mt-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.subscriptionTier === 'premium' ? 'bg-purple-500/20 text-purple-200' :
                  user.subscriptionTier === 'standard' ? 'bg-blue-500/20 text-blue-200' :
                  'bg-gray-500/20 text-gray-200'
                }`}>
                  {user.isGuest ? 'Guest Access' :
                   user.subscriptionTier === 'free' ? 'Free Trial' : 
                   user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)} Plan
                </span>
                {isTrialExpired && !user.isGuest && (
                  <span className="px-3 py-1 bg-red-500/20 text-red-200 rounded-full text-sm font-medium">
                    Trial Expired
                  </span>
                )}
                {user.isGuest && (
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-200 rounded-full text-sm font-medium">
                    Temporary Session
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Quotes Used</p>
                <p className="text-2xl font-bold text-white">
                  <AnimatedCounter value={user.quotesUsed} /> / {features.quotesLimit === -1 ? '∞' : features.quotesLimit}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Download className="w-6 h-6 text-green-300" />
              </div>
              <div>
                <p className="text-white/70 text-sm">PDF Downloads</p>
                <p className="text-2xl font-bold text-white">
                  {features.pdfDownloads === -1 ? 'Unlimited' : features.pdfDownloads}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <CreditCard className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Plan Status</p>
                <p className="text-2xl font-bold text-white">
                  {user.isTrialActive ? 'Active' : user.subscriptionTier === 'free' ? 'Expired' : 'Active'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trial Expiry Warning */}
        {(user.quotesUsed >= features.quotesLimit && features.quotesLimit !== -1) || isTrialExpired ? (
          <div className="bg-red-500/20 border border-red-400/30 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-red-200 mb-2">
                  {isTrialExpired ? 'Trial Expired' : 'Quote Limit Reached'}
                </h3>
                <p className="text-red-300">
                  {isTrialExpired 
                    ? 'Your free trial has expired. Upgrade to continue using our services.'
                    : 'You have used all your available quotes. Upgrade your plan to create more quotes.'
                  }
                </p>
              </div>
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
              >
                Upgrade Plan
              </button>
            </div>
          </div>
        ) : null}

        {/* Navigation Tabs */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 mb-8">
          <div className="flex space-x-1 p-2">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'quotes', name: 'My Quotes', icon: '📋' },
              { id: 'plans', name: 'Plans', icon: '💎' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Account Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Account Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-white/70">Name</label>
                      <div className="mt-1 text-white">
                        {user.isGuest ? 'Guest User' : user.name}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70">Email</label>
                      <div className="mt-1 text-white">
                        {user.isGuest ? 'Not provided (Guest)' : user.email}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70">Member Since</label>
                      <div className="mt-1 text-white">{formatDate(user.createdAt)}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70">Last Login</label>
                      <div className="mt-1 text-white">{formatDate(user.lastLoginAt)}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Subscription Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-white/70">Current Plan</label>
                      <div className="mt-1 text-white capitalize">
                        {user.isGuest ? 'Guest Access' : `${user.subscriptionTier} Plan`}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70">Quotes Remaining</label>
                      <div className="mt-1 text-white">{quotesRemaining}</div>
                    </div>
                    {user.isTrialActive && (
                      <div>
                        <label className="block text-sm font-medium text-white/70">Trial Ends</label>
                        <div className="mt-1 text-white">{formatDate(user.trialEndDate!)}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quotes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">My Quotes</h2>
                <button
                  onClick={loadQuotes}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Refresh
                </button>
              </div>
              
              {isLoadingQuotes ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white/70">Loading quotes...</p>
                </div>
              ) : quotes.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-white/70 text-lg">No quotes found</p>
                  <p className="text-white/50 text-sm mt-2">Create your first quote to see it here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {quotes.map((quote) => (
                    <div key={quote.id} className="bg-white/10 border border-white/20 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">Quote #{quote.quoteNumber}</h3>
                          <p className="text-white/70 text-sm">Created: {formatDate(quote.createdAt)}</p>
                          {quote.submittedAt && (
                            <p className="text-white/70 text-sm">Submitted: {formatDate(quote.submittedAt)}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(quote.status)}`}>
                            {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                          </span>
                          <span className="text-xl font-bold text-white">
                            {formatCurrency(quote.totalAmount)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => onGenerateQuotePDF(quote)}
                          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download PDF</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'plans' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Subscription Plans</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptionPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative p-6 border-2 rounded-2xl transition-all duration-300 ${
                      plan.current 
                        ? 'border-green-400 bg-green-500/10' 
                        : plan.popular 
                        ? 'border-blue-400 bg-blue-500/10' 
                        : 'border-white/30 bg-white/5'
                    }`}
                  >
                    {plan.popular && !plan.current && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>Most Popular</span>
                        </span>
                      </div>
                    )}
                    
                    {plan.current && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                          <Check className="w-4 h-4" />
                          <span>Current Plan</span>
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-2">{plan.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                      <div className="text-3xl font-bold text-white mb-1">
                        ₹{plan.price}
                        {plan.price > 0 && <span className="text-lg text-white/70">/{plan.duration}</span>}
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-white/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      disabled={plan.current}
                      className={`w-full py-3 rounded-lg font-semibold transition-opacity ${
                        plan.current
                          ? 'bg-green-500 text-white cursor-not-allowed'
                          : `bg-gradient-to-r ${plan.color} text-white hover:opacity-90`
                      }`}
                    >
                      {plan.current ? 'Current Plan' : `Choose ${plan.name}`}
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-200 mb-3">Plan Benefits</h3>
                <ul className="text-sm text-blue-200 space-y-2">
                  <li>• All plans include secure payment processing</li>
                  <li>• Cancel anytime with no hidden fees</li>
                  <li>• 24/7 customer support</li>
                  <li>• Regular feature updates</li>
                  <li>• Data backup and security</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && <UpgradeModal />}
    </div>
  );
};

export default UserProfile;