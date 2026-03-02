import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-white/10 py-5">
      <div className="container-fluid mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">

        <p>© {new Date().getFullYear()} Rick & Morty Challenge</p>

        <div className="flex items-center gap-6">
          <a
            href="https://rickandmortyapi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ExternalLink size={14} />
            Rick & Morty API
          </a>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ExternalLink size={14} />
            Desarrolado con Next.js Docs
          </a>
        </div>

      </div>
    </footer>
  );
}
