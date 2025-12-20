import React from "react";

const HOTEL_EMOJIS = ["🏨", "🏩", "🏕️", "🏛️", "🛎️", "🏚️", "⛺"];

function HotelCardItem({ item, index = 0 }) {
  // 1️⃣ HOTEL NAME
  const name =
    item?.HotelName ||
    item?.hotelName ||
    item?.hotel_name ||
    item?.name ||
    "Unnamed Hotel";

  // 2️⃣ HOTEL ADDRESS
  const address =
    item?.HotelAddress ||
    item?.hotelAddress ||
    item?.["Hotel address"] ||
    item?.address ||
    "";

  // 3️⃣ HOTEL RATING
  const rating =
    item?.rating ||
    item?.Rating ||
    item?.hotelRating ||
    "--";

  // 4️⃣ IMAGE LOGIC — IDENTICAL TO PLACES
  let imageSrc =
    item?.HotelImageUrl ||
    item?.hotelImageUrl ||
    item?.["Hotel Image Url"] ||
    item?.["hotel image url"] ||
    item?.image ||
    item?.imageUrl ||
    "";

  // Same fake/broken URL filtering as places
  if (
    !imageSrc ||
    imageSrc.includes("example.com") ||
    imageSrc.includes("source.unsplash.com")
  ) {
    imageSrc = "/placeholder.jpg";
    // OR if you want Unsplash dynamic images like places:
    // imageSrc = `https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop`;
  }

  // 5️⃣ GEO COORDINATES
  const coords =
    item?.GeoCoordinates ||
    item?.geoCoordinates ||
    item?.["Geo Coordinates"] ||
    item?.["geo coordinates"] ||
    {};

  const lat = coords.latitude;
  const lng = coords.longitude;

  // 6️⃣ MAPS URL — SAME AS PLACES
  const mapsUrl =
    lat && lng
      ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          name
        )}`;

  const emoji = HOTEL_EMOJIS[index % HOTEL_EMOJIS.length];

  return (
    <div className="rounded-3xl bg-white border shadow hover:shadow-lg transition p-4 flex flex-col h-full">
      <img
        src={imageSrc}
        className="rounded-xl w-full h-40 object-cover mb-3"
        alt={name}
        onError={(e) => {
          e.target.src = "/placeholder.jpg";
          e.target.onerror = null;
        }}
      />

      <h3 className="font-bold text-lg">{name}</h3>

      <p className="text-gray-600 text-sm mt-1">
        📍 {address || "Address not available"}
      </p>

      <div className="mt-2 text-yellow-500 text-sm">
        ⭐ <span className="text-black">{rating}</span>
      </div>

      <div className="mt-auto">
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

export default HotelCardItem;
