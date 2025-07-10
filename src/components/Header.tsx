import React from 'react';
import { Sparkles, User, ChevronDown } from 'lucide-react';
import { User as UserType } from '../types/user';

interface HeaderProps {
  user?: UserType;
  onShowProfile?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onShowProfile }) => {
  return (
    <header className="glass border-b border-white/20 sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4 animate-fadeInLeft">
            <div className="relative">
              <img 
                src="../TMM_Logo.jpg" 
                alt="TMM Logo" 
                className="w-16 h-16 rounded-2xl shadow-lg object-cover border-2 border-white/20"
              />
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                TMM Smart Select
              </h1>
              <p className="text-sm text-cyan-200/90 font-medium">Digital Marketing Solutions</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 animate-fadeInRight">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.isGuest && (
                  <div className="bg-orange-500/20 border border-orange-400/30 rounded-xl px-3 py-1">
                    <span className="text-orange-300 text-sm font-medium">👤 Guest Mode</span>
                  </div>
                )}
                <div className="hidden md:block text-right text-white/90">
                  <p className="text-sm font-medium">
                    Welcome, {user.isGuest ? 'Guest' : user.name}
                  </p>
                  <p className="text-xs capitalize">
                    {user.isGuest ? 'Guest Access' : `${user.subscriptionTier} Plan`}
                  </p>
                </div>
                <button
                  onClick={onShowProfile}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-all duration-300 border border-white/20"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden md:block font-medium">Profile</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-6">
                <div className="text-right text-white/90">
                  <p className="text-sm font-medium">Need Help?</p>
                  <p className="text-xs">Call: 8825065657</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;