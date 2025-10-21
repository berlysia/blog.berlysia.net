import path from "node:path";
import type { PageMeta } from "./ogDataFetcher.ts";

export type OGCacheEntry = {
  url: string;
  data: PageMeta;
  timestamp: number;
  ttl: number;
};

export type OGCacheData = Record<string, OGCacheEntry>;

const CACHE_FILE_PATH = "og-cache.json";
const DEFAULT_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export class OGCache {
  private cache: OGCacheData | null = null;

  async load(): Promise<void> {
    // Only available on server-side
    if (typeof window !== "undefined") return;

    try {
      const { readFile } = await import("node:fs/promises");
      const content = await readFile(CACHE_FILE_PATH, "utf8");
      this.cache = JSON.parse(content);
    } catch {
      // File doesn't exist or is invalid, start with empty cache
      this.cache = {};
    }
  }

  async save(): Promise<void> {
    // Only available on server-side
    if (typeof window !== "undefined") return;
    if (this.cache === null) throw new Error("OGCache not loaded before save.");

    const { writeFile, mkdir } = await import("node:fs/promises");

    try {
      await mkdir(path.dirname(CACHE_FILE_PATH), { recursive: true });
      await writeFile(CACHE_FILE_PATH, JSON.stringify(this.cache, null, 2));
    } catch (error) {
      console.error("Failed to save OG cache:", error);
    }
  }

  get(url: string): PageMeta | null {
    if (this.cache === null) throw new Error("OGCache not loaded before get.");

    const entry = this.cache[url];
    if (!entry) return null;

    // Check if cache entry is expired
    if (Date.now() > entry.timestamp + entry.ttl) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- URL-based cache key requires dynamic deletion
      delete this.cache[url];
      return null;
    }

    return entry.data;
  }

  async getWithLoad(url: string): Promise<PageMeta> {
    if (this.cache === null) {
      await this.load();
    }
    const data = this.get(url);
    if (data) {
      return data;
    }
    throw new Error("Data not found in cache.");
  }

  set(url: string, data: PageMeta, ttl: number = DEFAULT_TTL): void {
    if (this.cache === null) throw new Error("OGCache not loaded before set.");

    this.cache[url] = {
      url,
      data,
      timestamp: Date.now(),
      ttl,
    };
  }

  has(url: string): boolean {
    return this.get(url) !== null;
  }

  clear(): void {
    this.cache = {};
  }

  getAllUrls(): string[] {
    return Object.keys(this.cache);
  }

  cleanup(): void {
    const now = Date.now();
    for (const [url, entry] of Object.entries(this.cache)) {
      if (now > entry.timestamp + entry.ttl) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- URL-based cache key requires dynamic deletion
        delete this.cache[url];
      }
    }
  }
}

// Singleton instance
export const ogCache = new OGCache();
