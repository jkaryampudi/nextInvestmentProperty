"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';

interface RiskItem {
  type: string;
  level: 'Low' | 'Medium' | 'High';
  score: number;
  description: string;
  recommendation: string;
}

interface PropertyRiskAssessmentProps {
  propertyId: string;
  propertyType: string;
  suburb: string;
}

const PropertyRiskAssessment = ({ 
  propertyId, 
  propertyType = 'House',
  suburb = 'Parramatta'
}: PropertyRiskAssessmentProps) => {
  // Mock risk data - in a real app, this would come from an API
  const riskData: RiskItem[] = [
    {
      type: 'Flood',
      level: 'Low',
      score: 15,
      description: 'This property is located in an area with minimal flood risk. Historical data shows no significant flooding events in the past 50 years.',
      recommendation: 'Standard home insurance should provide adequate coverage for the minimal flood risk in this area.'
    },
    {
      type: 'Bushfire',
      level: 'Low',
      score: 10,
      description: 'This property is located in an urban area with minimal bushfire risk. The property is not near bushland or high-risk vegetation zones.',
      recommendation: 'No specific bushfire mitigation measures are required for this property.'
    },
    {
      type: 'Crime',
      level: 'Medium',
      score: 45,
      description: 'This suburb has a moderate crime rate compared to the state average. Property crimes such as theft are more common than violent crimes.',
      recommendation: 'Consider installing security systems, including cameras and alarm systems. Ensure all entry points have secure locks.'
    },
    {
      type: 'Noise',
      level: 'Medium',
      score: 50,
      description: 'The property is located near main roads and commercial areas, resulting in moderate noise levels, particularly during business hours.',
      recommendation: 'Consider noise-reducing windows or landscaping if noise is a concern for potential tenants.'
    },
    {
      type: 'Landslide',
      level: 'Low',
      score: 5,
      description: 'The property is on flat terrain with stable soil conditions. There is minimal risk of land movement or subsidence.',
      recommendation: 'No specific landslide mitigation measures are required for this property.'
    },
    {
      type: 'Coastal Erosion',
      level: 'Low',
      score: 0,
      description: 'This property is not located in a coastal area and has no risk of coastal erosion or sea level rise impacts.',
      recommendation: 'No coastal erosion mitigation measures are required for this property.'
    }
  ];
  
  // Calculate overall risk score
  const overallRiskScore = Math.round(
    riskData.reduce((sum, risk) => sum + risk.score, 0) / riskData.length
  );
  
  // Determine overall risk level
  let overallRiskLevel = 'Low';
  let overallRiskColor = 'green';
  
  if (overallRiskScore > 60) {
    overallRiskLevel = 'High';
    overallRiskColor = 'red';
  } else if (overallRiskScore > 30) {
    overallRiskLevel = 'Medium';
    overallRiskColor = 'orange';
  }
  
  // Get color based on risk level
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'green';
      case 'Medium': return 'orange';
      case 'High': return 'red';
      default: return 'gray';
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Risk Assessment</h2>
      
      {/* Overall Risk Summary */}
      <Card className="p-6 mb-6 border-2 border-blue-300 shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Overall Risk Profile</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Risk Level</h4>
            <div className={`text-2xl font-bold text-${overallRiskColor}-600`}>
              {overallRiskLevel}
            </div>
          </div>
          
          <div className="text-center">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Risk Score</h4>
            <div className="text-2xl font-bold text-blue-600">
              {overallRiskScore}/100
            </div>
          </div>
          
          <div className="text-center">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Property Type</h4>
            <div className="text-2xl font-bold text-gray-900">
              {propertyType}
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-lg font-medium text-gray-700 mb-2">Risk Summary</h4>
          <p className="text-gray-600">
            This property in {suburb} has an overall {overallRiskLevel.toLowerCase()} risk profile. 
            The most significant risks are related to {riskData.filter(risk => risk.level !== 'Low').map(risk => risk.type.toLowerCase()).join(' and ')}.
            Other risk factors are minimal and can be managed with standard precautions.
          </p>
        </div>
      </Card>
      
      {/* Detailed Risk Assessment */}
      <div className="space-y-6">
        {riskData.map((risk, index) => (
          <Card key={index} className={`p-6 border-l-4 border-${getRiskColor(risk.level)}-500`}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{risk.type} Risk</h3>
              
              <div className="flex items-center mt-2 md:mt-0">
                <div className={`px-3 py-1 rounded-full text-white bg-${getRiskColor(risk.level)}-500 font-medium`}>
                  {risk.level} Risk
                </div>
                <div className="ml-4 font-medium">{risk.score}/100</div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`bg-${getRiskColor(risk.level)}-500 h-2.5 rounded-full`} 
                  style={{ width: `${risk.score}%` }}
                ></div>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{risk.description}</p>
            
            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Recommendation</h4>
              <p className="text-blue-700">{risk.recommendation}</p>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Risk Disclaimer */}
      <div className="mt-8 text-sm text-gray-500">
        <p>
          This risk assessment is based on available data and is provided for informational purposes only. 
          It should not be considered as professional advice or a substitute for a detailed inspection. 
          We recommend conducting a professional property inspection and consulting with relevant experts 
          before making investment decisions.
        </p>
      </div>
    </div>
  );
};

export default PropertyRiskAssessment;
