"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

// Domain API key - in production, this should be an environment variable
const DOMAIN_API_KEY = 'key_6d45cdc2bc971feb0c88cbf661c107f6';

interface LocationSuggestion {
  id: string;
  displayName: string;
  state: string;
  postcode: string;
  suburb: string;
}

interface PropertyListing {
  id: string;
  listingType: string;
  propertyType: string;
  price: number;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  landSize: number;
  images: string[];
  description: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
}

export const useDomainApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
  const [properties, setProperties] = useState<PropertyListing[]>([]);

  // Search for location suggestions
  const searchLocations = async (query: string) => {
    if (!query || query.length < 2) {
      setLocationSuggestions([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call the Domain API
      // For now, we'll use a mock implementation with error handling
      const response = await axios.get(
        `https://api.domain.com.au/v1/locations/suggest?terms=${encodeURIComponent(query) }`,
        {
          headers: {
            'X-Api-Key': DOMAIN_API_KEY
          }
        }
      );

      if (response.status === 200) {
        setLocationSuggestions(response.data);
      } else {
        // Fallback to mock data if API call fails
        const mockSuggestions: LocationSuggestion[] = [
          { id: '1', displayName: 'Parramatta, NSW 2150', state: 'NSW', postcode: '2150', suburb: 'Parramatta' },
          { id: '2', displayName: 'Paramatta, NSW 2151', state: 'NSW', postcode: '2151', suburb: 'Paramatta' },
          { id: '3', displayName: 'North Parramatta, NSW 2151', state: 'NSW', postcode: '2151', suburb: 'North Parramatta' }
        ].filter(loc => 
          loc.suburb.toLowerCase().includes(query.toLowerCase()) || 
          loc.postcode.includes(query)
        );
        
        setLocationSuggestions(mockSuggestions);
      }
    } catch (err) {
      console.error('Error searching locations:', err);
      setError('Failed to search locations. Using fallback data.');
      
      // Fallback to mock data
      const mockSuggestions: LocationSuggestion[] = [
        { id: '1', displayName: 'Parramatta, NSW 2150', state: 'NSW', postcode: '2150', suburb: 'Parramatta' },
        { id: '2', displayName: 'Paramatta, NSW 2151', state: 'NSW', postcode: '2151', suburb: 'Paramatta' },
        { id: '3', displayName: 'North Parramatta, NSW 2151', state: 'NSW', postcode: '2151', suburb: 'North Parramatta' }
      ].filter(loc => 
        loc.suburb.toLowerCase().includes(query.toLowerCase()) || 
        loc.postcode.includes(query)
      );
      
      setLocationSuggestions(mockSuggestions);
    } finally {
      setIsLoading(false);
    }
  };

  // Search for properties
  const searchProperties = async (
    locationId: string,
    propertyType?: string,
    minPrice?: number,
    maxPrice?: number
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call the Domain API
      // For now, we'll use a mock implementation with error handling
      const response = await axios.get(
        `https://api.domain.com.au/v1/listings/residential/_search`,
        {
          headers: {
            'X-Api-Key': DOMAIN_API_KEY,
            'Content-Type': 'application/json'
          },
          data: {
            listingType: 'Sale',
            propertyTypes: propertyType ? [propertyType] : undefined,
            locations: [
              {
                state: 'NSW',
                region: '',
                area: '',
                suburb: 'Parramatta',
                postCode: '',
                includeSurroundingSuburbs: false
              }
            ],
            priceRange: {
              minimum: minPrice,
              maximum: maxPrice
            },
            pageSize: 20,
            sort: {
              sortKey: 'DateListed',
              direction: 'Descending'
            }
          }
        }
      ) ;

      if (response.status === 200) {
        setProperties(response.data);
      } else {
        // Fallback to mock data if API call fails
        const mockProperties: PropertyListing[] = [
          {
            id: '1',
            listingType: 'Sale',
            propertyType: 'House',
            price: 850000,
            address: '123 Smith Street',
            suburb: 'Parramatta',
            state: 'NSW',
            postcode: '2150',
            bedrooms: 3,
            bathrooms: 2,
            carSpaces: 1,
            landSize: 450,
            images: [
              'https://unsplash.com/photos/brown-wooden-house-near-green-trees-during-daytime-2gDwlIim3Uw',
              'https://unsplash.com/photos/person-standing-on-swimming-pool-Ub9LkIWxyec',
              'https://unsplash.com/photos/white-and-brown-wooden-house-near-green-trees-during-daytime-IYfp2Ixe9nM',
              'https://unsplash.com/photos/white-and-brown-living-room-set-JIUjvqe2ZHg'
            ],
            description: 'Beautiful family home in the heart of Parramatta...',
            agentName: 'John Smith',
            agentPhone: '0412 345 678',
            agentEmail: 'john.smith@realestate.com'
          },
          {
            id: '2',
            listingType: 'Sale',
            propertyType: 'Apartment',
            price: 650000,
            address: '45/67 George Street',
            suburb: 'Parramatta',
            state: 'NSW',
            postcode: '2150',
            bedrooms: 2,
            bathrooms: 2,
            carSpaces: 1,
            landSize: 0,
            images: [
              'https://unsplash.com/photos/brown-wooden-house-near-green-trees-during-daytime-2gDwlIim3Uw',
              'https://unsplash.com/photos/person-standing-on-swimming-pool-Ub9LkIWxyec',
              'https://unsplash.com/photos/white-and-brown-wooden-house-near-green-trees-during-daytime-IYfp2Ixe9nM',
              'https://unsplash.com/photos/white-and-brown-living-room-set-JIUjvqe2ZHg'
            ],
            description: 'Modern apartment with city views...',
            agentName: 'Sarah Johnson',
            agentPhone: '0412 345 679',
            agentEmail: 'sarah.johnson@realestate.com'
          }
        ];
        
        setProperties(mockProperties) ;
      }
    } catch (err) {
      console.error('Error searching properties:', err);
      setError('Failed to search properties. Using fallback data.');
      
      // Fallback to mock data
      const mockProperties: PropertyListing[] = [
        {
          id: '1',
          listingType: 'Sale',
          propertyType: 'House',
          price: 850000,
          address: '123 Smith Street',
          suburb: 'Parramatta',
          state: 'NSW',
          postcode: '2150',
          bedrooms: 3,
          bathrooms: 2,
          carSpaces: 1,
          landSize: 450,
          images: [
            'https://unsplash.com/photos/brown-wooden-house-near-green-trees-during-daytime-2gDwlIim3Uw',
            'https://unsplash.com/photos/person-standing-on-swimming-pool-Ub9LkIWxyec',
            'https://unsplash.com/photos/white-and-brown-wooden-house-near-green-trees-during-daytime-IYfp2Ixe9nM',
            'https://unsplash.com/photos/white-and-brown-living-room-set-JIUjvqe2ZHg'
          ],
          description: 'Beautiful family home in the heart of Parramatta...',
          agentName: 'John Smith',
          agentPhone: '0412 345 678',
          agentEmail: 'john.smith@realestate.com'
        },
        {
          id: '2',
          listingType: 'Sale',
          propertyType: 'Apartment',
          price: 650000,
          address: '45/67 George Street',
          suburb: 'Parramatta',
          state: 'NSW',
          postcode: '2150',
          bedrooms: 2,
          bathrooms: 2,
          carSpaces: 1,
          landSize: 0,
          images: [
            'https://unsplash.com/photos/brown-wooden-house-near-green-trees-during-daytime-2gDwlIim3Uw',
            'https://unsplash.com/photos/person-standing-on-swimming-pool-Ub9LkIWxyec',
            'https://unsplash.com/photos/white-and-brown-wooden-house-near-green-trees-during-daytime-IYfp2Ixe9nM',
            'https://unsplash.com/photos/white-and-brown-living-room-set-JIUjvqe2ZHg'
          ],
          description: 'Modern apartment with city views...',
          agentName: 'Sarah Johnson',
          agentPhone: '0412 345 679',
          agentEmail: 'sarah.johnson@realestate.com'
        }
      ];
      
      setProperties(mockProperties) ;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    locationSuggestions,
    properties,
    searchLocations,
    searchProperties
  };
};
