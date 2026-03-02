import type { EpisodeListProps } from "./types";

export function EpisodeList({ episodes }: EpisodeListProps) {
  if (episodes.length === 0) return null;
  return (
    <ul className="flex-1 flex flex-col">
      {episodes.map((ep) => (
        <li key={ep.id} className="flex flex-col gap-0.5 py-1 border-b border-gray-200 dark:border-white/5 last:border-0">
          <div className="flex items-center gap-2">
            <span className="text-purple-600 dark:text-purple-400 font-mono font-bold text-xs shrink-0">{ep.episode}</span>
            <span className="text-gray-800 dark:text-gray-100 text-sm truncate">{ep.name}</span>
          </div>
          <span className="text-gray-500 text-xs">{ep.air_date}</span>
        </li>
      ))}
    </ul>
  );
}
