import React, { useEffect, useState } from "react";
import { getPlaceImage } from "@/api/getPlaceImage";

function PlaceCardItem({ place }) {
  const name =
    place.PlaceName ||
    place.placeName ||
    place.name ||
    "Unknown Place";

  const details =
    place.PlaceDetails ||
    place.placeDetails ||
    place.details ||
    "";

  const rating = place.rating || place.Rating || "--";

  const coords =
    place.GeoCoordinates ||
    place.Geo_Coordinates ||
    place.geo_coordinates ||
    {};

  const lat = coords.latitude;
  const lng = coords.longitude;

  const mapsUrl = lat && lng
    ? `https://www.google.com/maps?q=${lat},${lng}`
    : `https://www.google.com/maps/search/${encodeURIComponent(name)}`;

  const [image, setImage] = useState(place.PlaceImageUrl || "");

  useEffect(() => {
    if (!image) fetchImage();
  }, []);

  const fetchImage = async () => {
    const img = await getPlaceImage(name + " tourist attraction");
    setImage(img);
  };

  return (
    <div className="rounded-3xl bg-white shadow-xl border border-gray-200 overflow-hidden">
      <img src={image} alt={name} className="w-full h-36 object-cover" />

      <div className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{details}</p>

        <div className="flex items-center gap-1 text-yellow-500 mt-2">
          ⭐ <span className="text-black">{rating}</span>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          className="mt-3 block bg-purple-600 text-white py-2 rounded-lg text-center"
        >
          Open in Maps
        </a>
      </div>
    </div>
  );
}

export default PlaceCardItem;
