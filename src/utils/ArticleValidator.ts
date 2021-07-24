export type ArticleMeta = {
  title: string;
  tags?: string[];
  lastModified?: string;
};

function isNonNullObject(obj: unknown): obj is Record<string, unknown> {
  return obj !== null && typeof obj !== "undefined";
}

function isString(obj: unknown): obj is string {
  return typeof obj === "string";
}

export function isValidArticleMeta(obj: unknown): obj is ArticleMeta {
  if (!isNonNullObject(obj)) return false;
  return (
    isString(obj.title) &&
    (!obj.lastModified || isString(obj.lastModified)) &&
    (obj.tags ? Array.isArray(obj.tags) && obj.tags.every(isString) : true)
  );
}
