import React from "react";

const HOTEL_EMOJIS = ["🏨", "🏩", "🏕️", "🏛️", "🛎️", "🏚️", "⛺"];

function HotelCardItem({ item, index = 0 }) {
  // Normalize hotel name
  const name =
    item?.HotelName ||
    item?.hotelName ||
    item?.["Hotel Name"] ||
    item?.["hotel name"] ||
    item?.name ||
    "Unnamed Hotel";

  // Normalize address
  const address =
    item?.HotelAddress ||
    item?.hotelAddress ||
    item?.["Hotel address"] ||
    item?.["hotel address"] ||
    item?.address ||
    "";

  // Normalize image
  const image =
    item?.HotelImageUrl ||
    item?.hotelImageUrl ||
    item?.["hotel image url"] ||
    item?.image ||
    "/hotel-placeholder.jpg"; // static fallback

  // Normalize rating
  const rating =
    item?.rating ||
    item?.Rating ||
    item?.hotelRating ||
    "--";

  // Normalize coordinates
  const coords =
    item?.geoCoordinates ||
    item?.GeoCoordinates ||
    item?.["geo coordinates"] ||
    {};

  const lat = coords.latitude;
  const lng = coords.longitude;

  const mapsUrl =
    lat && lng
      ? `https://www.google.com/maps?q=${lat},${lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          name + " " + address
        )}`;

  const emoji = HOTEL_EMOJIS[index % HOTEL_EMOJIS.length];

  return (
    <div className="rounded-3xl bg-white shadow-lg hover:shadow-xl transition border overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />

        <span className="absolute top-3 left-3 bg-white bg-opacity-80 rounded-full px-2 py-1 shadow text-2xl">
          {emoji}
        </span>
      </div>

      <div className="p-5 space-y-2">
        <h3 className="font-bold text-lg">{name}</h3>

        <p className="text-gray-600 text-sm flex items-center gap-1">
          📍 {address || "Address not available"}
        </p>

        <p className="text-yellow-500 text-sm">
          ⭐ <span className="text-black">{rating}</span>
        </p>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-3 bg-purple-600 text-white text-center py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Open in Maps
        </a>
      </div>
    </div>
  );
}

export default HotelCardItem;
