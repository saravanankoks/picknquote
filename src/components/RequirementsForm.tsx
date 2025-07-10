import React, { useState } from 'react';
import { X, Send, User, Mail, Phone, Building, FileText, Download } from 'lucide-react';
import { FormData } from '../types';
import jsPDF from 'jspdf';

interface RequirementsFormProps {
  serviceType: string;
  serviceName: string;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const RequirementsForm: React.FC<RequirementsFormProps> = ({
  serviceType,
  serviceName,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirements: '',
    budget: '',
    timeline: '',
    serviceType: serviceType
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateRequirementsPDF = () => {
    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(20);
    pdf.text('TheMadrasMarketeer', 20, 30);
    pdf.setFontSize(12);
    pdf.text('Digital Marketing Solutions', 20, 40);
    
    // Title
    pdf.setFontSize(16);
    pdf.text('Project Requirements Document', 20, 60);
    
    // Service Type
    pdf.setFontSize(14);
    pdf.text(`Service: ${serviceName}`, 20, 80);
    
    // Client Information
    pdf.setFontSize(12);
    pdf.text('Client Information:', 20, 100);
    pdf.text(`Name: ${formData.name}`, 30, 115);
    pdf.text(`Email: ${formData.email}`, 30, 125);
    pdf.text(`Phone: ${formData.phone}`, 30, 135);
    if (formData.company) {
      pdf.text(`Company: ${formData.company}`, 30, 145);
    }
    
    // Requirements
    pdf.text('Project Requirements:', 20, 165);
    const splitRequirements = pdf.splitTextToSize(formData.requirements, 170);
    pdf.text(splitRequirements, 30, 180);
    
    // Timeline and Budget (if provided)
    let yPosition = 180 + (splitRequirements.length * 5) + 20;
    
    if (formData.timeline) {
      pdf.text(`Timeline: ${formData.timeline}`, 20, yPosition);
      yPosition += 15;
    }
    
    if (formData.budget) {
      pdf.text(`Budget Range: ${formData.budget}`, 20, yPosition);
      yPosition += 15;
    }
    
    // Next Steps
    pdf.text('What happens next:', 20, yPosition + 10);
    pdf.text('• Our team will review your requirements within 24 hours', 30, yPosition + 25);
    pdf.text('• We will contact you within 48 hours with detailed proposal', 30, yPosition + 35);
    pdf.text('• Free consultation call to discuss your project', 30, yPosition + 45);
    pdf.text('• Custom quote based on your specific needs', 30, yPosition + 55);
    
    // Footer
    pdf.text('Contact: letsconnect@themadrasmarketeer.com | Phone: 8825065657', 20, 280);
    
    return pdf.output('blob');
  };

  const handleDownloadPDF = () => {
    if (!isFormValid) return;
    
    const pdfBlob = generateRequirementsPDF();
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${serviceName}-Requirements-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 1000);
  };

  const isFormValid = formData.name && formData.email && formData.phone && formData.requirements;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{serviceName}</h2>
              <p className="text-gray-600 mt-1">Tell us about your requirements</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building className="w-4 h-4 inline mr-2" />
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your company name"
              />
            </div>
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Detailed Requirements *
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Please describe your project requirements in detail. Include features, functionality, target audience, and any specific needs..."
            />
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timeline
            </label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select timeline</option>
              <option value="asap">ASAP</option>
              <option value="1-month">Within 1 month</option>
              <option value="2-3-months">2-3 months</option>
              <option value="3-6-months">3-6 months</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          {/* Information Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Our team will review your requirements within 24 hours</li>
              <li>• We'll contact you within 48 hours with detailed proposal</li>
              <li>• Free consultation call to discuss your project</li>
              <li>• Custom quote based on your specific needs</li>
              <li>• Download requirements document for your records</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={!isFormValid}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Send className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Requirements'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequirementsForm;