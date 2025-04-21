"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { mockPropertiesDetailed } from '@/lib/mockData';
import SearchComponent from '@/components/search/SearchComponent';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Find Your Next Investment Property</h1>
            <p className="text-xl mb-8">Discover high-performing properties with comprehensive investment analysis and neighborhood insights.</p>
            
            <div className="max-w-3xl mx-auto">
              <SearchComponent />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Properties */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Investment Properties</h2>
            <Link href="/properties" className="text-blue-600 hover:underline">
              View all properties
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPropertiesDetailed.map((property) => (
              <Link key={property.id} href={`/property/${property.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                  <div className="relative h-48 bg-gray-200">
                    {property.images && property.images.length > 0 && (
                      <Image 
                        src={property.images[0]} 
                        alt={property.title} 
                        fill 
                        style={{ objectFit: 'cover' }} 
                      />
                    )}
                    <div className="absolute top-2 left-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                      {property.propertyType}
                    </div>
                    <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                      ${property.price.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
                    <p className="text-gray-600 mb-2">{property.suburb}, {property.state}</p>
                    
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span>{property.bedrooms} beds</span>
                      <span>{property.bathrooms} baths</span>
                      <span>{property.carSpaces} cars</span>
                    </div>
                    
                    {property.rentalYield && (
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-700">{property.rentalYield}% yield</span>
                        <span className="text-gray-700">{property.growthPotential}% growth p.a.</span>
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Investor Tools */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Investor Tools & Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Investment Calculators</h3>
              <p className="text-gray-600 mb-6">Calculate mortgage payments, rental yield, capital growth, and more.</p>
              <Button variant="outline" className="w-full">
                Access Calculators
              </Button>
            </Card>
            
            <Card className="p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Market Reports</h3>
              <p className="text-gray-600 mb-6">Access detailed suburb reports, price trends, and growth forecasts.</p>
              <Button variant="outline" className="w-full">
                View Reports
              </Button>
            </Card>
            
            <Card className="p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Investment Guides</h3>
              <p className="text-gray-600 mb-6">Learn property investment strategies, tax benefits, and risk management.</p>
              <Button variant="outline" className="w-full">
                Read Guides
              </Button>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Market Insights */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Market Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Growth Suburbs</h3>
              <div className="space-y-4">
                {mockPropertiesDetailed.map((property) => (
                  <div key={`growth-${property.id}`} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{property.suburb}, {property.state}</div>
                      <div className="text-sm text-gray-600">Median: ${property.suburbMedianPrice.toLocaleString()}</div>
                    </div>
                    <div className="text-green-600 font-semibold">+{property.suburbGrowthRate}% p.a.</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Rental Yield Suburbs</h3>
              <div className="space-y-4">
                {mockPropertiesDetailed.map((property) => (
                  <div key={`yield-${property.id}`} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{property.suburb}, {property.state}</div>
                      <div className="text-sm text-gray-600">Median: ${property.suburbMedianPrice.toLocaleString()}</div>
                    </div>
                    <div className="text-blue-600 font-semibold">{property.suburbRentalYield}% yield</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Property Investment Journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Join thousands of successful investors who use our platform to find, analyze, and purchase high-performing investment properties.</p>
          <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">
            Get Started
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">InvestorProperty</h3>
              <p className="text-gray-400 mb-4">The premier platform for property investors, providing comprehensive data and analysis tools.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/properties" className="hover:text-white">Find Properties</Link></li>
                <li><Link href="/market-research" className="hover:text-white">Market Research</Link></li>
                <li><Link href="/tools" className="hover:text-white">Investment Tools</Link></li>
                <li><Link href="/news" className="hover:text-white">Investor News</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/guides" className="hover:text-white">Investment Guides</Link></li>
                <li><Link href="/calculators" className="hover:text-white">Property Calculators</Link></li>
                <li><Link href="/reports" className="hover:text-white">Market Reports</Link></li>
                <li><Link href="/community" className="hover:text-white">Investor Community</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@investorproperty.com</li>
                <li>1300 123 456</li>
                <li>Sydney, Australia</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2025 InvestorProperty. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
