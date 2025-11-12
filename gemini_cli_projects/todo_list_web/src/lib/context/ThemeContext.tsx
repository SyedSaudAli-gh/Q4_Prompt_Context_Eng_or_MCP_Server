"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  setThemeName: (name: string) => void;
  themeName: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Available themes
const themes: { [key: string]: Theme } = {
  'Ocean Blue': {
    name: 'Ocean Blue',
    background: 'bg-blue-500',
    text: 'text-white',
    primary: 'bg-blue-700',
    secondary: 'bg-blue-600',
    accent: 'bg-blue-400',
  },
  'Purple Dream': {
    name: 'Purple Dream',
    background: 'bg-purple-500',
    text: 'text-white',
    primary: 'bg-purple-700',
    secondary: 'bg-purple-600',
    accent: 'bg-purple-400',
  },
  'Forest Green': {
    name: 'Forest Green',
    background: 'bg-green-500',
    text: 'text-white',
    primary: 'bg-green-700',
    secondary: 'bg-green-600',
    accent: 'bg-green-400',
  },
  'Sunset Orange': {
    name: 'Sunset Orange',
    background: 'bg-orange-500',
    text: 'text-white',
    primary: 'bg-orange-700',
    secondary: 'bg-orange-600',
    accent: 'bg-orange-400',
  },
  'Rose Pink': {
    name: 'Rose Pink',
    background: 'bg-pink-500',
    text: 'text-white',
    primary: 'bg-pink-700',
    secondary: 'bg-pink-600',
    accent: 'bg-pink-400',
  },
  'Dark Mode': {
    name: 'Dark Mode',
    background: 'bg-slate-800',
    text: 'text-white',
    primary: 'bg-slate-900',
    secondary: 'bg-slate-700',
    accent: 'bg-slate-600',
  },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<string>('Dark Mode'); // Default theme
  const [isLoaded, setIsLoaded] = useState(false); // ⭐ Loading state add kiya

  // ✅ Component mount hone par localStorage se theme LOAD karo
  useEffect(() => {
    console.log('🎨 ThemeProvider: localStorage se theme load kar rahe hain...');
    
    try {
      const storedTheme = localStorage.getItem('themeName');
      if (storedTheme && themes[storedTheme]) {
        setThemeName(storedTheme);
        console.log('✅ ThemeProvider: Theme loaded:', storedTheme);
      } else {
        console.log('📭 ThemeProvider: localStorage mein theme nahi hai, default use kar rahe hain');
      }
    } catch (error) {
      console.error('❌ ThemeProvider: Theme load karne mein error:', error);
    }
    
    setIsLoaded(true);
  }, []);

  // ✅ Theme change hone par localStorage mein SAVE karo
  useEffect(() => {
    if (isLoaded) { // ⭐ Sirf jab initial load complete ho
      console.log('💾 ThemeProvider: localStorage mein theme save kar rahe hain:', themeName);
      localStorage.setItem('themeName', themeName);
    }
  }, [themeName, isLoaded]);

  const theme = themes[themeName] || themes['Dark Mode'];

  return (
    <ThemeContext.Provider value={{ theme, setThemeName, themeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};