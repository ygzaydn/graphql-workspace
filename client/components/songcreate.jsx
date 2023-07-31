import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import GET_SONGS from "../queries/fetchSongs";
import ADD_SONG from "../mutations/addSong";

const SongCreate = () => {
    const [name, setName] = useState("");
    const [addSong, { data, loading, error }] = useMutation(ADD_SONG);
    const navigate = useNavigate();

    if (loading) return "Submitting...";
    if (error) return `Submission error! ${error.message}`;

    return (
        <div>
            <Link to="/">Back</Link>
            <h3>Create a new song</h3>
            <form
                onSubmit={async (event) => {
                    event.preventDefault();
                    await addSong({
                        variables: {
                            title: name,
                        },
                        refetchQueries: [{ query: GET_SONGS, variables: {} }],
                    });
                    navigate("/");
                }}
            >
                <label htmlFor="title">Song Title:</label>
                <input
                    id="title"
                    placeholder="Enter Song Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Create a new song</button>
            </form>
        </div>
    );
};

export default SongCreate;
