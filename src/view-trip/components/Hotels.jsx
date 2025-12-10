// Hotels.jsx

import React from 'react';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
  if (!trip) {
    return (
      <div className="my-6">
        <h2 className="font-semibold text-xl">Hotel Recommendations</h2>
        <p className="text-gray-500">No hotel data available.</p>
      </div>
    );
  }

  // ⭐ Normalize hotel array (supports all possible keys)
  const hotels =
    trip.hotelOptions ||
    trip.HotelOptions ||
    trip.hotels ||
    trip.hotels_options ||
    trip.tripData?.hotelOptions ||
    trip.tripData?.HotelOptions ||
    trip.tripData?.hotels ||
    trip.tripData?.hotels_options ||
    [];

  if (hotels.length === 0) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map((hotel, index) => (
          <HotelCardItem key={index} item={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
