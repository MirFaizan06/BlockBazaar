export function formatDownloadCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

export function filterMods<T extends { title: string; tags: string[]; type: string; createdAt: number; downloadCount: number }>(
  mods: T[],
  query: string,
  types: string[],
  tags: string[],
  sortBy: 'newest' | 'popular'
): T[] {
  let result = [...mods];

  if (query.trim()) {
    const q = query.toLowerCase();
    result = result.filter(
      m => m.title.toLowerCase().includes(q) || m.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (types.length > 0) {
    result = result.filter(m => types.includes(m.type));
  }

  if (tags.length > 0) {
    result = result.filter(m => tags.some(t => m.tags.includes(t)));
  }

  result.sort((a, b) =>
    sortBy === 'newest' ? b.createdAt - a.createdAt : b.downloadCount - a.downloadCount
  );

  return result;
}
