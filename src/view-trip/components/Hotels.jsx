import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  // 1. DEBUG: Check what 'trip' actually looks like in the console
  console.log("Trip Object received:", trip);

  if (!trip) {
    return (
      <div className="my-6">
        <h2 className="font-semibold text-xl">Hotel Recommendations</h2>
        <p className="text-gray-500">Trip data not found.</p>
      </div>
    );
  }

  // 2. UNIVERSAL EXTRACTOR
  // The data is usually inside 'trip.tripData', not just 'trip'
  const hotels =
    // Check inside tripData (Most common DB structure)
    trip?.tripData?.travelPlan?.hotelsOptions || 
    trip?.tripData?.hotels ||
    trip?.tripData?.Hotels ||
    
    // Check directly (If trip IS the data object)
    trip?.travelPlan?.hotelsOptions ||
    trip?.hotels ||
    trip?.Hotels ||
    
    // Fallback for flat structures
    trip?.hotelOptions ||
    [];

  console.log("FINAL HOTELS LIST:", hotels);

  if (!Array.isArray(hotels) || hotels.length === 0) {
    return (
      <div className="my-6">
        <h2 className="font-semibold text-xl">Hotel Recommendations</h2>
        <p className="text-gray-500">No hotel recommendations found.</p>
      </div>
    );
  }

  return (
    <div className="my-6">
      <h2 className="font-semibold text-xl mb-4">Hotel Recommendations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel, index) => (
          <HotelCardItem key={index} item={hotel} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
