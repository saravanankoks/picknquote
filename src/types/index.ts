export interface Service {
  id: string;
  name: string;
  price: number;
  description?: string;
  sampleUrl?: string;
  tooltip?: string;
  requiresForm?: boolean;
}

export interface SelectedService {
  service: Service;
  quantity: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  services: Service[];
}

export interface SEOFeature {
  id: string;
  name: string;
  options: {
    basic?: { price: number; description: string };
    standard?: { price: number; description: string };
    premium?: { price: number; description: string };
  };
}

export interface SelectedSEOFeature {
  featureId: string;
  selectedTier: 'basic' | 'standard' | 'premium';
  price: number;
  description: string;
}

export interface PosterSelection {
  type: 'creative' | 'normal';
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PresentationSelection {
  type: 'business' | 'advanced';
  slides: number;
  totalPrice: number;
}

export interface VideoSelection {
  type: 'promo' | 'explainer' | 'social';
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ComboPackage {
  id: string;
  name: string;
  description: string;
  target: string;
  price: number;
  originalPrice: number;
  discount: number;
  includes: string[];
  icon: string;
  popular: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'messaging' | 'seo' | 'maintenance' | 'analytics' | 'development';
}

export interface SelectedCombo {
  combo: ComboPackage;
  addOns: AddOn[];
}

export interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  description: string;
  isValid: boolean;
}

export interface QuoteData {
  id: string;
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
  promoCode: PromoCode | null;
  totalAmount: number;
  createdAt: string;
}

export interface SocialMediaSelection {
  type: 'standard' | 'premium' | 'custom';
  posts?: number;
  stories?: number;
  reels?: number;
  carousels?: number;
  motionPosters?: number;
  totalPrice: number;
  managementIncluded: boolean;
}

export interface LeadGenerationSelection {
  type: 'google' | 'meta' | 'whatsapp' | 'linkedin' | 'youtube' | 'combo' | 'custom';
  totalPrice: number;
  adSpendIncluded: boolean;
  customConfig?: {
    platform?: string;
    bundle?: string;
    adSpend?: number;
    addOns?: string[];
    estimatedLeads?: string;
    estimatedCPL?: string;
  };
}

export interface ProductionShootSelection {
  type: 'photoshoot' | 'video-shoot' | 'product-shoot' | 'promo-shoot' | 'interior-exterior' | 'pitch-deck' | 'social-reels';
  package: 'basic' | 'standard' | 'premium';
  totalPrice: number;
}

export interface WhatsAppSuiteSelection {
  planType: 'yearly' | 'cost-per-message' | 'custom';
  selectedPlan?: string;
  totalPrice: number;
  planDetails?: {
    name: string;
    messages: number;
    features?: any;
    costPerMessage?: number;
  };
  customConfig?: {
    baseVolume: string;
    imageText: boolean;
    documentText: boolean;
    leadForms: number;
    googleSheetIntegration: boolean;
    autoReply: boolean;
    templates: number;
    strategySession: boolean;
    prebuiltFunnel: boolean;
    supportLevel: 'email' | 'whatsapp' | 'priority';
  };
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  requirements: string;
  budget: string;
  timeline: string;
  serviceType: string;
}