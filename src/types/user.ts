export interface User {
  uid: string;
  email: string;
  name: string;
  subscriptionTier: 'free' | 'standard' | 'premium';
  quotesUsed: number;
  quotesLimit: number;
  trialStartDate?: string;
  trialEndDate?: string;
  isTrialActive: boolean;
  createdAt: string;
  lastLoginAt: string;
}

export interface UserQuote {
  id: string;
  userId: string;
  quoteNumber: string;
  selectedServices: any[];
  selectedSEOFeatures: any[];
  selectedCombo: any;
  posterSelection: any;
  presentationSelection: any;
  videoSelection: any;
  socialMediaSelection: any;
  leadGenerationSelection: any;
  productionShootSelection: any;
  whatsappSuiteSelection: any;
  promoCode: any;
  totalAmount: number;
  status: 'draft' | 'submitted' | 'reviewed' | 'approved' | 'rejected';
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionFeatures {
  quotesLimit: number;
  pdfDownloads: number;
  advancedFeatures: boolean;
  prioritySupport: boolean;
  customBranding: boolean;
}

export const SUBSCRIPTION_FEATURES: Record<string, SubscriptionFeatures> = {
  free: {
    quotesLimit: 3,
    pdfDownloads: 3,
    advancedFeatures: false,
    prioritySupport: false,
    customBranding: false
  },
  standard: {
    quotesLimit: 15,
    pdfDownloads: 15,
    advancedFeatures: true,
    prioritySupport: false,
    customBranding: false
  },
  premium: {
    quotesLimit: -1, // unlimited
    pdfDownloads: -1, // unlimited
    advancedFeatures: true,
    prioritySupport: true,
    customBranding: true
  }
};