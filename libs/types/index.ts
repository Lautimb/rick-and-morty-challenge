export type CharacterStatus = "Alive" | "Dead" | "unknown";

export type Character = {
  id: number;
  name: string;
  image: string;
  status: CharacterStatus;
  species: string;
  episode: string[];
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
};

export type PaginationInfo = {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
};

export type CharactersPage = {
  info: PaginationInfo;
  results: Character[];
};

export type PanelId = "char1" | "char2";

export type EpisodeSets = {
  char1Only: Episode[];
  shared: Episode[];
  char2Only: Episode[];
};

export type RawCharacter = {
  id: string;
  name: string;
  image: string;
  status: CharacterStatus;
  species: string;
  episode: { id: string }[];
};

export type GraphQLResponse = {
  characters: {
    info: CharactersPage["info"];
    results: RawCharacter[];
  };
};