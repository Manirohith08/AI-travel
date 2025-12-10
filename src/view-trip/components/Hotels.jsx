import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  if (!trip) {
    return (
      <div className="my-6">
        <h2 className="font-semibold text-xl">Hotel Recommendations</h2>
        <p className="text-gray-500">Trip data not found.</p>
      </div>
    );
  }

  // Universal hotel extractor – supports all formats
  const hotels =
    trip?.Hotels ||
    trip?.Hotel ||
    trip?.hotels ||
    trip?.hotel ||
    trip?.hotelOptions ||
    trip?.hotelRecommendations ||
    trip?.tripData?.Hotels ||
    trip?.tripData?.Hotel ||
    trip?.tripData?.hotels ||
    trip?.tripData?.hotel ||
    trip?.tripData?.hotelOptions ||
    trip?.tripData?.hotelRecommendations ||
    [];

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
