import React from "react"

import MapTiles from "./MapTiles"
import Loading from "../Loading"

const GameMapContainer = ({
  mapData,
  mapLandState,
  setMapLandState,
  possDirect,
  setPossDirect,
  handleInitData
}) => {

  // console.log("mapData in gamemapcontainer --> ", mapData)
  // If there is mapData, render the maptiles
  return (
    <section className="section--map-container">
      {mapData ? (
        <MapTiles
          mapData={mapData}
          mapLandState={mapLandState}
          setMapLandState={setMapLandState}
          possDirect={possDirect}
          setPossDirect={setPossDirect}
          handleInitData={handleInitData}
        />
      ) : (
        <Loading />
      )}
    </section>
  )
}

export default GameMapContainer
