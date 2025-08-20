'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';
import { Button } from '@/components/ui/button'; // Make sure this import path is correct

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-500/80 to-purple-600/80 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300 group-hover:scale-110 border border-white/30">
                  <span className="text-white font-bold text-sm sm:text-base drop-shadow-sm">T</span>
                  <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/40 to-purple-600/40 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <span className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 drop-shadow-sm">
                Task-Master
              </span>
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {session ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Welcome message - hidden on small screens */}
                <div className="hidden md:flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20">
                  <span className="text-sm font-medium text-gray-900">
                    Welcome, {user?.username || user?.email}
                  </span>
                </div>
                
                {/* Sign Out Button */}
                <Button 
                  variant="ghost"
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-600 border border-red-500/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base transition-all duration-300 hover:shadow-lg cursor-pointer"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Login Button */}
                <Link
                  href="/sign-in"
                  className="group relative px-3 py-1.5 sm:px-4 sm:py-2 text-gray-700 font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 group-hover:bg-white/30 group-hover:border-white/40 transition-all duration-300 shadow-md group-hover:shadow-lg"></div>
                  <span className="relative z-10 group-hover:text-gray-900 transition-colors duration-300 text-sm sm:text-base">
                    Login
                  </span>
                </Link>
                
                {/* Get Started Button */}
                <Link
                  href="/sign-up"
                  className="group relative px-3 py-1.5 sm:px-4 sm:py-2 font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg group-hover:shadow-xl group-hover:from-indigo-500/90 group-hover:to-purple-500/90 transition-all duration-300"></div>
                  <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 text-white drop-shadow-sm group-hover:text-gray-50 transition-colors duration-300 text-sm sm:text-base">
                    Get Started
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
