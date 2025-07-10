import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { signIn, signUp, getUserData } from './services/authService';
import { saveQuoteToDatabase } from './services/quoteService';
import { User as UserType, UserQuote, SUBSCRIPTION_FEATURES } from './types/user';
import LoginPage from './components/LoginPage';
import UserProfile from './components/UserProfile';
import Header from './components/Header';
import Footer from './components/Footer';
import ServiceSelector from './components/ServiceSelector';
import OrderSummary from './components/OrderSummary';
import PromoCodeInput from './components/PromoCodeInput';
import QuoteSharing from './components/QuoteSharing';
import AnimatedBackground from './components/AnimatedBackground';
import AnimatedCounter from './components/AnimatedCounter';
import RequirementsForm from './components/RequirementsForm';
import { Service, SelectedService, SelectedSEOFeature, SelectedCombo, PromoCode, QuoteData, PosterSelection, PresentationSelection, VideoSelection, SocialMediaSelection, LeadGenerationSelection, ProductionShootSelection, WhatsAppSuiteSelection, FormData } from './types';
import { calculateDiscount } from './data/promoCodes';
import { generateQuoteId, saveQuoteToStorage, getQuoteById } from './utils/quoteSharing';
import { Sparkles, ArrowRight } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function App() {
  // Authentication state
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  
  // Existing state
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [selectedSEOFeatures, setSelectedSEOFeatures] = useState<SelectedSEOFeature[]>([]);
  const [selectedCombo, setSelectedCombo] = useState<SelectedCombo | null>(null);
  const [posterSelection, setPosterSelection] = useState<PosterSelection | null>(null);
  const [presentationSelection, setPresentationSelection] = useState<PresentationSelection | null>(null);
  const [videoSelection, setVideoSelection] = useState<VideoSelection | null>(null);
  const [socialMediaSelection, setSocialMediaSelection] = useState<SocialMediaSelection | null>(null);
  const [leadGenerationSelection, setLeadGenerationSelection] = useState<LeadGenerationSelection | null>(null);
  const [productionShootSelection, setProductionShootSelection] = useState<ProductionShootSelection | null>(null);
  const [whatsappSuiteSelection, setWhatsappSuiteSelection] = useState<WhatsAppSuiteSelection | null>(null);
  const [appliedPromoCode, setAppliedPromoCode] = useState<PromoCode | null>(null);
  const [currentView, setCurrentView] = useState<'selection' | 'summary'>('selection');
  const [currentQuoteId, setCurrentQuoteId] = useState<string | null>(null);
  const [showRequirementsForm, setShowRequirementsForm] = useState<{show: boolean, service: Service | null}>({show: false, service: null});
  const [autoAppliedPromo, setAutoAppliedPromo] = useState<boolean>(false);

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await getUserData(firebaseUser.uid);
          if (userData) {
            setUser(userData);
          }
        } catch (error) {
          console.error('Error getting user data:', error);
          setAuthError('Failed to load user data');
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Check for shared quote on load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const quoteId = urlParams.get('quote');
    
    if (quoteId) {
      const sharedQuote = getQuoteById(quoteId);
      if (sharedQuote) {
        // Load shared quote data
        setSelectedServices(sharedQuote.selectedServices);
        setSelectedSEOFeatures(sharedQuote.selectedSEOFeatures);
        setSelectedCombo(sharedQuote.selectedCombo);
        setPosterSelection(sharedQuote.posterSelection);
        setPresentationSelection(sharedQuote.presentationSelection);
        setVideoSelection(sharedQuote.videoSelection);
        setSocialMediaSelection(sharedQuote.socialMediaSelection);
        setLeadGenerationSelection(sharedQuote.leadGenerationSelection);
        setProductionShootSelection(sharedQuote.productionShootSelection);
        setWhatsappSuiteSelection(sharedQuote.whatsappSuiteSelection);
        setAppliedPromoCode(sharedQuote.promoCode);
        setCurrentQuoteId(quoteId);
        setCurrentView('summary');
        
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  // Auto-apply logo + website combo discount
  useEffect(() => {
    const hasLogoDesign = selectedServices.some(item => item.service.id === 'logo-design');
    const hasWebsite = selectedServices.some(item => item.service.id.startsWith('website-'));
    
    if (hasLogoDesign && hasWebsite && !appliedPromoCode && !autoAppliedPromo) {
      const logoWebsitePromo = {
        code: 'LOGOWEBSITE20',
        discount: 20,
        type: 'percentage' as const,
        description: '20% off on Logo Design + Website combo (Auto-applied)',
        isValid: true
      };
      setAppliedPromoCode(logoWebsitePromo);
      setAutoAppliedPromo(true);
    } else if ((!hasLogoDesign || !hasWebsite) && autoAppliedPromo) {
      // Remove auto-applied promo if combo is broken
      if (appliedPromoCode?.code === 'LOGOWEBSITE20') {
        setAppliedPromoCode(null);
      }
      setAutoAppliedPromo(false);
    }
  }, [selectedServices, appliedPromoCode, autoAppliedPromo]);
  const handleLogin = async (email: string, password: string) => {
    setAuthError(null);
    try {
      const userData = await signIn(email, password);
      setUser(userData);
    } catch (error: any) {
      setAuthError(error.message);
      throw error;
    }
  };

  const handleSignUp = async (email: string, password: string, name: string, inviteKey: string) => {
    setAuthError(null);
    try {
      const userData = await signUp(email, password, name, inviteKey);
      setUser(userData);
    } catch (error: any) {
      setAuthError(error.message);
      throw error;
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setShowProfile(false);
    // Reset all state
    setSelectedServices([]);
    setSelectedSEOFeatures([]);
    setSelectedCombo(null);
    setPosterSelection(null);
    setPresentationSelection(null);
    setVideoSelection(null);
    setSocialMediaSelection(null);
    setLeadGenerationSelection(null);
    setProductionShootSelection(null);
    setWhatsappSuiteSelection(null);
    setAppliedPromoCode(null);
    setCurrentView('selection');
    setCurrentQuoteId(null);
    setAutoAppliedPromo(false);
  };

  const handleServiceAdd = (service: Service) => {
    if (!user) return;
    
    // Check subscription limits for advanced features
    const features = SUBSCRIPTION_FEATURES[user.subscriptionTier];
    if (!features.advancedFeatures && service.id.includes('premium')) {
      alert('Premium features are not available in your current plan. Please upgrade to access this service.');
      return;
    }
    
    if (service.requiresForm) {
      setShowRequirementsForm({show: true, service});
      return;
    }

    const existingService = selectedServices.find(item => item.service.id === service.id);
    
    if (existingService) {
      setSelectedServices(prev =>
        prev.map(item =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setSelectedServices(prev => [...prev, { service, quantity: 1 }]);
    }
  };

  const handleRequirementsSubmit = (formData: FormData) => {
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    // For now, we'll just show a success message and close the form
    alert('Thank you! Our team will contact you within 48 hours with detailed requirements and pricing.');
    setShowRequirementsForm({show: false, service: null});
  };

  const handleServiceRemove = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(item => item.service.id !== serviceId));
  };

  const handleQuantityChange = (serviceId: string, quantity: number) => {
    if (quantity <= 0) {
      handleServiceRemove(serviceId);
      return;
    }
    
    setSelectedServices(prev =>
      prev.map(item =>
        item.service.id === serviceId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleSEOFeatureAdd = (feature: SelectedSEOFeature) => {
    setSelectedSEOFeatures(prev => [...prev, feature]);
  };

  const handleSEOFeatureRemove = (featureId: string) => {
    setSelectedSEOFeatures(prev => prev.filter(feature => feature.featureId !== featureId));
  };

  const handleComboSelect = (combo: SelectedCombo) => {
    setSelectedCombo(combo);
  };

  const handleComboRemove = () => {
    setSelectedCombo(null);
  };

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

  const getFinalAmount = () => {
    const totalAmount = getTotalAmount();
    const discountAmount = appliedPromoCode ? calculateDiscount(totalAmount, appliedPromoCode) : 0;
    return totalAmount - discountAmount;
  };

  const handleProceedToOrder = () => {
    if (!user) return;
    
    if (selectedServices.length > 0 || selectedCombo || posterSelection || presentationSelection || videoSelection || socialMediaSelection || leadGenerationSelection || productionShootSelection || whatsappSuiteSelection) {
      // Generate and save quote
      const quoteId = generateQuoteId();
      const quoteData: QuoteData = {
        id: quoteId,
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
        promoCode: appliedPromoCode,
        totalAmount: getFinalAmount(),
        createdAt: new Date().toISOString()
      };
      
      saveQuoteToStorage(quoteData);
      setCurrentQuoteId(quoteId);
      setCurrentView('summary');
      
      // Scroll to top when proceeding to order summary
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToSelection = () => {
    setCurrentView('selection');
  };

  const handleGeneratePDF = async (): Promise<Blob> => {
    if (!user) throw new Error('User not authenticated');
    
    // Check PDF download limits
    const features = SUBSCRIPTION_FEATURES[user.subscriptionTier];
    if (features.pdfDownloads !== -1 && user.quotesUsed >= features.pdfDownloads) {
      throw new Error('PDF download limit reached. Please upgrade your plan.');
    }
    
    const element = document.getElementById('order-summary');
    if (!element) throw new Error('Order summary element not found');

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    return pdf.output('blob');
  };

  const handleGenerateQuotePDF = async (quote: UserQuote) => {
    try {
      // Generate PDF (this would need to be implemented to work with quote data)
      const pdfBlob = await handleGeneratePDF();
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `TMM-Quote-${quote.quoteNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const handleSubmitQuote = async (): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    
    // Check quote limits
    const features = SUBSCRIPTION_FEATURES[user.subscriptionTier];
    if (features.quotesLimit !== -1 && user.quotesUsed >= features.quotesLimit) {
      throw new Error('Quote limit reached. Please upgrade your plan.');
    }
    
    const quoteData = getCurrentQuoteData();
    await saveQuoteToDatabase(user.uid, quoteData, 'submitted');
    
    // Update user's quotes used count locally
    setUser(prev => prev ? { ...prev, quotesUsed: prev.quotesUsed + 1 } : null);
  };

  const handleDownloadPDF = async () => {
    try {
      const pdfBlob = await handleGeneratePDF();
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `TMM-Smart-Select-Quote-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const getCurrentQuoteData = (): QuoteData => {
    return {
      id: currentQuoteId || generateQuoteId(),
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
      promoCode: appliedPromoCode,
      totalAmount: getFinalAmount(),
      createdAt: new Date().toISOString()
    };
  };

  const hasSelectedItems = selectedServices.length > 0 || selectedCombo || posterSelection || presentationSelection || videoSelection || socialMediaSelection || leadGenerationSelection || productionShootSelection || whatsappSuiteSelection;

  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!user) {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        isLoading={isLoading}
        error={authError}
      />
    );
  }

  // Show profile page
  if (showProfile) {
    return (
      <UserProfile
        user={user}
        onSignOut={handleSignOut}
        onBackToDashboard={() => setShowProfile(false)}
        onGenerateQuotePDF={handleGenerateQuotePDF}
      />
    );
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <Header user={user} onShowProfile={() => setShowProfile(true)} />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentView === 'selection' ? (
          <>
            <div className="text-center mb-12 animate-fadeInUp">
              <h1 className="text-6xl font-bold text-white mb-6 flex items-center justify-center space-x-4">
                <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  Select Your Services
                </span>
                <Sparkles className="w-16 h-16 text-yellow-400 animate-pulse" />
              </h1>
              <p className="text-2xl text-white/90 max-w-3xl mx-auto font-medium">
                Choose from our comprehensive range of digital marketing services and watch your business grow
              </p>
            </div>

            <div className="space-y-10">
              <ServiceSelector
                selectedServices={selectedServices}
                selectedSEOFeatures={selectedSEOFeatures}
                selectedCombo={selectedCombo}
                posterSelection={posterSelection}
                presentationSelection={presentationSelection}
                videoSelection={videoSelection}
                socialMediaSelection={socialMediaSelection}
                leadGenerationSelection={leadGenerationSelection}
                productionShootSelection={productionShootSelection}
                whatsappSuiteSelection={whatsappSuiteSelection}
                onServiceAdd={handleServiceAdd}
                onServiceRemove={handleServiceRemove}
                onQuantityChange={handleQuantityChange}
                onSEOFeatureAdd={handleSEOFeatureAdd}
                onSEOFeatureRemove={handleSEOFeatureRemove}
                onComboSelect={handleComboSelect}
                onComboRemove={handleComboRemove}
                onPosterSelectionChange={setPosterSelection}
                onPresentationSelectionChange={setPresentationSelection}
                onVideoSelectionChange={setVideoSelection}
                onSocialMediaSelectionChange={setSocialMediaSelection}
                onLeadGenerationSelectionChange={setLeadGenerationSelection}
                onProductionShootSelectionChange={setProductionShootSelection}
                onWhatsAppSuiteSelectionChange={setWhatsappSuiteSelection}
              />

              {hasSelectedItems && (
                <>
                  <PromoCodeInput
                    totalAmount={getTotalAmount()}
                    onPromoCodeApply={setAppliedPromoCode}
                    appliedPromoCode={appliedPromoCode}
                  />

                  <div className="flex justify-center animate-fadeInUp stagger-5">
                    <button
                      onClick={handleProceedToOrder}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-16 py-6 rounded-3xl text-2xl font-bold flex items-center space-x-4 group shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105"
                    >
                      <span>Proceed to Order Summary</span>
                      <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-12 animate-fadeInUp">
              <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                Order Summary
              </h1>
              <p className="text-2xl text-white/90 font-medium">
                Review your selected services and share your quote
              </p>
            </div>

            <div className="space-y-10">
              <OrderSummary
                selectedServices={selectedServices}
                selectedSEOFeatures={selectedSEOFeatures}
                selectedCombo={selectedCombo}
                posterSelection={posterSelection}
                presentationSelection={presentationSelection}
                videoSelection={videoSelection}
                socialMediaSelection={socialMediaSelection}
                leadGenerationSelection={leadGenerationSelection}
                productionShootSelection={productionShootSelection}
                whatsappSuiteSelection={whatsappSuiteSelection}
                appliedPromoCode={appliedPromoCode}
                onBack={handleBackToSelection}
                onGeneratePDF={handleDownloadPDF}
              />

              <QuoteSharing
                quoteData={getCurrentQuoteData()}
                onGeneratePDF={handleGeneratePDF}
                onSubmitQuote={handleSubmitQuote}
                isSubmitting={false}
              />
            </div>
          </>
        )}
      </main>

      {/* Requirements Form Modal */}
      {showRequirementsForm.show && showRequirementsForm.service && (
        <RequirementsForm
          serviceType={showRequirementsForm.service.id}
          serviceName={showRequirementsForm.service.name}
          onClose={() => setShowRequirementsForm({show: false, service: null})}
          onSubmit={handleRequirementsSubmit}
        />
      )}

      {/* Sticky Bottom Total Bar for Mobile */}
      {hasSelectedItems && currentView === 'selection' && (
        <div className="sticky bottom-0 z-40 p-4 backdrop-blur-lg bg-white/90 border-t border-gray-200 md:hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-orange-600">
                <AnimatedCounter value={getFinalAmount()} prefix="₹" />
              </p>
            </div>
            <button
              onClick={handleProceedToOrder}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg"
            >
              Continue
            </button>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default App;