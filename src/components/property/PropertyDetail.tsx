"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import InteractiveAmenitiesMap from './InteractiveAmenitiesMap';
import PropertyAmenities from './PropertyAmenities';
import PropertyRiskAssessment from './PropertyRiskAssessment';
import InvestmentAnalysis from './InvestmentAnalysis';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { mockPropertiesDetailed } from '@/lib/mockData';

const PropertyDetail = () => {
  const params = useParams();
  const propertyId = params?.id as string;
  
  // Find property data (in a real app, this would come from an API)
  const property = mockPropertiesDetailed.find(p => p.id.toString() === propertyId) || mockPropertiesDetailed[0];
  
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/search" className="text-blue-600 hover:underline">Properties</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-600">{property.suburb}</span>
      </div>
      
      {/* Property Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
        <p className="text-xl text-blue-700 mb-4">${property.price.toLocaleString()}</p>
        <div className="flex flex-wrap items-center gap-4">
          <Badge colorScheme="primary" className="text-sm">{property.propertyType}</Badge>
          <div className="flex items-center text-gray-700">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span>{property.address}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>{property.suburb}, {property.state}</span>
          </div>
        </div>
      </div>
      
      {/* Property Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
          {property.images && property.images.length > 0 && (
            <Image 
              src={property.images[0]} 
              alt={property.title} 
              fill 
              style={{ objectFit: 'cover' }} 
              className="hover:scale-105 transition-transform duration-300"
            />
          ) }
        </div>
        <div className="grid grid-cols-2 gap-4">
          {property.images && property.images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative h-44 bg-gray-200 rounded-lg overflow-hidden">
              <Image 
                src={image} 
                alt={`${property.title} - Image ${index + 2}`} 
                fill 
                style={{ objectFit: 'cover' }} 
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Property Features */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-4 border-2 border-blue-500 shadow-lg">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-600">{property.bedrooms}</span>
            <span className="text-gray-700">Bedrooms</span>
          </div>
        </Card>
        <Card className="p-4 border-2 border-blue-500 shadow-lg">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-600">{property.bathrooms}</span>
            <span className="text-gray-700">Bathrooms</span>
          </div>
        </Card>
        <Card className="p-4 border-2 border-blue-500 shadow-lg">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-600">{property.carSpaces}</span>
            <span className="text-gray-700">Car Spaces</span>
          </div>
        </Card>
        <Card className="p-4 border-2 border-blue-500 shadow-lg">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-600">{property.landSize}</span>
            <span className="text-gray-700">Land Size (m²)</span>
          </div>
        </Card>
      </div>
      
      {/* Investment Snapshot */}
      <Card className="p-6 mb-8 border-2 border-green-500 shadow-lg">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Investment Snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Rental Yield</h3>
            <div className="text-3xl font-bold text-green-600 mb-2">{property.rentalYield}%</div>
            <p className="text-sm text-gray-600">Annual rental income as percentage of property value</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Growth Potential</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">{property.growthPotential}%</div>
            <p className="text-sm text-gray-600">Projected annual capital growth rate</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Cash Flow</h3>
            <div className="text-3xl font-bold text-purple-600 mb-2">${property.cashFlow}/wk</div>
            <p className="text-sm text-gray-600">Estimated weekly cash flow after expenses</p>
          </div>
        </div>
      </Card>
      
      {/* Tabs */}
      <div className="mb-8">
        <div className="flex border-b border-gray-300 mb-6">
          <button
            className={`px-4 py-2 font-medium text-lg ${
              activeTab === 'overview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium text-lg ${
              activeTab === 'features'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button
            className={`px-4 py-2 font-medium text-lg ${
              activeTab === 'investment'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('investment')}
          >
            Investment Analysis
          </button>
          <button
            className={`px-4 py-2 font-medium text-lg ${
              activeTab === 'location'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('location')}
          >
            Location
          </button>
        </div>
        
        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Overview</h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">{property.description}</p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Property Highlights</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                {property.highlights.map((highlight, index) => (
                  <li key={index} className="text-lg">{highlight}</li>
                ))}
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Property Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-40">Property Type:</span>
                  <span className="text-gray-900">{property.propertyType}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-40">Year Built:</span>
                  <span className="text-gray-900">{property.yearBuilt}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-40">Land Size:</span>
                  <span className="text-gray-900">{property.landSize} m²</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-40">Building Size:</span>
                  <span className="text-gray-900">{property.buildingSize} m²</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-40">Zoning:</span>
                  <span className="text-gray-900">{property.zoning}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-40">Council Rates:</span>
                  <span className="text-gray-900">${property.councilRates}/quarter</span>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'features' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Interior Features</h3>
                  <ul className="space-y-2">
                    {property.interiorFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-lg">{feature}</span>
                      </li>
                    ) )}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Exterior Features</h3>
                  <ul className="space-y-2">
                    {property.exteriorFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-lg">{feature}</span>
                      </li>
                    ) )}
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Climate Control & Utilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {property.utilities.map((utility, index) => (
                  <div key={index} className="flex items-center bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    <span className="text-gray-800">{utility}</span>
                  </div>
                ) )}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Floor Plan</h3>
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <p className="text-center text-gray-700">Floor plan available upon request</p>
              </div>
            </div>
          )}
          
          {activeTab === 'investment' && (
            <InvestmentAnalysis property={property} />
          )}
          
          {activeTab === 'location' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Location & Neighborhood</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Suburb Profile: {property.suburb}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border-2 border-blue-300 shadow-md">
                    <h4 className="font-medium text-lg text-blue-800 mb-2">Demographics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Median Age:</span>
                        <span className="font-medium text-gray-900">35 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Household Size:</span>
                        <span className="font-medium text-gray-900">2.8 people</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Owner Occupied:</span>
                        <span className="font-medium text-gray-900">62%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Renter Occupied:</span>
                        <span className="font-medium text-gray-900">38%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border-2 border-green-300 shadow-md">
                    <h4 className="font-medium text-lg text-green-800 mb-2">Market Statistics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Median House Price:</span>
                        <span className="font-medium text-gray-900">${property.suburbMedianPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Annual Growth:</span>
                        <span className="font-medium text-green-600">{property.suburbGrowthRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Median Rent:</span>
                        <span className="font-medium text-gray-900">${property.suburbMedianRent}/week</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Rental Yield:</span>
                        <span className="font-medium text-green-600">{property.suburbRentalYield}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Local Amenities */}
              <PropertyAmenities propertyId={property.id} />
              
              {/* Risk Assessment */}
              <div className="mt-12">
                <PropertyRiskAssessment 
                  propertyId={property.id}
                  propertyType={property.propertyType}
                  suburb={property.suburb}
                />
              </div>
              
              {/* Interactive Amenities Map */}
              <div className="mt-12">
                <InteractiveAmenitiesMap 
                  suburb={property.suburb} 
                  propertyLat={property.latitude} 
                  propertyLng={property.longitude} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Call to Action */}
      <Card className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Interested in this property?</h2>
            <p className="text-blue-100 mb-4 md:mb-0">Contact our investment specialists for more information or to arrange a viewing.</p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-white text-blue-700 hover:bg-blue-50">
              Request Details
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-blue-700">
              Schedule Viewing
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PropertyDetail;
