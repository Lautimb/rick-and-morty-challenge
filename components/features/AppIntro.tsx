import { ChevronDown, ChevronRight } from "lucide-react";

const STEPS = [
  { number: "01", text: "Elegí un personaje en el Panel #1" },
  { number: "02", text: "Elegí un personaje en el Panel #2" },
  { number: "03", text: "Explorá sus episodios compartidos" },
];

export function AppIntro() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
          Rick &amp; Morty{" "}
          <span className="text-purple-600 dark:text-purple-400">Explorer</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg max-w-md mx-auto">
          Seleccioná dos personajes y descubrí qué episodios comparten entre sí.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        {STEPS.map((step, i) => (
          <div key={step.number} className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-100 border border-gray-200 dark:bg-white/5 dark:border-white/10">
              <span className="text-purple-600 dark:text-purple-400 font-mono font-bold text-sm shrink-0">
                {step.number}
              </span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">{step.text}</span>
            </div>
            {i < STEPS.length - 1 && (
              <>
                <ChevronDown size={16} className="text-gray-400 dark:text-gray-600 sm:hidden" />
                <ChevronRight size={16} className="text-gray-400 dark:text-gray-600 hidden sm:block" />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
