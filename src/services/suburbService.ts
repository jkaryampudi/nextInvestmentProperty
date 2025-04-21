// Interface for suburb data
export interface SuburbData {
  id: string;
  name: string;
  state: string;
  postcode: string;
  medianPrice: number;
  growthRate: number;
  medianRent: number;
  rentalYield: number;
  population: number;
  demographics: {
    medianAge: number;
    householdSize: number;
    ownerOccupied: number;
    renterOccupied: number;
  };
  amenities: {
    schools: number;
    parks: number;
    shops: number;
    transport: number;
    hospitals: number;
  };
  crimeRate: number;
  livabilityScore: number;
}

// Mock suburb data
const mockSuburbs: SuburbData[] = [
  {
    id: '1',
    name: 'Parramatta',
    state: 'NSW',
    postcode: '2150',
    medianPrice: 900000,
    growthRate: 6.5,
    medianRent: 650,
    rentalYield: 3.8,
    population: 25798,
    demographics: {
      medianAge: 32,
      householdSize: 2.6,
      ownerOccupied: 45,
      renterOccupied: 55
    },
    amenities: {
      schools: 12,
      parks: 8,
      shops: 15,
      transport: 10,
      hospitals: 2
    },
    crimeRate: 3.2,
    livabilityScore: 8.5
  },
  {
    id: '2',
    name: 'Blacktown',
    state: 'NSW',
    postcode: '2148',
    medianPrice: 750000,
    growthRate: 5.8,
    medianRent: 550,
    rentalYield: 3.9,
    population: 47176,
    demographics: {
      medianAge: 33,
      householdSize: 3.1,
      ownerOccupied: 60,
      renterOccupied: 40
    },
    amenities: {
      schools: 15,
      parks: 10,
      shops: 12,
      transport: 8,
      hospitals: 1
    },
    crimeRate: 3.5,
    livabilityScore: 7.8
  },
  {
    id: '3',
    name: 'Liverpool',
    state: 'NSW',
    postcode: '2170',
    medianPrice: 800000,
    growthRate: 6.2,
    medianRent: 580,
    rentalYield: 3.8,
    population: 27084,
    demographics: {
      medianAge: 32,
      householdSize: 3.0,
      ownerOccupied: 55,
      renterOccupied: 45
    },
    amenities: {
      schools: 14,
      parks: 9,
      shops: 14,
      transport: 9,
      hospitals: 2
    },
    crimeRate: 3.4,
    livabilityScore: 8.0
  }
];

// Suburb service
export const suburbService = {
  // Get suburb data
  getSuburbData: async (suburbName: string): Promise<SuburbData | null> => {
    // In a real app, this would call an API
    // For now, we'll use mock data
    const suburb = mockSuburbs.find(
      s => s.name.toLowerCase() === suburbName.toLowerCase()
    );
    
    return suburb || null;
  },
  
  // Get top growth suburbs
  getTopGrowthSuburbs: async (limit: number = 5): Promise<SuburbData[]> => {
    // In a real app, this would call an API
    // For now, we'll use mock data
    return [...mockSuburbs]
      .sort((a, b) => b.growthRate - a.growthRate)
      .slice(0, limit);
  },
  
  // Get top rental yield suburbs
  getTopRentalYieldSuburbs: async (limit: number = 5): Promise<SuburbData[]> => {
    // In a real app, this would call an API
    // For now, we'll use mock data
    return [...mockSuburbs]
      .sort((a, b) => b.rentalYield - a.rentalYield)
      .slice(0, limit);
  },
  
  // Get suburb price history
  getSuburbPriceHistory: async (suburbName: string): Promise<{ year: number; price: number }[]> => {
    // In a real app, this would call an API
    // For now, we'll use mock data
    const suburb = mockSuburbs.find(
      s => s.name.toLowerCase() === suburbName.toLowerCase()
    );
    
    if (!suburb) return [];
    
    const currentYear = new Date().getFullYear();
    const priceHistory = [];
    
    for (let i = 0; i < 10; i++) {
      const year = currentYear - i;
      const price = suburb.medianPrice * Math.pow(1 - suburb.growthRate / 100, i);
      
      priceHistory.push({
        year,
        price: Math.round(price)
      });
    }
    
    return priceHistory.reverse();
  }
};
