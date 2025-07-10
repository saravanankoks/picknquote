import { QuoteData } from '../types';

export const generateQuoteId = (): string => {
  return `TMM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const saveQuoteToStorage = (quoteData: QuoteData): void => {
  const quotes = getStoredQuotes();
  quotes[quoteData.id] = quoteData;
  localStorage.setItem('tmm_quotes', JSON.stringify(quotes));
};

export const getStoredQuotes = (): Record<string, QuoteData> => {
  const stored = localStorage.getItem('tmm_quotes');
  return stored ? JSON.parse(stored) : {};
};

export const getQuoteById = (id: string): QuoteData | null => {
  const quotes = getStoredQuotes();
  return quotes[id] || null;
};

export const generateShareableLink = (quoteId: string): string => {
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?quote=${quoteId}`;
};

export const generateWhatsAppShareLink = (quoteId: string, totalAmount: number): string => {
  const shareLink = generateShareableLink(quoteId);
  const message = `Hi! I've created a quote for digital marketing services worth ₹${totalAmount.toLocaleString('en-IN')}. Please review: ${shareLink}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
};

export const sendPDFToWhatsApp = async (pdfBlob: Blob, totalAmount: number): Promise<void> => {
  const phoneNumber = '918825065657'; // 8825065657 with country code
  const message = `Hi, I've submitted a quote worth ₹${totalAmount.toLocaleString('en-IN')}. Please find the PDF attached.`;
  
  // Create a temporary download link for the PDF
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `TMM-Quote-${Date.now()}.pdf`;
  
  // Download the PDF first
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  // Open WhatsApp with the message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  }
};