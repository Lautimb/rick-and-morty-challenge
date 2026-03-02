import { Sun, Moon, Check } from "lucide-react";
import type { ThemeToggleUIProps } from "./types";
import { OPTIONS } from "./constants";

export function ThemeToggleUI({ current, isDark, isOpen, containerRef, onToggle, onSelect }: ThemeToggleUIProps) {
  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={onToggle}
        aria-label="Cambiar tema"
        className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
      >
        {isDark ? <Moon size={16} /> : <Sun size={16} />}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-10 z-50 w-36 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-white/10 dark:bg-gray-900">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className="cursor-pointer flex w-full items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5 transition-colors"
            >
              <span className="shrink-0 text-gray-500 dark:text-gray-400">{opt.icon}</span>
              {opt.label}
              {current === opt.value && (
                <Check size={12} className="ml-auto text-purple-500 dark:text-purple-400 shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
