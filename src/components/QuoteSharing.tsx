import React, { useState } from 'react';
import { Share2, MessageCircle, Check, Download, Sparkles, Send } from 'lucide-react';
import { QuoteData } from '../types';
import { generateWhatsAppShareLink, sendPDFToWhatsApp } from '../utils/quoteSharing';
import AnimatedCounter from './AnimatedCounter';

interface QuoteSharingProps {
  quoteData: QuoteData;
  onGeneratePDF: () => Promise<Blob>;
  onSubmitQuote: () => Promise<void>;
  isSubmitting: boolean;
}

const QuoteSharing: React.FC<QuoteSharingProps> = ({ quoteData, onGeneratePDF, onSubmitQuote, isSubmitting }) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitQuote = async () => {
    try {
      await onSubmitQuote();
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting quote:', error);
    }
  };

  const handleWhatsAppShare = () => {
    const whatsappLink = generateWhatsAppShareLink('', quoteData.totalAmount);
    window.open(whatsappLink, '_blank');
  };

  const handleSendPDFToWhatsApp = async () => {
    setIsGeneratingPDF(true);
    try {
      const pdfBlob = await onGeneratePDF();
      await sendPDFToWhatsApp(pdfBlob, quoteData.totalAmount);
    } catch (error) {
      console.error('Error sending PDF to WhatsApp:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-6 card-hover animate-fadeInUp">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
          <Share2 className="w-5 h-5 text-white" />
        </div>
        <span>Share Quote</span>
        <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
      </h3>
      
      <div className="space-y-6">
        {/* Quote Summary */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-white text-lg">Quote: {quoteData.id.split('_')[0] || quoteData.id}</p>
              <p className="text-white/70">
                Total: <AnimatedCounter value={quoteData.totalAmount} prefix="₹" className="text-purple-300 font-bold" />
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/70">Created</p>
              <p className="text-sm font-medium text-white">
                {new Date(quoteData.createdAt).toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        {/* Sharing Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Submit Quote */}
          <button
            onClick={handleSubmitQuote}
            disabled={isSubmitting || isSubmitted}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitted ? (
              <>
                <Check className="w-5 h-5 animate-bounce-gentle" />
                <span className="font-medium">Quote Submitted!</span>
              </>
            ) : isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="font-medium">Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:animate-bounce-gentle" />
                <span className="font-medium">Submit Quote</span>
              </>
            )}
          </button>

          {/* Share via WhatsApp */}
          <button
            onClick={handleWhatsAppShare}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 group whatsapp-bounce"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Share via WhatsApp</span>
          </button>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Check className="w-6 h-6 text-green-400" />
              <h4 className="font-semibold text-green-300 text-lg">Quote Submitted Successfully!</h4>
            </div>
            <p className="text-green-200">
              Your quote has been submitted successfully. Our team will contact you within 24 hours with detailed information and next steps.
            </p>
          </div>
        )}

        {/* Send PDF to WhatsApp */}
        <div className="border-t border-white/20 pt-6">
          <button
            onClick={handleSendPDFToWhatsApp}
            disabled={isGeneratingPDF}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 group transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Download className={`w-5 h-5 ${isGeneratingPDF ? 'animate-spin' : 'group-hover:animate-bounce-gentle'}`} />
            <span>
              {isGeneratingPDF ? 'Generating PDF...' : 'Send PDF to WhatsApp (8825065657)'}
            </span>
          </button>
          <p className="text-xs text-white/60 mt-3 text-center">
            PDF will be downloaded and WhatsApp will open with a pre-filled message
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-6">
          <h4 className="font-semibold text-blue-300 mb-3 flex items-center space-x-2">
            <span>📋</span>
            <span>How to share:</span>
          </h4>
          <ul className="text-sm text-blue-200 space-y-2">
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span><strong>Submit Quote:</strong> Submit your quote to our team for review</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span><strong>WhatsApp Share:</strong> Send quote details via WhatsApp message</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span><strong>PDF to WhatsApp:</strong> Download PDF and send to our team</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuoteSharing;