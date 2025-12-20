import React from "react";

const HOTEL_EMOJIS = ["🏨", "🏩", "🏕️", "🏛️", "🛎️", "🏚️", "⛺"];

function HotelCardItem({ item, index = 0 }) {
  // Normalize hotel name
  const name =
    item?.HotelName ||
    item?.hotelName ||
    item?.hotel_name ||
    item?.name ||
    "Unnamed Hotel";

  // Normalize address
  const address =
    item?.HotelAddress ||
    item?.hotelAddress ||
    item?.["Hotel address"] ||
    item?.address ||
    "";

  // Normalize rating
  const rating =
    item?.rating ||
    item?.Rating ||
    item?.hotelRating ||
    "--";

  // --- FIX IMAGE LOGIC ---
  // 1. Get the raw URL from any possible key
  let image =
    item?.hotelImageUrl ||
    item?.HotelImageUrl ||
    item?.HotelImage ||
    item?.hotel_image ||
    item?.["hotel image url"] ||
    item?.["hotel_image_url"] ||
    item?.image ||
    item?.imageUrl ||
    item?.photo ||
    item?.photoUrl ||
    "";

  // 2. Filter out fake/broken URLs
  if (
    !image ||
    image.includes("example.com") ||
    image.includes("unsplash.com")
  ) {
    image = "/placeholder.jpg"; // Force fallback for AI dummy links
  }

  // Coordinates for maps
  const coords =
    item?.geoCoordinates ||
    item?.GeoCoordinates ||
    item?.["geo coordinates"] ||
    {};

  const lat = coords.latitude;
  const lng = coords.longitude;

  // Fix Maps URL (Used standard Google Maps Search URL)
  const mapsUrl =
    lat && lng
      ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          name + " " + address
        )}`;

  const emoji = HOTEL_EMOJIS[index % HOTEL_EMOJIS.length];

  return (
    <div className="rounded-3xl bg-white shadow-lg hover:shadow-xl transition border overflow-hidden flex flex-col h-full">
      {/* IMAGE */}
      <div className="relative h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          // Final safety net: if image fails to load, swap to placeholder
          onError={(e) => {
            e.target.src = "/placeholder.jpg";
            e.target.onerror = null;
          }}
        />

        <span className="absolute top-3 left-3 bg-white bg-opacity-80 rounded-full px-2 py-1 shadow text-2xl">
          {emoji}
        </span>
      </div>

      <div className="p-5 space-y-2 flex flex-col flex-grow">
        <h3 className="font-bold text-lg">{name}</h3>

        <p className="text-gray-600 text-sm flex items-center gap-1">
          📍 {address || "Address not available"}
        </p>

        <p className="text-yellow-500 text-sm mt-auto">
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
