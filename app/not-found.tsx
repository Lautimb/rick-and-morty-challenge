import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-10 py-16 text-center">

      <div className="relative">
        <div className="absolute inset-0 scale-150 rounded-full bg-purple-500/20 blur-2xl" />
        <Image
          src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
          alt="Rick Sanchez agarrándose la cabeza"
          width={148}
          height={148}
          className="relative rounded-full border-4 border-purple-500 object-cover"
          priority
        />
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md dark:border-white/10 dark:bg-gray-800 dark:text-gray-200">
          ¡Ugh, qué URL más inútil!
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white dark:border-t-gray-800" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">
          Dimensión desconocida
        </span>
        <p className="text-8xl font-bold leading-none text-gray-900 dark:text-gray-100">
          404
        </p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Página no encontrada
        </h1>
        <p className="mx-auto max-w-sm text-gray-500 dark:text-gray-400">
          Rick escaneó todos los universos conocidos —incluso el C-137— y no
          hay rastros de esta página. Probablemente la borró con su pistola de
          portales.
        </p>
      </div>

      <Link
        href="/"
        className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
      >
        Volver al Universo C-137
      </Link>
    </div>
  );
}
