import { PromoCode } from '../types';

export const promoCodes: Record<string, PromoCode> = {
  'TMM10': {
    code: 'TMM10',
    discount: 10,
    type: 'percentage',
    description: '10% off on all services',
    isValid: true
  },
  'NEWUSER': {
    code: 'NEWUSER',
    discount: 15,
    type: 'percentage',
    description: '15% off for new customers',
    isValid: true
  },
  'SUMMER25': {
    code: 'SUMMER25',
    discount: 25,
    type: 'percentage',
    description: '25% summer special discount',
    isValid: true
  },
  'SAVE5000': {
    code: 'SAVE5000',
    discount: 5000,
    type: 'fixed',
    description: 'Flat ₹5000 off on orders above ₹50000',
    isValid: true
  },
  'LOGOWEBSITE20': {
    code: 'LOGOWEBSITE20',
    discount: 20,
    type: 'percentage',
    description: '20% off on Logo Design + Website combo',
    isValid: true
  }
};

export const validatePromoCode = (code: string, totalAmount: number): PromoCode | null => {
  const upperCode = code.toUpperCase();
  const promo = promoCodes[upperCode];
  
  if (!promo || !promo.isValid) {
    return null;
  }
  
  // Special validation for SAVE5000 - only valid for orders above ₹50000
  if (upperCode === 'SAVE5000' && totalAmount < 50000) {
    return {
      ...promo,
      isValid: false,
      description: 'Valid only on orders above ₹50,000'
    };
  }
  
  return promo;
};

export const calculateDiscount = (totalAmount: number, promoCode: PromoCode | null): number => {
  if (!promoCode || !promoCode.isValid) return 0;
  
  if (promoCode.type === 'percentage') {
    return Math.round(totalAmount * (promoCode.discount / 100));
  } else {
    return Math.min(promoCode.discount, totalAmount);
  }
};