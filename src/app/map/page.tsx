'use client';

import { useState } from 'react';

export default function MapPage() {
  const [location, setLocation] = useState('New York, NY');

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 bg-white shadow">
        <h1 className="text-2xl font-bold mb-4">Map</h1>
        <div className="flex gap-2">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={() => {
              // In a real implementation, this would update the map
              console.log('Searching for:', location);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex-1">
        {/* This is a placeholder for a real map component */}
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">
            Map integration would go here (e.g., Google Maps, Mapbox)
          </p>
        </div>
      </div>
    </div>
  );
} 