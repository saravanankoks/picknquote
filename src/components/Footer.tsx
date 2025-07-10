import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="glass border-t border-white/20 mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-4 animate-fadeInLeft">
            <img 
              src="public/TMM_Logo.jpg" 
              alt="TMM Logo" 
              className="w-12 h-12 rounded-2xl shadow-lg object-cover border-2 border-white/20"
            />
            <div>
              <span className="text-white font-semibold text-lg">TMM Smart Select App</span>
              <p className="text-white/70 text-sm">Digital Marketing Solutions</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 animate-fadeInRight">
            <div className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors group">
              <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <span className="font-medium">SaravanaKumar - 8825065657</span>
            </div>
            <div className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors group">
              <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <span className="font-medium">letsconnect@themadrasmarketeer.com</span>
            </div>
            <div className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors group">
              <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="font-medium">Egmore, Chennai</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p className="text-white/70">
            &copy; 2025 Developed by TheMadrasMarketeer
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;