import React from 'react';

import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import LoginBackground from './components/LoginBackground';

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg shadow-card border border-border p-8">
            <LoginForm />
            <div className="mt-8">
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Background Image (Desktop Only) */}
      <LoginBackground />
    </div>
  );
};

export default Login;