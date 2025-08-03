import React from 'react';
import Image from '../../../components/AppImage';

const LoginBackground = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Students studying in library"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/80"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-center px-12 text-white">
        <div className="max-w-md">
          <h2 className="font-heading text-3xl font-semibold mb-4">
            Transform Your Study Experience
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Import, organize, and extract key insights from your study materials with intelligent highlighting and summarization tools.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">1</span>
              </div>
              <span className="text-sm">Import documents and PDFs</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">2</span>
              </div>
              <span className="text-sm">Highlight and annotate key points</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">3</span>
              </div>
              <span className="text-sm">Export organized study materials</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-12 h-12 bg-white/10 rounded-full"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-white/10 rounded-full"></div>
    </div>
  );
};

export default LoginBackground;