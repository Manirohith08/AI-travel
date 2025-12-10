import React, { useEffect, useState } from "react";
import { getPlaceImage } from "@/api/getPlaceImage";

function PlaceCardItem({ place }) {
  const name =
    place?.PlaceName ||
    place?.placeName ||
    place?.name ||
    "Unknown Place";

  const details =
    place?.PlaceDetails ||
    place?.placeDetails ||
    place?.details ||
    "";

  const rating = place?.Rating || place?.rating || "--";

  const coords =
    place?.GeoCoordinates ||
    place?.Geo_Coordinates ||
    place?.geo_coordinates ||
    {};

  const lat = coords.latitude;
  const lng = coords.longitude;

  const mapsUrl = lat && lng
    ? `https://www.google.com/maps?q=${lat},${lng}`
    : `https://www.google.com/maps/search/${encodeURIComponent(name)}`;

  const [image, setImage] = useState(place?.PlaceImageUrl || "");

  useEffect(() => {
    if (!place?.PlaceImageUrl) {
      fetchImage();
    }
  }, [place]);

  const fetchImage = async () => {
    try {
      const img = await getPlaceImage(name + " tourist attraction");
      setImage(img);
    } catch {
      setImage("/road-trip-vacation.jpg");
    }
  };

  return (
    <div className="rounded-3xl bg-white shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all">
      <img
        src={image}
        alt={name}
        className="w-full h-36 object-cover"
      />

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{details}</p>

        <div className="flex gap-1 items-center text-yellow-500">
          ⭐ <span className="text-black">{rating}</span>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition text-center"
        >
          Open in Maps
        </a>
      </div>
    </div>
  );
}

export default PlaceCardItem;
