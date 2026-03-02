export const GRAPHQL_URL = "https://rickandmortyapi.com/graphql";

export const GET_CHARACTERS_QUERY = `
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        status
        species
        episode {
          id
        }
      }
    }
  }
`;

export const GET_EPISODES_QUERY = `
  query GetEpisodes($ids: [ID!]!) {
    episodesByIds(ids: $ids) {
      id
      name
      air_date
      episode
    }
  }
`;
