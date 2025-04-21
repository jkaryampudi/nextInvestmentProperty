"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useDomainApi from '@/hooks/useDomainApi';

const SearchComponent = () => {
  const router = useRouter();
  const { searchLocations } = useDomainApi();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const handleSearch = async () => {
    // In a real app, this would navigate to search results with query parameters
    router.push(`/properties?q=${searchQuery}&type=${propertyType}&price=${priceRange}`);
  };
  
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 2) {
      try {
        const locations = await searchLocations(value);
        setSuggestions(locations);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(`${suggestion.name}, ${suggestion.state} ${suggestion.postcode}`);
    setShowSuggestions(false);
  };
  
  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by suburb, postcode or address"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-900"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}, {suggestion.state} {suggestion.postcode}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <select
          className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">Property Type</option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Land">Land</option>
        </select>
        
        <select
          className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="">Price Range</option>
          <option value="0-500000">$0 - $500,000</option>
          <option value="500000-750000">$500,000 - $750,000</option>
          <option value="750000-1000000">$750,000 - $1,000,000</option>
          <option value="1000000-1500000">$1,000,000 - $1,500,000</option>
          <option value="1500000+">$1,500,000+</option>
        </select>
        
        <button
          className="px-6 py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchComponent;
