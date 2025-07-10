import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  updateDoc, 
  serverTimestamp,
  increment 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { UserQuote } from '../types/user';
import { QuoteData } from '../types';

export const generateQuoteNumber = (): string => {
  // Generate a more readable quote number format: TMM-YYYYMM-XXXXX
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const sequence = Math.floor(Math.random() * 99999).toString().padStart(5, '0');
  return `TMM-${year}${month}-${sequence}`;
};

export const saveQuoteToDatabase = async (
  userId: string, 
  quoteData: QuoteData, 
  status: 'draft' | 'submitted' = 'draft'
): Promise<string> => {
  try {
    const quoteNumber = generateQuoteNumber();
    const quoteId = `${userId}_${Date.now()}`;

    const userQuote: UserQuote = {
      id: quoteId,
      userId,
      quoteNumber,
      selectedServices: quoteData.selectedServices,
      selectedSEOFeatures: quoteData.selectedSEOFeatures,
      selectedCombo: quoteData.selectedCombo,
      posterSelection: quoteData.posterSelection,
      presentationSelection: quoteData.presentationSelection,
      videoSelection: quoteData.videoSelection,
      socialMediaSelection: quoteData.socialMediaSelection,
      leadGenerationSelection: quoteData.leadGenerationSelection,
      productionShootSelection: quoteData.productionShootSelection,
      whatsappSuiteSelection: quoteData.whatsappSuiteSelection,
      promoCode: quoteData.promoCode,
      totalAmount: quoteData.totalAmount,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (status === 'submitted') {
      userQuote.submittedAt = new Date().toISOString();
      
      // Increment user's quotes used count
      await updateDoc(doc(db, 'users', userId), {
        quotesUsed: increment(1)
      });
    }

    await setDoc(doc(db, 'quotes', quoteId), {
      ...userQuote,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...(status === 'submitted' && { submittedAt: serverTimestamp() })
    });

    return quoteNumber;
  } catch (error: any) {
    throw new Error(`Failed to save quote: ${error.message}`);
  }
};

export const getUserQuotes = async (userId: string): Promise<UserQuote[]> => {
  try {
    const quotesQuery = query(
      collection(db, 'quotes'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(quotesQuery);
    const quotes: UserQuote[] = [];

    querySnapshot.forEach((doc) => {
      quotes.push(doc.data() as UserQuote);
    });

    return quotes;
  } catch (error: any) {
    throw new Error(`Failed to get quotes: ${error.message}`);
  }
};

export const getQuoteById = async (quoteId: string): Promise<UserQuote | null> => {
  try {
    const quoteDoc = await getDoc(doc(db, 'quotes', quoteId));
    if (!quoteDoc.exists()) {
      return null;
    }
    return quoteDoc.data() as UserQuote;
  } catch (error) {
    console.error('Error getting quote:', error);
    return null;
  }
};

export const updateQuoteStatus = async (
  quoteId: string, 
  status: 'draft' | 'submitted' | 'reviewed' | 'approved' | 'rejected'
): Promise<void> => {
  try {
    const updateData: any = {
      status,
      updatedAt: serverTimestamp()
    };

    if (status === 'submitted') {
      updateData.submittedAt = serverTimestamp();
    }

    await updateDoc(doc(db, 'quotes', quoteId), updateData);
  } catch (error: any) {
    throw new Error(`Failed to update quote status: ${error.message}`);
  }
};