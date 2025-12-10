import axios from "axios";
import { GOOGLE_PLACES_API_KEY } from "./config";

export async function getPlaceImage(query) {
  try {
    const searchURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query
    )}&key=${GOOGLE_PLACES_API_KEY}`;

    const search = await axios.get(searchURL);
    const place = search.data.results?.[0];

    if (place?.photos?.length > 0) {
      const ref = place.photos[0].photo_reference;
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photo_reference=${ref}&key=${GOOGLE_PLACES_API_KEY}`;
    }

    // Unsplash fallback
    return `https://source.unsplash.com/600x400/?${encodeURIComponent(query)}`;
  } catch (err) {
    console.log("Image fetch failed → applying fallback");
  }

  return `https://source.unsplash.com/600x400/?travel,${encodeURIComponent(
    query
  )}`;
}
