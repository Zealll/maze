import React from 'react';
import { GiCastle } from "react-icons/gi";



const CharMapTile = props => {
    const { roomId, possDirect } = props;

    return (
        <div className="block--tile_start">
            <GiCastle className="icon--start" /> 
            <div className="block--start-data"></div>
        </div>
    );
};


export default CharMapTile;

