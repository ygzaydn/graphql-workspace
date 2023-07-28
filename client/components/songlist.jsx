import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import GET_SONGS from "../queries/fetchSongs";
import DELETE_SONG from "../mutations/deleteSong";

const SongList = () => {
    const { loading, error, data, refetch } = useQuery(GET_SONGS);
    const [deleteSong] = useMutation(DELETE_SONG);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <div>
            <ul>
                {data.songs.map((el) => (
                    <li
                        key={el.title}
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Link to={`/song/${el.id}`} style={{ marginRight: 2 }}>
                            {el.title}
                        </Link>

                        <button
                            onClick={async () => {
                                await deleteSong({
                                    variables: { id: el.id },
                                });
                                await refetch();
                            }}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
            <Link to="/create">Create a new song</Link>
        </div>
    );
};

export default SongList;
