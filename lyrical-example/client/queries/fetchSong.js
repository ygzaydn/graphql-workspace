import { gql } from "@apollo/client";

const GET_SONG = gql`
    query GetSong($id: ID!) {
        song(id: $id) {
            id
            title
            lyrics {
                id
                likes
                content
            }
        }
    }
`;
export default GET_SONG;
