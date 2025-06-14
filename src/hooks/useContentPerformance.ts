
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

// Utility functions
function getHourRange(posts: any[]): string {
  // Returns e.g. "2-4 PM EST" for best avg engagement_rate
  if (posts.length === 0) return "-";
  // Compute counts for each 2-hour window in EST
  const hoursBuckets: Record<string, { total: number; sum: number }> = {};
  posts.forEach((p) => {
    if (!p.post_time || p.engagement_rate == null) return;
    // Convert UTC to EST (EST = UTC-5, naive implementation -- for demo)
    const date = new Date(p.post_time);
    let hourEST = (date.getUTCHours() - 5 + 24) % 24;
    // Bucket: 0-2, 2-4, ... 22-24
    const bucketStart = Math.floor(hourEST / 2) * 2;
    const bucket = `${bucketStart}-${bucketStart + 2}`;
    if (!hoursBuckets[bucket]) hoursBuckets[bucket] = { total: 0, sum: 0 };
    hoursBuckets[bucket].total += 1;
    hoursBuckets[bucket].sum += Number(p.engagement_rate);
  });
  // Find the max avg engagement
  let best = { bucket: "", avg: 0 };
  for (const [bucket, val] of Object.entries(hoursBuckets)) {
    const avg = val.sum / val.total;
    if (avg > best.avg) best = { bucket, avg };
  }
  // Format to 12-hour time with AM/PM
  const parse = (h: number) =>
    h === 0
      ? "12 AM"
      : h < 12
      ? `${h} AM`
      : h === 12
      ? "12 PM"
      : `${h - 12} PM`;
  if (!best.bucket) return "-";
  const [start, end] = best.bucket.split("-").map(Number);
  return `${parse(start)} - ${parse(end)} EST`;
}

function getHashtagSuggestion(posts: any[]) {
  // Suggests number of hashtags with best avg engagement
  if (posts.length === 0) return "-";
  const counts: Record<number, { total: number; sum: number }> = {};
  posts.forEach((p) => {
    if (!p.hashtags || p.engagement_rate == null) return;
    const num = p.hashtags.length;
    if (!counts[num]) counts[num] = { total: 0, sum: 0 };
    counts[num].total += 1;
    counts[num].sum += Number(p.engagement_rate);
  });
  let best = { count: 0, avg: 0 };
  for (const [num, val] of Object.entries(counts)) {
    const avg = val.sum / val.total;
    if (avg > best.avg) best = { count: Number(num), avg };
  }
  if (best.count === 0) return "Try 0-3 hashtags for variety";
  return `Use ${best.count} relevant hashtag${best.count > 1 ? "s" : ""} for optimal reach`;
}

function getWordCountSuggestion(posts: any[]) {
  // Find most common word count range for high engagement
  if (posts.length === 0) return "-";
  const ranges = [
    [0, 50],
    [51, 100],
    [101, 150],
    [151, 200],
    [201, 300],
    [301, 10000],
  ];
  const counts: Record<string, { total: number; sum: number }> = {};
  posts.forEach((p) => {
    if (p.word_count == null || p.engagement_rate == null) return;
    const wc = Number(p.word_count);
    const range = ranges.find(([min, max]) => wc >= min && wc <= max);
    if (range) {
      const key = `${range[0]}-${range[1]}`;
      if (!counts[key]) counts[key] = { total: 0, sum: 0 };
      counts[key].total += 1;
      counts[key].sum += Number(p.engagement_rate);
    }
  });
  let best = { range: "", avg: 0 };
  for (const [key, val] of Object.entries(counts)) {
    const avg = val.sum / val.total;
    if (avg > best.avg) best = { range: key, avg };
  }
  if (!best.range) return "-";
  const [min, max] = best.range.split("-").map(Number);
  return `${min}-${max} word posts perform best`;
}

function getTopContentTypes(posts: any[]) {
  // Returns up to 3 content types sorted by avg engagement rate
  if (posts.length === 0) return [];
  const types: Record<string, { total: number; sum: number }> = {};
  posts.forEach((p) => {
    if (!p.post_type || p.engagement_rate == null) return;
    const t = p.post_type;
    if (!types[t]) types[t] = { total: 0, sum: 0 };
    types[t].total += 1;
    types[t].sum += Number(p.engagement_rate);
  });
  return Object.entries(types)
    .map(([type, { total, sum }]) => ({
      type,
      avg: sum / total,
    }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 3);
}

export function useContentPerformance() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setPosts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from("content_performance")
      .select("*")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (error) setError("Failed to load analytics");
        else setPosts(data ?? []);
        setLoading(false);
      });
  }, [user]);

  // Compute analytics
  const topTypes = getTopContentTypes(posts);
  const bestTime = getHourRange(posts);
  const hashtagSuggestion = getHashtagSuggestion(posts);
  const wordCountSuggestion = getWordCountSuggestion(posts);

  return {
    loading,
    error,
    posts,
    topTypes,
    bestTime,
    hashtagSuggestion,
    wordCountSuggestion,
    isEmpty: posts.length === 0,
  };
}
