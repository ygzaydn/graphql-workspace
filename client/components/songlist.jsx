import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import GET_SONGS from "../queries/fetchSongs";
import DELETE_SONG from "../mutations/deleteSong";

const SongList = () => {
    const { loading, error, data } = useQuery(GET_SONGS);
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
                        <p style={{ marginRight: 2 }}>{el.title}</p>
                        <button
                            onClick={() =>
                                deleteSong({
                                    variables: { id: el.id },
                                    refetchQueries: [{ query: GET_SONGS }],
                                })
                            }
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
