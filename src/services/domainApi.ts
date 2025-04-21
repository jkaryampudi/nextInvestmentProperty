import axios from 'axios';

// Domain API key - in production, this should be an environment variable
const DOMAIN_API_KEY = 'key_6d45cdc2bc971feb0c88cbf661c107f6';

// Base URL for Domain API
const BASE_URL = 'https://api.domain.com.au/v1';

// Interface for location suggestion
export interface LocationSuggestion {
  id: string;
  displayName: string;
  state: string;
  postcode: string;
  suburb: string;
}

// Interface for property listing
export interface PropertyListing {
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

// Interface for property details
export interface PropertyDetails extends PropertyListing {
  title: string;
  highlights: string[];
  interiorFeatures: string[];
  exteriorFeatures: string[];
  utilities: string[];
  yearBuilt: number;
  buildingSize: number;
  zoning: string;
  councilRates: number;
  rentalYield: number;
  growthPotential: number;
  cashFlow: number;
  suburbMedianPrice: number;
  suburbGrowthRate: number;
  suburbMedianRent: number;
  suburbRentalYield: number;
  latitude: number;
  longitude: number;
}

// Domain API service
export const domainApi = {
  // Search for location suggestions
  searchLocations: async (query: string) : Promise<LocationSuggestion[]> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/locations/suggest?terms=${encodeURIComponent(query)}`,
        {
          headers: {
            'X-Api-Key': DOMAIN_API_KEY
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error searching locations:', error);
      
      // Fallback to mock data
      return [
        { id: '1', displayName: 'Parramatta, NSW 2150', state: 'NSW', postcode: '2150', suburb: 'Parramatta' },
        { id: '2', displayName: 'Paramatta, NSW 2151', state: 'NSW', postcode: '2151', suburb: 'Paramatta' },
        { id: '3', displayName: 'North Parramatta, NSW 2151', state: 'NSW', postcode: '2151', suburb: 'North Parramatta' }
      ].filter(loc => 
        loc.suburb.toLowerCase().includes(query.toLowerCase()) || 
        loc.postcode.includes(query)
      );
    }
  },
  
  // Search for properties
  searchProperties: async (
    locationId: string,
    propertyType?: string,
    minPrice?: number,
    maxPrice?: number
  ): Promise<PropertyListing[]> => {
    try {
      const response = await axios.post(
        `${BASE_URL}/listings/residential/_search`,
        {
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
        },
        {
          headers: {
            'X-Api-Key': DOMAIN_API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error searching properties:', error);
      
      // Fallback to mock data
      return [
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
    }
  },
  
  // Get property details
  getPropertyDetails: async (id: string) : Promise<PropertyDetails> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/listings/${id}`,
        {
          headers: {
            'X-Api-Key': DOMAIN_API_KEY
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error getting property details:', error);
      
      // Fallback to mock data
      return {
        id: '1',
        title: 'Beautiful Family Home in Parramatta',
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
        buildingSize: 220,
        yearBuilt: 2010,
        zoning: 'Residential',
        councilRates: 500,
        images: [
          'https://unsplash.com/photos/brown-wooden-house-near-green-trees-during-daytime-2gDwlIim3Uw',
          'https://unsplash.com/photos/person-standing-on-swimming-pool-Ub9LkIWxyec',
          'https://unsplash.com/photos/white-and-brown-wooden-house-near-green-trees-during-daytime-IYfp2Ixe9nM',
          'https://unsplash.com/photos/white-and-brown-living-room-set-JIUjvqe2ZHg'
        ],
        description: 'Beautiful family home in the heart of Parramatta with modern finishes and a spacious backyard. Close to schools, parks, and public transport.',
        highlights: [
          'Renovated kitchen with stone benchtops',
          'Open plan living and dining area',
          'Large backyard with covered entertaining area',
          'Close to schools, parks, and public transport'
        ],
        interiorFeatures: [
          'Ducted air conditioning',
          'Built-in wardrobes in all bedrooms',
          'Modern kitchen with stainless steel appliances',
          'Open plan living and dining area',
          'Separate study nook'
        ],
        exteriorFeatures: [
          'Double garage with internal access',
          'Covered entertaining area',
          'Low maintenance gardens',
          'Secure fencing',
          'Solar panels'
        ],
        utilities: [
          'Ducted air conditioning',
          'Gas heating',
          'Solar hot water',
          'NBN connected',
          'Solar panels'
        ],
        agentName: 'John Smith',
        agentPhone: '0412 345 678',
        agentEmail: 'john.smith@realestate.com',
        rentalYield: 4.2,
        growthPotential: 5.8,
        cashFlow: 50,
        suburbMedianPrice: 900000,
        suburbGrowthRate: 6.5,
        suburbMedianRent: 650,
        suburbRentalYield: 3.8,
        latitude: -33.8136,
        longitude: 151.0034
      };
    }
  }
};
