import axios from "axios";

export const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

export const PHOTO_REF_URL =
  "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference={NAME}&key=" +
  GOOGLE_PLACES_API_KEY;

// ---------- TEXT SEARCH ----------
export const GetPlaceDetails = async ({ textQuery }) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      textQuery
    )}&key=${GOOGLE_PLACES_API_KEY}`;

    const res = await axios.get(url);
    return res;
  } catch (err) {
    console.error("ERROR: Google Places Search Failed →", err);
    return null;
  }
};
