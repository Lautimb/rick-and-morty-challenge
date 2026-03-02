import { EpisodeList } from "./EpisodeList";
import { Spinner } from "@/components/ui/Spinner";
import { cx } from "class-variance-authority";
import type { Episode } from "@/libs/types";

type EpisodeColumnShellProps = {
  title: string;
  episodes: Episode[];
  isPending: boolean;
  error: string | null;
  emptyMessage?: string;
  resetKey?: unknown;
  centerTitle?: boolean;
};

export function EpisodeColumnShell({
  title,
  episodes,
  isPending,
  error,
  emptyMessage,
  resetKey,
  centerTitle = false,
}: EpisodeColumnShellProps) {
  return (
    <div className="w-full min-h-96 flex flex-col gap-3 border-2 border-purple-500 rounded-xl p-5">
      <h3
        className={cx("font-bold text-gray-900 dark:text-gray-100 shrink-0", {
          "text-center": centerTitle,
          "truncate": !centerTitle,
        })}
      >
        {title}
      </h3>
      {isPending && <Spinner className="my-auto" />}
      {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}

      {!isPending && (
        <EpisodeList episodes={episodes} emptyMessage={emptyMessage} resetKey={resetKey} />
      )}
    </div>
  );
}
