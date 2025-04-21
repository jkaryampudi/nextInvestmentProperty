"use client";

import React from 'react';
import { mockPropertiesDetailed } from '@/lib/mockData';
import PropertyDetail from '@/components/property/PropertyDetail';

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const { id } = params;
  
  // Find the property with the matching ID
  const property = mockPropertiesDetailed.find(p => p.id === id) || mockPropertiesDetailed[0];
  
  return (
    <div>
      <PropertyDetail />
    </div>
  );
}
