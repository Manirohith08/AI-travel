import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function TripPlace({ trip }) {
  const itinerary =
    trip?.itinerary ||
    trip?.Itinerary ||
    trip?.tripData?.itinerary ||
    trip?.tripData?.Itinerary ||
    [];

  if (!itinerary.length) {
    return (
      <div className="my-6">
        <h2 className="text-xl font-semibold">Places to Visit</h2>
        <p className="text-gray-500">No places added to the itinerary.</p>
      </div>
    );
  }

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4">Places to Visit</h2>

      {itinerary.map((day, i) => {
        const places =
          day?.plan ||
          day?.Plan ||
          day?.activities ||
          day?.Activities ||
          [];

        return (
          <div key={i} className="mb-6">
            <h3 className="text-lg font-bold mb-3">
              {day?.day || `Day ${i + 1}`}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
              {places.map((p, idx) => (
                <PlaceCardItem key={idx} place={p} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TripPlace;
