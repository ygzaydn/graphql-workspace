import { gql } from "@apollo/client";

const ADD_SONG = gql`
    mutation AddSong($title: String!) {
        addSong(title: $title) {
            title
            id
        }
    }
`;

export default ADD_SONG;
