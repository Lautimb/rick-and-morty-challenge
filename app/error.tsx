'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    console.error('[Error Boundary]', error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-10 py-16 text-center">

      <div className="relative">
        <div className="absolute inset-0 scale-150 rounded-full bg-red-500/20 blur-2xl" />
        <Image
          src="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
          alt="Morty Smith"
          width={148}
          height={148}
          className="relative rounded-full border-4 border-red-500 object-cover"
          priority
        />
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md dark:border-white/10 dark:bg-gray-800 dark:text-gray-200">
          ¡Oh geez, Rick, algo explotó!
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white dark:border-t-gray-800" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-red-500 dark:text-red-400">
          Colapso dimensional
        </span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Algo salió mal
        </h2>
        <p className="mx-auto max-w-sm text-gray-500 dark:text-gray-400">
          La API del Consejo de Ricks dejó de responder. Podés reintentar
          o esperar a que Rick arregle el portal.
        </p>
      </div>

      {error.message && (
        <p className="max-w-sm break-all font-mono text-xs text-gray-400 dark:text-gray-600">
          {error.message}
        </p>
      )}

      <Link
        href="/"
        className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
      >
        Reintentar
      </Link>

    </div>
  );
}
