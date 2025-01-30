import React from 'react';

interface LogoProps {
  isDarkMode: boolean;
}

export const Logo = ({ isDarkMode }: LogoProps) => {
  return (
    <div className="flex items-center">
      <img 
        src={isDarkMode 
          ? "/logo-white.png"  // Light text version for dark mode
          : "/logo-dark.png"   // Dark text version for light mode
        }
        alt="DealerPhones Logo" 
        className="h-12 w-auto"
      />
    </div>
  );
};