import React, { useState } from 'react';
import { Mail, Lock, User, Key, Eye, EyeOff, Sparkles, Shield } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, name: string, inviteKey: string) => Promise<void>;
  onGuestLogin: (inviteCode: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSignUp, onGuestLogin, isLoading, error }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showGuestLogin, setShowGuestLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    inviteKey: '',
    guestCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (showGuestLogin) {
      await onGuestLogin(formData.guestCode);
    } else if (isSignUp) {
      await onSignUp(formData.email, formData.password, formData.name, formData.inviteKey);
    } else {
      await onLogin(formData.email, formData.password);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      inviteKey: '',
      guestCode: ''
    });
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setShowGuestLogin(false);
    resetForm();
  };

  const toggleGuestMode = () => {
    setShowGuestLogin(!showGuestLogin);
    setIsSignUp(false);
    resetForm();
  };
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">TMM Smart Select</h1>
            </div>
            <p className="text-white/80 text-lg">
              {showGuestLogin ? 'Quick Access' : isSignUp ? 'Create your account' : 'Welcome back!'}
            </p>
            <p className="text-white/60 text-sm mt-2">
              {showGuestLogin ? 'Enter invite code for instant access' : 
               isSignUp ? 'Join our digital marketing platform' : 'Sign in to continue to your dashboard'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl">
              <p className="text-red-200 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Guest Login Form */}
            {showGuestLogin ? (
              <div className="space-y-2">
                <label className="block text-white/80 text-sm font-medium">Invite Code</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    name="guestCode"
                    value={formData.guestCode}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
                    placeholder="Enter invite code"
                  />
                </div>

              </div>
            ) : (
              <>
            {/* Name Field (Sign Up Only) */}
            {isSignUp && (
              <div className="space-y-2">
                <label className="block text-white/80 text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={isSignUp}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-white/80 text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-white/80 text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Invite Key Field (Sign Up Only) */}
            {isSignUp && (
              <div className="space-y-2">
                <label className="block text-white/80 text-sm font-medium">Invite Key</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    name="inviteKey"
                    value={formData.inviteKey}
                    onChange={handleInputChange}
                    required={isSignUp}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
                    placeholder="Enter invite key"
                  />
                </div>
                <p className="text-white/60 text-xs">
                  Don't have an invite key? Please contact admin.
                </p>
              </div>
            )}
            </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>
                    {showGuestLogin ? 'Accessing...' : 
                     isSignUp ? 'Creating Account...' : 'Signing In...'}
                  </span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>
                    {showGuestLogin ? 'Quick Access' : 
                     isSignUp ? 'Create Account' : 'Sign In'}
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Toggle Modes */}
          <div className="mt-8 text-center">
            {!showGuestLogin && (
              <>
                <p className="text-white/60">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                </p>
                <button
                  onClick={toggleMode}
                  className="mt-2 text-blue-300 hover:text-blue-200 font-medium transition-colors"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </>
            )}
            
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-white/60 text-sm mb-2">
                {showGuestLogin ? 'Want to create a permanent account?' : 'Just want to try it out?'}
              </p>
              <button
                onClick={toggleGuestMode}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
              >
                {showGuestLogin ? 'Create Account' : '🚀 Quick Access'}
              </button>
            </div>
          </div>

          {/* Trial Info */}
          {(isSignUp || showGuestLogin) && (
            <div className="mt-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-green-300" />
                <span className="text-green-300 font-medium text-sm">
                  {showGuestLogin ? 'Instant Access' : '7-Day Free Trial'}
                </span>
              </div>
              <p className="text-green-200 text-xs">
                {showGuestLogin ? 
                  'Get immediate access with 3 free quotes and explore all features!' :
                  'Start with 3 free quotes and explore all features for 7 days!'
                }
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            © 2025 TheMadrasMarketeer. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;