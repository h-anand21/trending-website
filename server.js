import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const DEFAULT_PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID || "PLtp23GqaHmiAJgvaHYI3UULaqgcVOKwNd";

// Curated 6 Patriotic Desh Bhakti Tracks
const PATRIOTIC_TRACKS = [
  {
    index: 0,
    videoId: "qX82R0H2w8U",
    title: "Ae Mere Watan Ke Logon",
    channel: "Lata Mangeshkar • C. Ramchandra",
    duration: 392,
    durationFormatted: "06:32",
    thumbnail: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=400&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=qX82R0H2w8U",
    embedUrl: "https://www.youtube.com/embed/qX82R0H2w8U"
  },
  {
    index: 1,
    videoId: "jDn2274wKWg",
    title: "Maa Tujhe Salaam (Vande Mataram)",
    channel: "A.R. Rahman • Mehboob",
    duration: 378,
    durationFormatted: "06:18",
    thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=jDn2274wKWg",
    embedUrl: "https://www.youtube.com/embed/jDn2274wKWg"
  },
  {
    index: 2,
    videoId: "rF8F3N0y09M",
    title: "Sandese Aate Hai (Border)",
    channel: "Sonu Nigam & Roop Kumar Rathod",
    duration: 445,
    durationFormatted: "07:25",
    thumbnail: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=rF8F3N0y09M",
    embedUrl: "https://www.youtube.com/embed/rF8F3N0y09M"
  },
  {
    index: 3,
    videoId: "2iR3s2lX76w",
    title: "Bharat Humko Jaan Se Pyara Hai",
    channel: "Hariharan • A.R. Rahman (Roja)",
    duration: 340,
    durationFormatted: "05:40",
    thumbnail: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=2iR3s2lX76w",
    embedUrl: "https://www.youtube.com/embed/2iR3s2lX76w"
  },
  {
    index: 4,
    videoId: "OQ1T3y0c3b8",
    title: "Chak De India",
    channel: "Sukhwinder Singh • Salim-Sulaiman",
    duration: 283,
    durationFormatted: "04:43",
    thumbnail: "https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=400&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=OQ1T3y0c3b8",
    embedUrl: "https://www.youtube.com/embed/OQ1T3y0c3b8"
  },
  {
    index: 5,
    videoId: "wF_B_UxsPio",
    title: "Teri Mitti (Kesari)",
    channel: "B Praak • Manoj Muntashir",
    duration: 314,
    durationFormatted: "05:14",
    thumbnail: "https://images.unsplash.com/photo-1597047084897-51e81819a499?auto=format&fit=crop&w=400&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=wF_B_UxsPio",
    embedUrl: "https://www.youtube.com/embed/wF_B_UxsPio"
  }
];

// Helper Functions
function extractPlaylistId(input) {
  if (!input) return null;
  if (/^PL[a-zA-Z0-9_-]+$/.test(input)) return input;
  try {
    const url = new URL(input);
    return url.searchParams.get("list") || url.searchParams.get("playlist") || null;
  } catch {
    return null;
  }
}

function parseDuration(isoDuration) {
  if (!isoDuration) return 0;
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);
  return hours * 3600 + minutes * 60 + seconds;
}

function formatTime(seconds) {
  const total = Math.floor(seconds || 0);
  const minutes = Math.floor(total / 60);
  const remainingSeconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

// --------------------------------------------------
// API: GET PLAYLIST
// --------------------------------------------------
app.get("/api/playlist", async (req, res) => {
  try {
    const input = req.query.url || req.query.playlistId || DEFAULT_PLAYLIST_ID;
    const playlistId = extractPlaylistId(input);

    if (!playlistId) {
      return res.status(400).json({
        success: false,
        message: "Invalid YouTube playlist URL or playlist ID",
      });
    }

    if (!YOUTUBE_API_KEY) {
      return res.json({
        success: true,
        playlist: {
          id: playlistId,
          totalTracks: PATRIOTIC_TRACKS.length,
          tracks: PATRIOTIC_TRACKS,
        },
        visualSync: {
          enabled: true,
          videoDuration: 10,
          mode: "LOOP_BY_MUSIC_TIME",
          rule: "videoTime = musicTime % videoDuration",
        },
      });
    }

    // If YOUTUBE_API_KEY provided, fetch dynamically from Google API
    const playlistUrl = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    playlistUrl.searchParams.set("part", "snippet,contentDetails");
    playlistUrl.searchParams.set("playlistId", playlistId);
    playlistUrl.searchParams.set("maxResults", "50");
    playlistUrl.searchParams.set("key", YOUTUBE_API_KEY);

    const response = await fetch(playlistUrl);
    const data = await response.json();

    const tracks = (data.items || []).map((item, index) => ({
      index,
      videoId: item.contentDetails?.videoId,
      title: item.snippet?.title || "Patriotic Track",
      channel: item.snippet?.channelTitle || "Official Artist",
      duration: 360,
      durationFormatted: "06:00",
      thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.default?.url,
      youtubeUrl: `https://www.youtube.com/watch?v=${item.contentDetails?.videoId}`,
      embedUrl: `https://www.youtube.com/embed/${item.contentDetails?.videoId}`,
      playlistId,
    }));

    res.json({
      success: true,
      playlist: {
        id: playlistId,
        totalTracks: tracks.length,
        tracks: tracks.length ? tracks : PATRIOTIC_TRACKS,
      },
      visualSync: {
        enabled: true,
        videoDuration: 10,
        mode: "LOOP_BY_MUSIC_TIME",
        rule: "videoTime = musicTime % videoDuration",
      },
    });
  } catch (error) {
    res.json({
      success: true,
      playlist: {
        id: DEFAULT_PLAYLIST_ID,
        totalTracks: PATRIOTIC_TRACKS.length,
        tracks: PATRIOTIC_TRACKS,
      },
      visualSync: {
        enabled: true,
        videoDuration: 10,
        mode: "LOOP_BY_MUSIC_TIME",
        rule: "videoTime = musicTime % videoDuration",
      },
    });
  }
});

// --------------------------------------------------
// API: VISUAL SYNC
// --------------------------------------------------
app.get("/api/visual-sync", (req, res) => {
  const videoDuration = Number(req.query.duration) || 10;
  res.json({
    success: true,
    musicControlsTimeline: true,
    video: {
      duration: videoDuration,
      loop: true,
      syncMode: "MUSIC_TIMELINE",
    },
    formula: {
      videoTime: `musicCurrentTime % ${videoDuration}`,
    },
  });
});

// --------------------------------------------------
// API: HEALTH
// --------------------------------------------------
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "15 August Unified Music & Video Backend",
    status: "online",
  });
});

// Serve frontend static build if available
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🇮🇳 15 August unified server running on port ${PORT}`);
});
