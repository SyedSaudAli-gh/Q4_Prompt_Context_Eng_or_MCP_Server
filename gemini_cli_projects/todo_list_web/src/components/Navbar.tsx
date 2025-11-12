"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // ⭐ Current path detect karne ke liye
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../lib/context/ThemeContext';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Sun, CheckCircle, Home } from 'lucide-react';

const themes = [
  'Ocean Blue',
  'Purple Dream',
  'Forest Green',
  'Sunset Orange',
  'Rose Pink',
  'Dark Mode',
];

const Navbar = () => {
  const { theme, setThemeName, themeName } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // ⭐ Current route

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'Completed Tasks', href: '/completed', icon: <CheckCircle className="h-4 w-4" /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`${theme.primary} p-4 shadow-xl sticky top-0 z-50`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" passHref>
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold text-white cursor-pointer flex items-center gap-2"
          >
            ✓ TodoApp
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href; // ⭐ Check karo active hai ya nahi
            
            return (
              <Link href={link.href} key={link.name} passHref>
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className={`flex items-center space-x-2 cursor-pointer px-3 py-2 rounded-lg transition-all ${
                    isActive 
                      ? `${theme.accent} text-white font-semibold` // Active link
                      : 'text-white hover:bg-white/10' // Inactive link
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </motion.span>
              </Link>
            );
          })}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Sun className="h-5 w-5 mr-2" /> {themeName}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`${theme.secondary} text-white border-none`}>
              {themes.map((name) => (
                <DropdownMenuItem 
                  key={name} 
                  onClick={() => setThemeName(name)}
                  className={`cursor-pointer hover:bg-white/10 ${
                    themeName === name ? 'bg-white/20 font-semibold' : ''
                  }`}
                >
                  {name} {themeName === name && '✓'}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className={`${theme.primary} text-white border-none`}>
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  
                  return (
                    <Link href={link.href} key={link.name} passHref>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`text-lg flex items-center space-x-2 cursor-pointer px-3 py-2 rounded-lg ${
                          isActive 
                            ? `${theme.accent} font-semibold` 
                            : 'hover:bg-white/10'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </motion.span>
                    </Link>
                  );
                })}
                
                <div className="pt-4 border-t border-white/20">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="text-white justify-start pl-2 w-full hover:bg-white/10">
                        <Sun className="h-5 w-5 mr-2" /> {themeName}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={`${theme.secondary} text-white border-none`}>
                      {themes.map((name) => (
                        <DropdownMenuItem 
                          key={name} 
                          onClick={() => { 
                            setThemeName(name); 
                            setIsOpen(false); 
                          }}
                          className={`cursor-pointer hover:bg-white/10 ${
                            themeName === name ? 'bg-white/20 font-semibold' : ''
                          }`}
                        >
                          {name} {themeName === name && '✓'}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;