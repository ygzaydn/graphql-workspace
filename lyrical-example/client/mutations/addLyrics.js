import { gql } from "@apollo/client";

const ADD_LYRICS = gql`
    mutation AddLyrics($content: String, $songId: ID) {
        addLyricToSong(content: $content, songId: $songId) {
            title
            id
            lyrics {
                content
                id
            }
        }
    }
`;

export default ADD_LYRICS;
