"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';

interface InvestmentAnalysisProps {
  property: any;
}

const InvestmentAnalysis = ({ property }: InvestmentAnalysisProps)  => {
  // Calculate mortgage repayments
  const calculateMortgage = (price: number, deposit: number, rate: number, years: number) => {
    const principal = price - deposit;
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;
    
    const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return Math.round(monthlyPayment);
  };
  
  // Example mortgage calculation
  const mortgageMonthly = calculateMortgage(property.price, property.price * 0.2, 5.5, 30);
  const mortgageWeekly = Math.round(mortgageMonthly * 12 / 52);
  
  // Example rental income
  const weeklyRent = Math.round(property.price * property.rentalYield / 100 / 52);
  
  // Example expenses
  const annualExpenses = {
    councilRates: property.councilRates * 4, // quarterly to annual
    waterRates: 800,
    insurance: 1200,
    managementFees: weeklyRent * 52 * 0.07, // 7% of rental income
    maintenance: property.price * 0.01, // 1% of property value
    landTax: property.landSize > 0 ? property.landSize * 2.5 : 0 // Example calculation
  };
  
  const totalAnnualExpenses = Object.values(annualExpenses).reduce((a, b) => a + b, 0);
  const weeklyExpenses = Math.round(totalAnnualExpenses / 52);
  
  // Cash flow calculation
  const weeklyCashFlow = weeklyRent - mortgageWeekly - weeklyExpenses;
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Investment Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 border-2 border-blue-300 shadow-md">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Financial Summary</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-700">Purchase Price:</span>
              <span className="font-medium text-gray-900">${property.price.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-700">Estimated Weekly Rent:</span>
              <span className="font-medium text-green-600">${weeklyRent}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-700">Gross Rental Yield:</span>
              <span className="font-medium text-green-600">{property.rentalYield}%</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-700">Weekly Mortgage (80% LVR):</span>
              <span className="font-medium text-red-600">${mortgageWeekly}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-700">Weekly Expenses:</span>
              <span className="font-medium text-red-600">${weeklyExpenses}</span>
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-800 font-medium">Weekly Cash Flow:</span>
              <span className={`font-bold ${weeklyCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${weeklyCashFlow}
              </span>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-2 border-purple-300 shadow-md">
          <h3 className="text-xl font-semibold text-purple-800 mb-4">Growth Projections</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-700">Annual Growth Rate:</span>
              <span className="font-medium text-purple-600">{property.growthPotential}%</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-700">5-Year Projected Value:</span>
              <span className="font-medium text-gray-900">
                ${Math.round(property.price * Math.pow(1 + property.growthPotential / 100, 5)).toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-700">10-Year Projected Value:</span>
              <span className="font-medium text-gray-900">
                ${Math.round(property.price * Math.pow(1 + property.growthPotential / 100, 10)).toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-700">Suburb Median Price:</span>
              <span className="font-medium text-gray-900">${property.suburbMedianPrice.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-700">Suburb Growth Rate:</span>
              <span className="font-medium text-purple-600">{property.suburbGrowthRate}%</span>
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-800 font-medium">Price vs. Suburb Median:</span>
              <span className={`font-bold ${property.price < property.suburbMedianPrice ? 'text-green-600' : 'text-gray-900'}`}>
                {Math.round(property.price / property.suburbMedianPrice * 100)}%
              </span>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="mb-8">
        <Card className="p-6 border-2 border-green-300 shadow-md">
          <h3 className="text-xl font-semibold text-green-800 mb-4">Annual Expenses Breakdown</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(annualExpenses).map(([key, value]) => (
              <div key={key} className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h4 className="font-medium text-green-800 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
                <div className="text-xl font-bold text-green-600">${Math.round(value).toLocaleString()}</div>
                <div className="text-xs text-gray-500">per year</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-green-200 flex justify-between items-center">
            <span className="text-lg font-medium text-green-800">Total Annual Expenses:</span>
            <span className="text-2xl font-bold text-green-700">${Math.round(totalAnnualExpenses).toLocaleString()}</span>
          </div>
        </Card>
      </div>
      
      <div className="mb-8">
        <Card className="p-6 border-2 border-blue-300 shadow-md">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Mortgage Calculator</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Loan Details</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700">Purchase Price:</span>
                  <span className="font-medium text-gray-900">${property.price.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700">Deposit (20%):</span>
                  <span className="font-medium text-gray-900">${(property.price * 0.2).toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700">Loan Amount:</span>
                  <span className="font-medium text-gray-900">${(property.price * 0.8).toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700">Interest Rate:</span>
                  <span className="font-medium text-gray-900">5.5%</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700">Loan Term:</span>
                  <span className="font-medium text-gray-900">30 years</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Repayment Summary</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700">Monthly Repayment:</span>
                  <span className="font-medium text-blue-600">${mortgageMonthly}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700">Weekly Repayment:</span>
                  <span className="font-medium text-blue-600">${mortgageWeekly}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700">Total Repayments:</span>
                  <span className="font-medium text-gray-900">${(mortgageMonthly * 12 * 30).toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700">Total Interest Paid:</span>
                  <span className="font-medium text-gray-900">
                    ${(mortgageMonthly * 12 * 30 - property.price * 0.8).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="mb-8">
        <Card className="p-6 border-2 border-yellow-300 shadow-md">
          <h3 className="text-xl font-semibold text-yellow-800 mb-4">Risk Assessment</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Market Risks</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                  <span className="text-gray-700">
                    <span className="font-medium">Interest Rate Risk:</span> A 1% increase in interest rates would increase monthly repayments by approximately ${Math.round((property.price * 0.8)  * 0.01 / 12)}.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                  <span className="text-gray-700">
                    <span className="font-medium">Vacancy Risk:</span> Each week of vacancy costs approximately ${weeklyRent} in lost rental income.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                  <span className="text-gray-700">
                    <span className="font-medium">Market Downturn Risk:</span> A 10% decrease in property value would reduce equity by ${(property.price * 0.1) .toLocaleString()}.
                  </span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Risk Mitigation Strategies</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">
                    <span className="font-medium">Fixed Rate Mortgage:</span> Consider fixing a portion of the loan to protect against interest rate rises.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">
                    <span className="font-medium">Landlord Insurance:</span> Comprehensive coverage for property damage and rental income protection.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">
                    <span className="font-medium">Cash Buffer:</span> Maintain a cash reserve of at least 3 months' mortgage payments (${mortgageMonthly * 3}) .
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InvestmentAnalysis;
