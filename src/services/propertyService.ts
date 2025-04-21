import { domainApi, PropertyListing, PropertyDetails } from './domainApi';
import { mockPropertiesDetailed } from '@/lib/mockData';

// Property service
export const propertyService = {
  // Search for properties
  searchProperties: async (
    locationId: string,
    propertyType?: string,
    minPrice?: number,
    maxPrice?: number
  ) : Promise<PropertyListing[]> => {
    try {
      // Try to get data from Domain API
      const properties = await domainApi.searchProperties(
        locationId,
        propertyType,
        minPrice,
        maxPrice
      );
      
      return properties;
    } catch (error) {
      console.error('Error searching properties:', error);
      
      // Fallback to mock data
      return mockPropertiesDetailed.map(p => ({
        id: p.id.toString(),
        listingType: 'Sale',
        propertyType: p.propertyType,
        price: p.price,
        address: p.address,
        suburb: p.suburb,
        state: p.state,
        postcode: p.postcode,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        carSpaces: p.carSpaces,
        landSize: p.landSize,
        images: p.images,
        description: p.description,
        agentName: 'John Smith',
        agentPhone: '0412 345 678',
        agentEmail: 'john.smith@realestate.com'
      }));
    }
  },
  
  // Get property details
  getPropertyDetails: async (id: string): Promise<PropertyDetails> => {
    try {
      // Try to get data from Domain API
      const property = await domainApi.getPropertyDetails(id);
      
      return property;
    } catch (error) {
      console.error('Error getting property details:', error);
      
      // Fallback to mock data
      const mockProperty = mockPropertiesDetailed.find(p => p.id.toString() === id) || mockPropertiesDetailed[0];
      
      return {
        id: mockProperty.id.toString(),
        title: mockProperty.title,
        listingType: 'Sale',
        propertyType: mockProperty.propertyType,
        price: mockProperty.price,
        address: mockProperty.address,
        suburb: mockProperty.suburb,
        state: mockProperty.state,
        postcode: mockProperty.postcode,
        bedrooms: mockProperty.bedrooms,
        bathrooms: mockProperty.bathrooms,
        carSpaces: mockProperty.carSpaces,
        landSize: mockProperty.landSize,
        buildingSize: mockProperty.buildingSize,
        yearBuilt: mockProperty.yearBuilt,
        zoning: mockProperty.zoning,
        councilRates: mockProperty.councilRates,
        images: mockProperty.images,
        description: mockProperty.description,
        highlights: mockProperty.highlights,
        interiorFeatures: mockProperty.interiorFeatures,
        exteriorFeatures: mockProperty.exteriorFeatures,
        utilities: mockProperty.utilities,
        agentName: 'John Smith',
        agentPhone: '0412 345 678',
        agentEmail: 'john.smith@realestate.com',
        rentalYield: mockProperty.rentalYield,
        growthPotential: mockProperty.growthPotential,
        cashFlow: mockProperty.cashFlow,
        suburbMedianPrice: mockProperty.suburbMedianPrice,
        suburbGrowthRate: mockProperty.suburbGrowthRate,
        suburbMedianRent: mockProperty.suburbMedianRent,
        suburbRentalYield: mockProperty.suburbRentalYield,
        latitude: mockProperty.latitude,
        longitude: mockProperty.longitude
      };
    }
  },
  
  // Get featured properties
  getFeaturedProperties: async (): Promise<PropertyListing[]> => {
    try {
      // In a real app, this would call a specific API endpoint
      // For now, we'll use the search function with default parameters
      const properties = await domainApi.searchProperties('1');
      
      return properties;
    } catch (error) {
      console.error('Error getting featured properties:', error);
      
      // Fallback to mock data
      return mockPropertiesDetailed.slice(0, 6).map(p => ({
        id: p.id.toString(),
        listingType: 'Sale',
        propertyType: p.propertyType,
        price: p.price,
        address: p.address,
        suburb: p.suburb,
        state: p.state,
        postcode: p.postcode,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        carSpaces: p.carSpaces,
        landSize: p.landSize,
        images: p.images,
        description: p.description,
        agentName: 'John Smith',
        agentPhone: '0412 345 678',
        agentEmail: 'john.smith@realestate.com'
      }));
    }
  }
};
