import React, { useState } from "react"

import {
  AppBar,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import castleIcon from "../../assets/images/castle.png"
const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: "#F45866"
  },
  fileMenu: {
    flexGrow: 1
  },
  fileMenuButton: {
    color: "white"
  },
  appTitle: {
    fontFamily: "Pacifico"
  }
}))

const GameNavBar = ({ createNewGame, exitGame }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleFileMenuClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleFileMenuClose = () => {
    setAnchorEl(null)
  }

  const handleCreateNewGame = () => {
    createNewGame()
    handleFileMenuClose()
  }
  const handleExitGame = () => {
    exitGame()
    handleFileMenuClose()
  }

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.fileMenu}>
            <Button
              className={classes.fileMenuButton}
              arial-controls="file-menu-button"
              aria-haspopup="true"
              onClick={handleFileMenuClick}>
              File
            </Button>
            <Menu
              id="file-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleFileMenuClose}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center"
              }}>
              <MenuItem onClick={handleCreateNewGame}>New Game</MenuItem>
              <MenuItem onClick={handleExitGame}>Exit</MenuItem>
            </Menu>
          </div>

          <Typography className={classes.appTitle} variant="h5">
            Hero's Adventure
          </Typography>
          <img src={castleIcon} alt="castle" style={{ marginLeft: "10px" }} />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default GameNavBar
