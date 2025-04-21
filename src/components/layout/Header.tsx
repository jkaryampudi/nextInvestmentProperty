"use client";

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                InvestorProperty
              </Link>
              <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md">BETA</span>
            </div>
            <nav className="ml-6 flex space-x-8">
              <Link href="/properties" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                Find Properties
              </Link>
              <Link href="/market-research" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Market Research
              </Link>
              <Link href="/tools" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Investment Tools
              </Link>
              <Link href="/news" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Investor News
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <Button variant="default" size="sm" className="ml-4">
              Log in
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
