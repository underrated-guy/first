import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLogin = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider);
    
    // Simulate social login process
    setTimeout(() => {
      // Mock successful social login
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      localStorage.setItem('loginProvider', provider);
      navigate('/document-dashboard');
    }, 2000);
  };

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: 'Square',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="space-y-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            fullWidth
            onClick={() => handleSocialLogin(provider?.id)}
            loading={loadingProvider === provider?.id}
            disabled={loadingProvider !== null}
            className={`
              ${provider?.bgColor} ${provider?.textColor} ${provider?.borderColor}
              transition-colors duration-200
            `}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name={provider?.icon} size={18} />
              <span>Continue with {provider?.name}</span>
            </div>
          </Button>
        ))}
      </div>
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            type="button"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
            onClick={() => navigate('/register')}
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;