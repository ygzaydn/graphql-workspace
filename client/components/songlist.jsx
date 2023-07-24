import React from "react";
import { gql, useQuery } from "@apollo/client";

const query = gql`
    {
        songs {
            title
        }
    }
`;

const SongList = () => {
    return (
        <div>
            <div>SongList</div>
        </div>
    );
};

export default SongList;
