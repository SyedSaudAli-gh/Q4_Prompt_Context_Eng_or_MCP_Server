'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-md"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-black dark:text-white">
            My Portfolio
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/about" className="text-black dark:text-white hover:text-blue-500 px-4 py-2 rounded-md">
                  About
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/skills" className="text-black dark:text-white hover:text-blue-500 px-4 py-2 rounded-md">
                  Skills
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/projects" className="text-black dark:text-white hover:text-blue-500 px-4 py-2 rounded-md">
                  Projects
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" className="text-black dark:text-white hover:text-blue-500 px-4 py-2 rounded-md">
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button asChild>
            <Link href="/contact">Hire Me</Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;