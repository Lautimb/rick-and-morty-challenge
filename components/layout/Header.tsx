import { Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeSelectorLoader } from "@/components/features/ThemeSelector";

export function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-white/10 py-3">
      <div className="container-fluid mx-auto flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
            alt="Rick Sanchez"
            width={50}
            height={50}
            className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover"
          />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Rick & Morty{" "}
            <span className="text-purple-600 dark:text-purple-400 hidden sm:inline">Challenge</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeSelectorLoader />
          <a
            href="https://github.com/Lautimb/rick-and-morty-challenge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <Github size={18} />
            <span className="hidden sm:inline">Ver repositorio</span>
          </a>
        </div>

      </div>
    </header>
  );
}
