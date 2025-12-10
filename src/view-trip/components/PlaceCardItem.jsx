import React from "react";

function PlaceCardItem({ place }) {
  const name =
    place?.PlaceName ||
    place?.placeName ||
    place?.["Place Name"] ||
    place?.["place name"] ||
    place?.name ||
    "Unknown Place";

  const image =
    place?.PlaceImageUrl ||
    place?.placeImageUrl ||
    place?.["Place Image Url"] ||
    place?.["place image url"] ||
    "/place-placeholder.jpg"; // static fallback

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

  const mapsUrl =
    lat && lng
      ? `https://www.google.com/maps?q=${lat},${lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          name
        )}`;

  return (
    <div className="rounded-3xl bg-white border shadow hover:shadow-lg transition p-4">
      <img
        src={image}
        className="rounded-xl w-full h-40 object-cover mb-3"
        alt={name}
      />

      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-gray-600 text-sm mt-1 line-clamp-3">{details}</p>

      <div className="mt-2 text-yellow-500 text-sm">
        ⭐ <span className="text-black">{rating}</span>
      </div>

      <a
        target="_blank"
        rel="noopener noreferrer"
        href={mapsUrl}
        className="mt-3 block bg-purple-600 text-white text-center rounded-lg py-2 hover:bg-purple-700 transition"
      >
        Open in Maps
      </a>
    </div>
  );
}

export default PlaceCardItem;
