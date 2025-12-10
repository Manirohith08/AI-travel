// Hotels.jsx
import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  // Accept all possible keys from AI or Firestore
  const hotels =
    trip?.hotelOptions ||
    trip?.HotelOptions ||
    trip?.tripData?.hotelOptions ||
    trip?.tripData?.HotelOptions ||
    [];

  if (!hotels.length) {
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
