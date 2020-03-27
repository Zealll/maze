import React, { useEffect, useState } from "react"
import axios from "axios"
import GameNavBar from "../../components/navbar"
import GameController from "../../components/controller"
import { Box, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import GameMapContainer from "../../components/game/GameMapContainer"
import Chat from "../../components/game/Chat"
import locationIcon from "../../assets/images/location.png"

const useStyles = makeStyles(theme => ({
  playerLocationDisplay: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(2),
    backgroundColor: "#360849",
    color: "#FFFFFF",

    alignItems: "center"
  },
  gameControllerContainer: {
    marginTop: "calc(5% + 60px)",
    bottom: 0
  },
  gameBoardContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2)
  },
  gameBoard: {
    flexGrow: 4
  },
  chat: {
    flexGrow: 1,
    marginLeft: "16px",
    padding: theme.spacing(1)
  }
}))

const Game = ({ history }) => {
  const classes = useStyles()

  const jsontoken = localStorage.getItem("mud_token")
  const token = JSON.parse(jsontoken)
  const [chat, setCat] = useState(false)

  const [initData, setInitData] = useState(null)

  const [newGame, setNewGame] = useState(true)

  const [exitGame, setExitGame] = useState(false)

  // Possdirect is how we track the history of movement
  // and where we store the directions a player can move
  const [possDirect, setPossDirect] = useState({
    lastTile: false,
    currentTile: {}
  })

  const [mapData, setMapData] = useState(null)

  const [mapLandState, setMapLandState] = useState({ currentRoomId: 1 })

  useEffect(() => {
    if (exitGame) {
      history.push("/login")
    }
  }, [exitGame, history])

  useEffect(() => {
    if (token && token.key) {
      axios({
        method: "GET",
        baseURL: "https://wack-ass-game.herokuapp.com/api/adv/rooms",
        headers: { Authorization: `Token ${token.key}` }
      })
        .then(response => {
          setMapData(response.data)
        })
        .catch(error => console.log(error))
    }
  }, [])

  const handleCreateNewGame = () => {
    // TODO:
  }

  const handleInitData = initData => {
    setInitData(initData)
  }

  const handleExitGame = () => {
    axios
      .post(`https://wack-ass-game.herokuapp.com/api/logout/`)
      .then(response => {
        localStorage.removeItem("mud_token")
        setExitGame(true)
      })
  }

  const chatToggle = () => {
    setCat(!chat)
  }

  //Directional Control Handlers

  const moveChar = directClicked => {
    // Retrieve token from local storage, parse, pass to api call
    // Receive the direction, extract first letter, pass as data
    // Update hook with new current room
    // New current room triggers useEffect,
    // use effect updates the map layout
    // from big map array.
    // Also check to make sure token is legit, first
    if (token && token.key) {
      axios({
        method: "POST",
        baseURL: "https://wack-ass-game.herokuapp.com/api/adv/move",
        headers: { Authorization: `Token ${token.key}` },
        data: { direction: directClicked.slice(0, 1) }
      })
        .then(response => {
          setMapLandState({ currentRoomId: response.data.room_id })
        })
        .catch(error => console.log("We have a move error", error))
    }
  }

  //Action Control Handlers
  const handleSpeak = () => {}

  return (
    <div>
      {/* <Grid container> */}
      <Grid item xs={12}>
        <GameNavBar
          createNewGame={handleCreateNewGame}
          exitGame={handleExitGame}
        />
      </Grid>

      <Grid item xs={12}>
        {possDirect && possDirect.currentTile && (
          <Box className={classes.playerLocationDisplay}>
            <img src={locationIcon} alt="location" />
            <div style={{ flex: 1 }}>
              You are in the {possDirect.currentTile.title} room
            </div>
          </Box>
        )}

      </Grid>
      {/* <Grid item xs={12}> */}
      <div className="flex">
        <div className={classes.gameBoard}>
          <section className="section--game-container">
            <div className="block--board">
              <GameMapContainer
                mapData={mapData}
                mapLandState={mapLandState}
                setMapLandState={setMapLandState}
                possDirect={possDirect}
                setPossDirect={setPossDirect}
                handleInitData={handleInitData}
                initData={initData}
              />
            </div>
          </section>
        </div>
        {/* <div className={classes.chat}> */}
        <Chat chat={chat} />
        {/* </div> */}
      </div>
      {/* </Grid> */}

      {/* <Grid item xs={12}> */}
      <GameController
        currentTile={possDirect.currentTile}
        moveChar={moveChar}
        speak={handleSpeak}
        chatToggle={chatToggle}
        initData={initData}
      />
      {/* </Grid> */}
    </div>
  )
}

export default Game
