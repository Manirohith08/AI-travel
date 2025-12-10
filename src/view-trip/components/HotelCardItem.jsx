import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";

const HOTEL_EMOJIS = ["🏨", "🏩", "🏕️", "🏛️", "🛎️", "🏚️", "⛺"];

function HotelCardItem({ item, index = 0 }) {
  // Normalize AI + Firestore hotel data
  const name =
    item?.hotelName ||
    item?.HotelName ||
    item?.name ||
    "Unnamed Hotel";

  const address =
    item?.hotelAddress ||
    item?.HotelAddress ||
    item?.Hotel_address ||
    item?.address ||
    "";

  const rating = item?.rating || item?.Rating || "--";

  const price =
    item?.price ||
    item?.Price_per_night ||
    item?.price_per_night ||
    null;

  const coords =
    item?.geoCoordinates ||
    item?.geo_coordinates ||
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

  // IMAGE HANDLING
  const [photoUrl, setPhotoUrl] = useState(
    item?.hotelImageUrl || item?.HotelImageUrl || "/road-trip-vacation.jpg"
  );

  useEffect(() => {
    if (!item?.hotelImageUrl && !item?.HotelImageUrl) {
      fetchHotelImage();
    }
  }, []);

  const fetchHotelImage = async () => {
    try {
      const resp = await GetPlaceDetails({ textQuery: name });
      const photoList = resp?.data?.places?.[0]?.photos;

      if (photoList?.length > 0) {
        const url = PHOTO_REF_URL.replace("{NAME}", photoList[0].name);
        setPhotoUrl(url);
      }
    } catch {
      setPhotoUrl("/road-trip-vacation.jpg");
    }
  };

  return (
    <div className="max-w-sm w-full mx-auto">
      <div className="group rounded-3xl bg-white shadow-xl border overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition">
        <div className="relative">
          <img src={photoUrl} className="w-full h-44 object-cover" alt={name} />
          <span className="absolute top-3 left-3 bg-white bg-opacity-80 px-3 py-1 rounded-full text-2xl shadow">
            {HOTEL_EMOJIS[index % HOTEL_EMOJIS.length]}
          </span>
        </div>

        <div className="p-5 flex flex-col gap-2">
          <h3 className="font-bold text-lg">{name}</h3>

          <div className="flex items-center text-gray-600 text-sm">
            📍 <span className="ml-1 truncate">{address}</span>
          </div>

          {price && (
            <div className="text-green-600 text-sm">
              💰 <span>{price}</span>
            </div>
          )}

          <div className="text-yellow-500 text-sm">
            ⭐ <span className="text-black">{rating}</span>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2 text-center transition"
          >
            Open in Maps
          </a>
        </div>
      </div>
    </div>
  );
}

export default HotelCardItem;
