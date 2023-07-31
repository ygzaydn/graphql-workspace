import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import GET_SONG from "../queries/fetchSong";
import ADD_LYRICS from "../mutations/addLyrics";
import LIKE_LYRIC from "../mutations/likeLyric";
import { Link, useParams } from "react-router-dom";

const SongDetail = () => {
    const params = useParams();
    const { id } = params;
    const { data, error, loading, refetch } = useQuery(GET_SONG, {
        variables: { id },
    });

    const [addLyric] = useMutation(ADD_LYRICS);
    const [likeLyric] = useMutation(LIKE_LYRIC);
    const [text, setText] = useState("");

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error!</div>;

    const likeLyricHandler = async ({ id, likes }) => {
        await likeLyric({
            variables: { id },
            optimisticResponse: {
                likeLyric: {
                    id,
                    __typeName: "LyricType",
                    likes,
                },
            },
        });
    };

    return (
        <div>
            <Link to="/">Back home</Link>
            <h3>Song Details</h3>
            <div>
                <h4>name: {data.song.title}</h4>
                <div>
                    <h5>Lyrics:</h5>
                    {data.song.lyrics.map((el) => (
                        <div
                            key={el.id}
                            style={{ marginLeft: 20 }}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "30rem 10rem",
                            }}
                        >
                            <span style={{ marginRight: 20 }}>
                                {el.content} - {el.id}
                            </span>
                            <div>
                                <span style={{ marginRight: 2 }}>
                                    Likes: {el.likes}
                                </span>
                                <button
                                    onClick={() =>
                                        likeLyricHandler({
                                            id: el.id,
                                            likes: el.likes,
                                        })
                                    }
                                >
                                    Like Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <form
                    onSubmit={async () => {
                        await addLyric({
                            variables: { content: text, songId: id },
                        });
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="lyric">Add new Lyric</label>
                        <input
                            id="lyric"
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            placeholder="Enter Lyrics"
                            style={{ width: "15rem" }}
                        />
                    </div>

                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default SongDetail;
