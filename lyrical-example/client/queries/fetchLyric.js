import { gql } from "@apollo/client";

const GET_LYRIC = gql`
    query GetLyric($id: ID!) {
        lyric(id: $id) {
            id
            likes
            content
        }
    }
`;

export default GET_LYRIC;
