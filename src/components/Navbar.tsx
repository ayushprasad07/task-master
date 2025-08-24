'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';
import { Button } from '@/components/ui/button'; // Make sure this import path is correct
import { FileText, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">TaskMaster</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
              <a href="#note-types" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Note Types</a>
              <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">How It Works</a>
              <a href="/sign-in" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Sign In
              </a>
              <a href="/sign-up" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                Get Started Free
              </a>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-slate-700 pt-4">
              <div className="flex flex-col space-y-3">
                <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
                <a href="#note-types" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Note Types</a>
                <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">How It Works</a>
                <a href="/sign-in" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Sign In
                </a>
                <a href="/sign-up" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors text-center">
                  Get Started Free
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
  );
};

export default Navbar;
