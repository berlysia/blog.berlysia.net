export function dropExt(filename: string) {
  return filename.replace(/\.md$/, "");
}

export function addExt(filename: string) {
  return `${filename}.md`;
}
