"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/Card';

// This component handles the interactive 3D map visualization
const InteractiveAmenitiesMap = ({ 
  suburb = "Parramatta", 
  propertyLat = -33.8136, 
  propertyLng = 151.0034 
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [is3DMode, setIs3DMode] = useState(true);
  const [showDensity, setShowDensity] = useState(false);
  const [amenitiesCount, setAmenitiesCount] = useState(21);
  const [mapError, setMapError] = useState(null);
  
  // Initialize map when component mounts
  useEffect(() => {
    // Client-side only code - prevents hydration issues
    if (typeof window === 'undefined') return;
    
    async function initializeMap() {
      try {
        // Dynamically import mapboxgl to avoid SSR issues
        const mapboxgl = (await import('mapbox-gl')).default;
        
        // Check if map is already initialized
        if (map.current) return;
        
        // Set mapbox token - in production this should be an environment variable
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
        
        // Create new map instance
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: isNightMode ? 'mapbox://styles/mapbox/navigation-night-v1' : 'mapbox://styles/mapbox/streets-v12',
          center: [propertyLng, propertyLat],
          zoom: 14,
          pitch: is3DMode ? 45 : 0,
          bearing: 0,
          antialias: true
        });
        
        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl());
        
        // Add property marker
        new mapboxgl.Marker({ color: '#FF0000' })
          .setLngLat([propertyLng, propertyLat])
          .addTo(map.current);
        
        // Wait for map to load
        map.current.on('load', () => {
          setMapLoaded(true);
          
          // Add 3D building layer if in 3D mode
          if (is3DMode) {
            add3DBuildings();
          }
          
          // Add amenities
          addAmenities();
          
          // Add density heatmap if enabled
          if (showDensity) {
            addDensityHeatmap();
          }
        });
      } catch (error) {
        console.error("Error initializing map:", error);
        setMapError("Failed to initialize map. Please try again later.");
      }
    }
    
    // Add 3D buildings to the map
    function add3DBuildings() {
      if (!map.current || !mapLoaded) return;
      
      // Check if the style is loaded
      if (!map.current.getStyle()) return;
      
      // Add 3D building layer if it doesn't exist
      if (!map.current.getLayer('3d-buildings')) {
        map.current.addLayer({
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 12,
          'paint': {
            'fill-extrusion-color': isNightMode ? '#aaa' : '#ccc',
            'fill-extrusion-height': [
              'interpolate', ['linear'], ['zoom'],
              15, 0,
              16, ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate', ['linear'], ['zoom'],
              15, 0,
              16, ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.7
          }
        });
      }
    }
    
    // Add amenities to the map
    function addAmenities() {
      if (!map.current || !mapLoaded) return;
      
      // Mock amenity data - in a real app, this would come from an API
      const amenities = [
        { type: 'school', name: 'Parramatta Public School', lat: -33.8156, lng: 151.0054, rating: 4.2 },
        { type: 'school', name: 'Arthur Phillip High School', lat: -33.8176, lng: 151.0074, rating: 3.8 },
        { type: 'park', name: 'Parramatta Park', lat: -33.8106, lng: 151.0014, rating: 4.7 },
        { type: 'shopping', name: 'Westfield Parramatta', lat: -33.8166, lng: 151.0084, rating: 4.5 },
        { type: 'transport', name: 'Parramatta Station', lat: -33.8186, lng: 151.0054, rating: 4.0 },
        { type: 'restaurant', name: 'Temasek Restaurant', lat: -33.8146, lng: 151.0064, rating: 4.3 },
        { type: 'hospital', name: 'Westmead Hospital', lat: -33.8066, lng: 150.9894, rating: 4.1 }
      ];
      
      // Add amenity markers
      amenities.forEach(amenity => {
        // Create color based on amenity type
        let color;
        switch (amenity.type) {
          case 'school': color = '#4285F4'; break;
          case 'park': color = '#34A853'; break;
          case 'shopping': color = '#FBBC05'; break;
          case 'transport': color = '#EA4335'; break;
          case 'restaurant': color = '#8E44AD'; break;
          case 'hospital': color = '#E74C3C'; break;
          default: color = '#7F8C8D';
        }
        
        // Create popup with amenity information
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<strong>${amenity.name}</strong><br>
           Type: ${amenity.type.charAt(0).toUpperCase() + amenity.type.slice(1)}<br>
           Rating: ${amenity.rating}/5<br>
           Distance: ${calculateDistance(propertyLat, propertyLng, amenity.lat, amenity.lng).toFixed(1)} km`
        );
        
        // Add marker with popup
        new mapboxgl.Marker({ color })
          .setLngLat([amenity.lng, amenity.lat])
          .setPopup(popup)
          .addTo(map.current);
      });
      
      setAmenitiesCount(amenities.length);
    }
    
    // Add density heatmap to the map
    function addDensityHeatmap() {
      if (!map.current || !mapLoaded) return;
      
      // Check if heatmap already exists
      if (map.current.getSource('amenities-heat')) {
        map.current.setLayoutProperty('amenities-heat', 'visibility', 'visible');
        return;
      }
      
      // Mock heatmap data - in a real app, this would come from an API
      const points = [];
      // Generate random points around the property
      for (let i = 0; i < 500; i++) {
        const lng = propertyLng + (Math.random() - 0.5) * 0.02;
        const lat = propertyLat + (Math.random() - 0.5) * 0.02;
        points.push([lng, lat]);
      }
      
      // Add heatmap source and layer
      map.current.addSource('amenities-heat', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': points.map(point => ({
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'Point',
              'coordinates': point
            }
          }))
        }
      });
      
      map.current.addLayer({
        'id': 'amenities-heat',
        'type': 'heatmap',
        'source': 'amenities-heat',
        'paint': {
          'heatmap-weight': 1,
          'heatmap-intensity': 1,
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(0, 0, 255, 0)',
            0.2, 'rgba(0, 255, 255, 0.5)',
            0.4, 'rgba(0, 255, 0, 0.5)',
            0.6, 'rgba(255, 255, 0, 0.5)',
            0.8, 'rgba(255, 0, 0, 0.5)'
          ],
          'heatmap-radius': 20,
          'heatmap-opacity': 0.7
        }
      });
    }
    
    // Calculate distance between two points in km
    function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      const d = R * c; // Distance in km
      return d;
    }
    
    function deg2rad(deg) {
      return deg * (Math.PI/180);
    }
    
    // Initialize map
    initializeMap();
    
    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [propertyLat, propertyLng, isNightMode, is3DMode, showDensity, mapLoaded]);
  
  // Update map when mode changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    // Update map style based on night mode
    map.current.setStyle(isNightMode ? 'mapbox://styles/mapbox/navigation-night-v1' : 'mapbox://styles/mapbox/streets-v12');
    
    // Wait for style to load before adding layers
    map.current.once('style.load', () => {
      // Re-add 3D buildings if in 3D mode
      if (is3DMode) {
        add3DBuildings();
      }
      
      // Re-add amenities
      addAmenities();
      
      // Re-add density heatmap if enabled
      if (showDensity) {
        addDensityHeatmap();
      }
    });
  }, [isNightMode]);
  
  // Update map pitch when 3D mode changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    // Update map pitch
    map.current.easeTo({
      pitch: is3DMode ? 45 : 0,
      duration: 1000
    });
    
    // Add or remove 3D buildings
    if (is3DMode) {
      add3DBuildings();
    } else if (map.current.getLayer('3d-buildings')) {
      map.current.removeLayer('3d-buildings');
    }
  }, [is3DMode]);
  
  // Update density heatmap when showDensity changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    if (showDensity) {
      addDensityHeatmap();
    } else if (map.current.getLayer('amenities-heat')) {
      map.current.setLayoutProperty('amenities-heat', 'visibility', 'none');
    }
  }, [showDensity]);
  
  // Helper functions defined inside the component
  function add3DBuildings() {
    if (!map.current || !mapLoaded) return;
    
    // Check if the style is loaded
    if (!map.current.getStyle()) return;
    
    // Add 3D building layer if it doesn't exist
    if (!map.current.getLayer('3d-buildings')) {
      map.current.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 12,
        'paint': {
          'fill-extrusion-color': isNightMode ? '#aaa' : '#ccc',
          'fill-extrusion-height': [
            'interpolate', ['linear'], ['zoom'],
            15, 0,
            16, ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate', ['linear'], ['zoom'],
            15, 0,
            16, ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.7
        }
      });
    }
  }
  
  function addAmenities() {
    // Implementation would be here - duplicated from the useEffect
  }
  
  function addDensityHeatmap() {
    // Implementation would be here - duplicated from the useEffect
  }
  
  // Render fallback content if map fails to load
  if (mapError) {
    return (
      <Card className="p-6 bg-red-50 border-2 border-red-300">
        <h2 className="text-xl font-bold text-red-700 mb-2">Map Error</h2>
        <p className="text-red-600 mb-4">{mapError}</p>
        <p className="text-gray-700">
          We're unable to load the interactive map at this time. Please try again later or contact support if the issue persists.
        </p>
      </Card>
    );
  }
  
  return (
    <Card className="p-6 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Interactive Amenities Map - {suburb}</h2>
      
      {/* Map Controls */}
      <div className="flex flex-wrap gap-4 mb-4 justify-end">
        <button
          className={`px-4 py-2 rounded-md flex items-center ${
            isNightMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
          }`}
          onClick={() => setIsNightMode(!isNightMode)}
        >
          {isNightMode ? '🌙 Night' : '☀️ Day'}
        </button>
        
        <button
          className={`px-4 py-2 rounded-md ${
            is3DMode ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white'
          }`}
          onClick={() => setIs3DMode(!is3DMode)}
        >
          {is3DMode ? '3D View' : '2D View'}
        </button>
        
        <button
          className={`px-4 py-2 rounded-md ${
            showDensity ? 'bg-red-600 text-white' : 'bg-red-500 text-white'
          }`}
          onClick={() => setShowDensity(!showDensity)}
        >
          {showDensity ? '🔥 Show Density' : '🔥 Show Density'}
        </button>
      </div>
      
      {/* Map Container */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {/* This is where the map will be rendered */}
        <div ref={mapContainer} className="h-96 w-full" />
      </div>
      
      {/* Amenities Filter */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-lg">Filter Amenities</div>
        <div className="text-lg">{amenitiesCount} amenities in view</div>
      </div>
    </Card>
  );
};

export default InteractiveAmenitiesMap;
