import { gql } from "@apollo/client";

const DELETE_SONG = gql`
    mutation DeleteSong($id: ID!) {
        deleteSong(id: $id) {
            title
            id
        }
    }
`;

export default DELETE_SONG;
