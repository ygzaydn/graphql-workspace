import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_SONGS = gql`
    query GetSongs {
        songs {
            title
        }
    }
`;

const SongList = () => {
    const { loading, error, data } = useQuery(GET_SONGS);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    console.log(data);

    return (
        <ul>
            {data.songs.map((el) => (
                <li key={el.title}>{el.title}</li>
            ))}
        </ul>
    );
};

export default SongList;
