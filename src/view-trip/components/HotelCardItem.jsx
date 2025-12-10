import React, { useState } from "react";

const HOTEL_EMOJIS = ["🏨", "🏩", "🏕️", "🏛️", "🛎️", "🏚️", "⛺"];

function HotelCardItem({ item, index = 0 }) {
  // Normalize hotel fields (AI output)
  const name =
    item?.hotelName ||
    item?.HotelName ||
    item?.name ||
    "Unnamed Hotel";

  const address =
    item?.hotelAddress ||
    item?.HotelAddress ||
    item?.address ||
    "Address not available";

  const rating = item?.rating || item?.Rating || "--";

  const price =
    item?.price ||
    item?.Price_per_night ||
    null;

  const coords =
    item?.geoCoordinates ||
    item?.GeoCoordinates ||
    {};

  const lat = coords?.latitude;
  const lng = coords?.longitude;

  const mapsUrl =
    lat && lng
      ? `https://www.google.com/maps?q=${lat},${lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${name}, ${address}`
        )}`;

  // ⭐ Use ONLY AI image → fallback → no Google calls
  const [photoUrl] = useState(
    item?.hotelImageUrl ||
      item?.HotelImageUrl ||
      "/road-trip-vacation.jpg"
  );

  const emoji = HOTEL_EMOJIS[index % HOTEL_EMOJIS.length];

  return (
    <div className="max-w-sm w-full mx-auto">
      <div className="group rounded-3xl bg-white shadow-xl border border-gray-200 overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">

        {/* IMAGE */}
        <div className="relative">
          <img
            src={photoUrl}
            alt={name}
            className="w-full h-44 object-cover"
          />
          <span className="absolute top-3 left-3 bg-white bg-opacity-80 rounded-full px-2 py-1 shadow text-2xl">
            {emoji}
          </span>
        </div>

        {/* CONTENT */}
        <div className="p-5 pb-4 flex flex-col gap-2">
          <div className="font-bold text-lg text-gray-900">{name}</div>

          <div className="flex items-center text-xs text-gray-600 gap-1">
            📍 <span className="truncate">{address}</span>
          </div>

          {price && (
            <div className="flex items-center text-sm text-green-600 gap-1">
              💰 <span>{price}</span>
            </div>
          )}

          <div className="flex items-center text-sm text-yellow-500 gap-1">
            ⭐ <span className="text-black">{rating}</span>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm shadow-md hover:bg-purple-700 transition text-center"
          >
            Open in Maps
          </a>
        </div>
      </div>
    </div>
  );
}

export default HotelCardItem;
