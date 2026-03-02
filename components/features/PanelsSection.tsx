import { getCharactersPage } from "@/libs/api/characters";
import { PanelCharacters } from "@/components/features/PanelCharacters";

export async function PanelsSection() {
  const initialData = await getCharactersPage(1);

  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <PanelCharacters initialData={initialData} title="Personaje #1" panelId="char1" />
      <PanelCharacters initialData={initialData} title="Personaje #2" panelId="char2" />
    </div>
  );
}
