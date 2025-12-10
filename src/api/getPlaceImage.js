import axios from "axios";
import { getWikipediaImage } from "./getWikipediaImage";

// Get place image (Unsplash → Wikipedia fallback)
export async function getPlaceImage(query) {
  try {
    // UNSPLASH (NO KEY NEEDED)
    const unsplashUrl = `https://source.unsplash.com/1200x800/?${encodeURIComponent(
      query
    )}`;

    // Check if URL returns an actual image
    const imgCheck = await axios.get(unsplashUrl, { timeout: 5000 });

    if (imgCheck?.request?.responseURL) {
      return imgCheck.request.responseURL;
    }
  } catch (err) {
    console.log("Unsplash fetch failed, using Wikipedia fallback.");
  }

  // WIKIPEDIA fallback
  try {
    const wikiImg = await getWikipediaImage(query);
    if (wikiImg) return wikiImg;
  } catch (err) {
    console.log("Wikipedia fetch failed.");
  }

  // FINAL fallback
  return "/road-trip-vacation.jpg";
}
