"use client";

import React, { useState, useEffect } from 'react';
import InteractiveAmenitiesMap from './InteractiveAmenitiesMap';
import { Card } from '@/components/ui/Card';

interface InteractiveAmenitiesMapContainerProps {
  propertyId: string;
  suburb: string;
  latitude: number;
  longitude: number;
}

const InteractiveAmenitiesMapContainer = ({
  propertyId,
  suburb = "Parramatta",
  latitude = -33.8136,
  longitude = 151.0034
}: InteractiveAmenitiesMapContainerProps) => {
  const [amenityTypes, setAmenityTypes] = useState<string[]>([
    'school',
    'park',
    'shopping',
    'transport',
    'restaurant',
    'hospital'
  ]);
  const [selectedAmenityTypes, setSelectedAmenityTypes] = useState<string[]>([
    'school',
    'park',
    'shopping',
    'transport'
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Function to toggle amenity type selection
  const toggleAmenityType = (type: string) => {
    if (selectedAmenityTypes.includes(type)) {
      setSelectedAmenityTypes(selectedAmenityTypes.filter(t => t !== type));
    } else {
      setSelectedAmenityTypes([...selectedAmenityTypes, type]);
    }
  };
  
  // Function to fetch amenities data - in a real app, this would call an API
  const fetchAmenities = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call
      // const response = await fetch(`/api/properties/${propertyId}/amenities`);
      // if (!response.ok) throw new Error('Failed to fetch amenities');
      // const data = await response.json();
      
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load amenities data. Please try again later.');
      setIsLoading(false);
    }
  };
  
  // Fetch amenities on component mount
  useEffect(() => {
    fetchAmenities();
  }, [propertyId]);
  
  return (
    <div>
      {isLoading ? (
        <Card className="p-6">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </Card>
      ) : error ? (
        <Card className="p-6 bg-red-50 border-2 border-red-300">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
        </Card>
      ) : (
        <div>
          <InteractiveAmenitiesMap 
            suburb={suburb}
            propertyLat={latitude}
            propertyLng={longitude}
          />
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Filter Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {amenityTypes.map(type => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded-md ${
                    selectedAmenityTypes.includes(type)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => toggleAmenityType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveAmenitiesMapContainer;
