import { gql } from '@apollo/client';

export const GET_MOVIE_BY_ID = gql`
    query getMovie($query: ID!) {
        movie(id: $query) {
            id
            name
            overview
            releaseDate
            score
            genres {
                name
            }
            img: poster {
                url: medium
            }
            similar {
                name
                img: poster {
                    url: small
                }
            }
        }
    }
`;

export const SEARCH_MOVIES_BY_STRING = gql`
    query SearchMovies($query: String!) {
        searchMovies(query: $query) {
            id
            name
            score
            releaseDate
            genres {
                name
            }
            img: poster {
                url: custom(size: "w185_and_h278_bestv2")
            }
        }
    }
`;
