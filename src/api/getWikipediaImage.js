import axios from "axios";

export const getWikipediaImage = async (placeName) => {
  try {
    // 1. Sanitize the query
    // Remove anything in parentheses: "Laad Bazaar (Chudi Bazaar)" -> "Laad Bazaar"
    // Split by special chars like "/" or "&" and take the first part
    const cleanQuery = placeName
      .replace(/\(.*?\)/g, "") // Remove (...)
      .split(/[|&/]/)[0]       // Split by | & / and take first part
      .trim();

    // 2. Use the Search API first (Better than guessing the URL)
    // This finds the closest matching page even if the name isn't perfect
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${encodeURIComponent(cleanQuery)}&utf8=1`;
    
    const searchResponse = await axios.get(searchUrl);
    
    // If we found a page, get its specific details
    if (searchResponse.data.query.search.length > 0) {
      const pageTitle = searchResponse.data.query.search[0].title;
      
      // Now fetch the image using the EXACT page title we found
      const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`;
      const summaryResponse = await axios.get(summaryUrl);
      
      return summaryResponse.data.originalimage?.source || 
             summaryResponse.data.thumbnail?.source || 
             null;
    }
    
    return null;
  } catch (error) {
    console.error(`Wikipedia Image Error for ${placeName}:`, error);
    return null;
  }
};
