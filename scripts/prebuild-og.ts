#!/usr/bin/env tsx

import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fetchOGData } from "../app/lib/ogDataFetcher.js";
import { ogCache } from "../app/lib/ogCache.js";

// Extract EmbeddedLink URLs from JSX content
function extractEmbeddedLinkUrls(content: string): string[] {
  const urls: string[] = [];
  
  // Match _jsx(EmbeddedLink, { src: "..." })
  const jsxEmbeddedLinkRegex = /_jsx\(EmbeddedLink,\s*\{\s*src:\s*["']([^"']+)["']/g;
  let match: RegExpExecArray | null;
  
  while ((match = jsxEmbeddedLinkRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }
  
  return urls;
}

async function findJsxFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        files.push(...await findJsxFiles(fullPath));
      } else if (entry.name.endsWith('.jsx')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Directory doesn't exist, skip
  }
  
  return files;
}

async function collectUrlsFromArticles(): Promise<string[]> {
  const articleFiles = await findJsxFiles("app/generated/articles");
  const allUrls = new Set<string>();
  
  for (const file of articleFiles) {
    try {
      const content = await readFile(file, "utf-8");
      const urls = extractEmbeddedLinkUrls(content);
      urls.forEach(url => allUrls.add(url));
    } catch (error) {
      console.warn(`Failed to read ${file}:`, error);
    }
  }
  
  return Array.from(allUrls);
}

async function fetchOGDataWithRetry(url: string, maxRetries = 3): Promise<void> {
  let lastError: string | undefined;
  
  for (let i = 0; i < maxRetries; i++) {
    const result = await fetchOGData(url);
    
    if (result.ok) {
      ogCache.set(url, result.data);
      console.log(`✅ Fetched OG data for: ${url}`);
      return;
    }
    
    lastError = result.error;
    if (i < maxRetries - 1) {
      console.log(`⚠️  Retry ${i + 1}/${maxRetries} for ${url}: ${result.error}`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  
  console.error(`❌ Failed to fetch OG data for ${url}: ${lastError}`);
}

async function main() {
  console.log("🔍 Collecting URLs from articles...");
  
  // Load existing cache
  await ogCache.load();
  ogCache.cleanup(); // Remove expired entries
  
  const urls = await collectUrlsFromArticles();
  console.log(`📋 Found ${urls.length} EmbeddedLink URLs`);
  
  if (urls.length === 0) {
    console.log("ℹ️  No EmbeddedLink URLs found, skipping OG data collection");
    return;
  }
  
  // Filter URLs that need to be fetched (not in cache or expired)
  const urlsToFetch = urls.filter(url => !ogCache.has(url));
  
  if (urlsToFetch.length === 0) {
    console.log("✅ All URLs are already cached and up-to-date");
    return;
  }
  
  console.log(`🚀 Fetching OG data for ${urlsToFetch.length} new/expired URLs...`);
  
  // Fetch OG data with concurrency limit
  const CONCURRENT_LIMIT = 5;
  
  for (let i = 0; i < urlsToFetch.length; i += CONCURRENT_LIMIT) {
    const batch = urlsToFetch.slice(i, i + CONCURRENT_LIMIT);
    const batchPromises = batch.map(url => fetchOGDataWithRetry(url));
    
    await Promise.allSettled(batchPromises);
    
    // Small delay between batches to be respectful
    if (i + CONCURRENT_LIMIT < urlsToFetch.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  // Save cache
  await ogCache.save();
  console.log("💾 Saved OG data cache");
  console.log("✨ OG data collection completed");
}

// Check if this is the main module (for Node.js ESM)
if (process.argv[1] === new URL(import.meta.url).pathname) {
  main().catch((error) => {
    console.error("💥 Script failed:", error);
    process.exit(1);
  });
}