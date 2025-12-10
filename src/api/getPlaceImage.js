import axios from "axios";
import { GOOGLE_PLACES_API_KEY } from "./config";

export async function getPlaceImage(query) {
  try {
    // 🔹 1. Search Google Places
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query
    )}&key=${GOOGLE_PLACES_API_KEY}`;

    const searchResp = await axios.get(searchUrl);
    const place = searchResp.data.results?.[0];

    if (place?.photos?.length > 0) {
      const photoRef = place.photos[0].photo_reference;
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${photoRef}&key=${GOOGLE_PLACES_API_KEY}`;
    }

    // 🔹 2. Unsplash fallback
    const unsplashUrl = `https://source.unsplash.com/600x400/?${encodeURIComponent(
      query
    )}`;
    return unsplashUrl;
  } catch (err) {
    console.log("Google Lookup Failed → fallback to Wiki");
  }

  // 🔹 3. Wikipedia fallback
  return `https://source.unsplash.com/600x400/?travel,${encodeURIComponent(
    query
  )}`;
}
