
import React from 'react';
import { cn } from '@/lib/utils';
import BackgroundEffect from '@/components/BackgroundEffect';

interface AuthLayoutProps {
  children: React.ReactNode;
  heading: string;
  subheading: string;
  imageSrc?: string;
}

const AuthLayout = ({ children, heading, subheading, imageSrc = "/lovable-uploads/3fc20d41-a17d-421a-af0f-f8f0168454ae.png" }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Background image with motivational text */}
      <div className="hidden md:flex md:w-1/2 relative bg-black">
        <img 
          src={imageSrc} 
          alt="Fitness motivation" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center p-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Transform <br />Your Fitness
          </h1>
          <p className="text-white/90 text-xl mt-4 max-w-md">
            Connect with expert trainers and achieve your health goals with Common Health
          </p>
        </div>
      </div>
      
      {/* Right side - Auth form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <BackgroundEffect />
        <div className="w-full max-w-md">
          {/* Logo and heading */}
          <div className="text-center mb-8">
            <div className="mx-auto w-14 h-14 mb-4">
              <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center">
                <span className="text-white text-xl font-bold">C</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-1">{heading}</h2>
            <p className="text-muted-foreground">{subheading}</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
