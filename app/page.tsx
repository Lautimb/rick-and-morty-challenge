import { PanelCharacters } from "@/components/features/PanelCharacters";
import { getCharactersPage } from "@/libs/api/characters";

export default async function Home() {
  const [panel1Data, panel2Data] = await Promise.all([
    getCharactersPage(1),
    getCharactersPage(1),
  ]);

  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <PanelCharacters initialData={panel1Data} title="Character #1" />
      <PanelCharacters initialData={panel2Data} title="Character #2" />
    </div>
  );
}
