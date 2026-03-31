import { YoutubeTranscript } from "youtube-transcript";

export interface TranscriptPart {
  text: string;
  duration: number;
  offset: number;
}

export async function getTranscript(url: string): Promise<string> {
  try {
    const videoId = extractVideoId(url);
    if (!videoId) {
      throw new Error("Invalid YouTube URL");
    }

    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    return transcript.map((part) => part.text).join(" ");
  } catch (error: any) {
    console.error("Error fetching transcript:", error);
    throw new Error(error.message || "Could not fetch transcript for this video.");
  }
}

export function extractVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
