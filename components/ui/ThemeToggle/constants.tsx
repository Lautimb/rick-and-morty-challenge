import { Sun, Moon, Monitor } from "lucide-react";
import type { Option } from "./types";

export const OPTIONS: Option[] = [
  { value: "light", label: "Claro", icon: <Sun size={14} /> },
  { value: "dark", label: "Oscuro", icon: <Moon size={14} /> },
  { value: "system", label: "Sistema", icon: <Monitor size={14} /> },
];
