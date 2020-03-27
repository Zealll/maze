import React, { useEffect } from 'react';
import { GiBrickWall } from "react-icons/gi";


const OldMapPath = props => {
    const { moveHistory } = props;

    useEffect(() => {
        // // Forwards
        // if (currentTile.x_coor > lastTile.x_coor) setCharTranslate({ ...charTranslate, x: charTranslate.x + 50, display: true })
        // if (currentTile.y_coor > lastTile.y_coor) setCharTranslate({ ...charTranslate, y: charTranslate.y - 50, display: true })

        // // Backwards
        // if (currentTile.x_coor < lastTile.x_coor) setCharTranslate({ ...charTranslate, x: charTranslate.x - 50, display: true })
        // if (currentTile.y_coor < lastTile.y_coor) setCharTranslate({ ...charTranslate, y: charTranslate.y + 50, display: true })
    }, [])

    console.log('moveHistory in oldmappath --> ', moveHistory);
    return (
        <>
            {moveHistory.map((eachMove, index) => (
                <React.Fragment key={index}>
                    {index === 0 ? null : (
                        <GiBrickWall className="block--tile_oldpath" style={{transform: `translate(${eachMove.x}px, ${eachMove.y}px) scale(1, 1)`}} />
                    )}
                </React.Fragment>
            ))}
        </>
    );
}


export default OldMapPath;

