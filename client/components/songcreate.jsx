import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_SONG = gql`
    mutation AddSong($title: String!) {
        addSong(title: $title) {
            title
        }
    }
`;

const SongCreate = () => {
    const [name, setName] = useState("");
    const [addSong, { data, loading, error }] = useMutation(ADD_SONG);

    if (loading) return "Submitting...";
    if (error) return `Submission error! ${error.message}`;

    return (
        <div>
            <h3>Create a new song</h3>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    addSong({
                        variables: {
                            title: name,
                        },
                    });
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
