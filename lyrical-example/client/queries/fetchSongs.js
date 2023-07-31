import { gql } from "@apollo/client";

const GET_SONGS = gql`
    query GetSongs {
        songs {
            title
            id
        }
    }
`;

export default GET_SONGS;
