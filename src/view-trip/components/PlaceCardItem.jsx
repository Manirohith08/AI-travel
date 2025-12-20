import React from "react";

function PlaceCardItem({ place }) {
  const name =
    place?.PlaceName ||
    place?.placeName ||
    place?.["Place Name"] ||
    place?.["place name"] ||
    place?.name ||
    "Unknown Place";

  // 1. GET RAW IMAGE URL
  let imageSrc =
    place?.PlaceImageUrl ||
    place?.placeImageUrl ||
    place?.["Place Image Url"] ||
    place?.["place image url"] ||
    "";

  // 2. FIX IMAGE LOGIC
  // The API often returns "example.com" or broken "source.unsplash.com" links.
  // We force a placeholder if the URL looks fake or broken.
  if (
    !imageSrc ||
    imageSrc.includes("example.com") ||
    imageSrc.includes("source.unsplash.com")
  ) {
    // Use a specific valid image or your local placeholder
    imageSrc = "/placeholder.jpg"; 
    // OR use this generic travel image if you don't have a local file:
    // imageSrc = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop";
  }

  const details =
    place?.PlaceDetails ||
    place?.placeDetails ||
    place?.["Place Details"] ||
    place?.details ||
    "";

  const rating =
    place?.rating ||
    place?.Rating ||
    "--";

  const coords =
    place?.GeoCoordinates ||
    place?.geoCoordinates ||
    place?.["Geo Coordinates"] ||
    place?.["geo coordinates"] ||
    {};

  const lat = coords.latitude;
  const lng = coords.longitude;

  // 3. FIX MAPS URL
  // Use the standard Google Maps Search API
  const mapsUrl =
    lat && lng
      ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;

  return (
    <div className="rounded-3xl bg-white border shadow hover:shadow-lg transition p-4 flex flex-col h-full">
      <img
        src={imageSrc}
        className="rounded-xl w-full h-40 object-cover mb-3"
        alt={name}
        // Fallback if the image fails to load
        onError={(e) => {
          e.target.src = "/placeholder.jpg";
          e.target.onerror = null;
        }}
      />

      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-gray-600 text-sm mt-1 line-clamp-3">{details}</p>

      <div className="mt-2 text-yellow-500 text-sm">
        ⭐ <span className="text-black">{rating}</span>
      </div>

      <div className="mt-auto"> {/* Pushes button to bottom */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={mapsUrl}
          className="mt-3 block bg-purple-600 text-white text-center rounded-lg py-2 hover:bg-purple-700 transition"
        >
          Open in Maps
        </a>
      </div>
    </div>
  );
}

export default PlaceCardItem;
