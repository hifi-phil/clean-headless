export function getYouTubeVideoId(youtubeUrl: string): string | null {
    try {
      const url = new URL(youtubeUrl);
  
      if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
        const videoId = url.searchParams.get("v");
        return videoId ?? null;
      }
  
      if (url.hostname === "youtu.be") {
        return url.pathname.split("/").pop() || null;
      }
    } catch (error) {
      console.error("Invalid URL:", error);
    }
  
    return null;
  }
  