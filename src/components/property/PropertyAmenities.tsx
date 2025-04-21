"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';

interface AmenityItem {
  name: string;
  type: string;
  distance: number;
  rating: number;
}

interface PropertyAmenitiesProps {
  propertyId: string;
}

const PropertyAmenities = ({ propertyId }: PropertyAmenitiesProps) => {
  const [activeTab, setActiveTab] = useState('schools');
  
  // Mock amenities data - in a real app, this would come from an API
  const amenitiesData = {
    schools: [
      { name: 'Parramatta Public School', type: 'Public Primary', distance: 0.8, rating: 4.2 },
      { name: 'Arthur Phillip High School', type: 'Public Secondary', distance: 1.2, rating: 3.8 },
      { name: 'Our Lady of Mercy College', type: 'Private Secondary', distance: 1.5, rating: 4.5 },
      { name: 'St Patrick\'s Primary School', type: 'Catholic Primary', distance: 1.7, rating: 4.0 }
    ],
    transport: [
      { name: 'Parramatta Station', type: 'Train', distance: 0.9, rating: 4.0 },
      { name: 'Parramatta Bus Interchange', type: 'Bus', distance: 1.0, rating: 3.7 },
      { name: 'Parramatta Ferry Wharf', type: 'Ferry', distance: 1.3, rating: 4.2 },
      { name: 'Parramatta Light Rail Stop', type: 'Light Rail', distance: 0.7, rating: 4.5 }
    ],
    shopping: [
      { name: 'Westfield Parramatta', type: 'Shopping Centre', distance: 0.6, rating: 4.5 },
      { name: 'Parramatta Farmers Market', type: 'Market', distance: 1.1, rating: 4.3 },
      { name: 'Church Street Mall', type: 'Shopping Strip', distance: 0.8, rating: 3.9 },
      { name: 'Woolworths Parramatta', type: 'Supermarket', distance: 0.5, rating: 4.0 }
    ],
    parks: [
      { name: 'Parramatta Park', type: 'Regional Park', distance: 0.7, rating: 4.7 },
      { name: 'Robin Thomas Reserve', type: 'Local Park', distance: 1.2, rating: 4.0 },
      { name: 'James Ruse Reserve', type: 'Sports Field', distance: 1.8, rating: 3.8 },
      { name: 'Lake Parramatta Reserve', type: 'Nature Reserve', distance: 2.5, rating: 4.6 }
    ],
    dining: [
      { name: 'Temasek Restaurant', type: 'Singaporean', distance: 0.6, rating: 4.3 },
      { name: 'El-Phoenician', type: 'Lebanese', distance: 0.9, rating: 4.5 },
      { name: 'Kouzina Greco', type: 'Greek', distance: 1.1, rating: 4.2 },
      { name: 'Itihaas Indian Restaurant', type: 'Indian', distance: 0.8, rating: 4.0 }
    ],
    health: [
      { name: 'Westmead Hospital', type: 'Public Hospital', distance: 2.5, rating: 4.1 },
      { name: 'Parramatta Medical Centre', type: 'Medical Centre', distance: 0.7, rating: 3.9 },
      { name: 'Parramatta Dental Clinic', type: 'Dental', distance: 0.9, rating: 4.0 },
      { name: 'Parramatta Pharmacy', type: 'Pharmacy', distance: 0.5, rating: 4.2 }
    ]
  };
  
  // Get amenities for the active tab
  const activeAmenities = amenitiesData[activeTab as keyof typeof amenitiesData] || [];
  
  // Calculate average rating for the active tab
  const averageRating = activeAmenities.length > 0
    ? (activeAmenities.reduce((sum, item) => sum + item.rating, 0) / activeAmenities.length).toFixed(1)
    : 'N/A';
  
  // Calculate average distance for the active tab
  const averageDistance = activeAmenities.length > 0
    ? (activeAmenities.reduce((sum, item) => sum + item.distance, 0) / activeAmenities.length).toFixed(1)
    : 'N/A';
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Local Amenities</h2>
      
      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 mb-6">
        {Object.keys(amenitiesData).map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Summary Card */}
      <Card className="p-6 mb-6 border-2 border-blue-300 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-1">Average Rating</h3>
            <div className="flex items-center justify-center">
              <span className="text-3xl font-bold text-blue-600">{averageRating}</span>
              <span className="text-yellow-500 ml-2">★</span>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-1">Average Distance</h3>
            <div className="text-3xl font-bold text-blue-600">{averageDistance} km</div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-1">Total {activeTab}</h3>
            <div className="text-3xl font-bold text-blue-600">{activeAmenities.length}</div>
          </div>
        </div>
      </Card>
      
      {/* Amenities List */}
      <div className="space-y-4">
        {activeAmenities.map((amenity, index) => (
          <Card key={index} className="p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{amenity.name}</h3>
                <p className="text-gray-600">{amenity.type}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-gray-600">Distance</div>
                  <div className="font-medium">{amenity.distance} km</div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-600">Rating</div>
                  <div className="flex items-center">
                    <span className="font-medium mr-1">{amenity.rating}</span>
                    <span className="text-yellow-500">★</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PropertyAmenities;
