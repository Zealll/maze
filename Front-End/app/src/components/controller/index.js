import React from "react"
import {
  AppBar,
  Button,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import upArrow from "../../assets/images/up_arrow.png"
import leftArrow from "../../assets/images/left_arrow.png"
import rightArrow from "../../assets/images/right_arrow.png"
import downArrow from "../../assets/images/down_arrow.png"
import helmetIcon from "../../assets/images/knight.png"

const useStyles = makeStyles(theme => ({
  controller: {
    top: "auto",
    bottom: 0,
    backgroundColor: "#F45866",
    padding: "10px 0"
  },
  directionalController: {
    padding: theme.spacing(1)
  },
  upDownButton: {
    backgroundColor: "#360849",
    color: "#FFFFFF"
  },
  leftButton: {
    backgroundColor: "#360849",
    color: "#FFFFFF",
    marginRight: "3px"
  },
  rightButton: {
    backgroundColor: "#360849",
    color: "#FFFFFF"
  },
  actionButton: {
    margin: theme.spacing(1),
    backgroundColor: "#3C153B",
    color: "#FFFFFF"
  },
  userList: {
    height: "100px",
    overflow: "auto"
  }
}))
const GameController = ({ currentTile, initData, moveChar }) => {
  const classes = useStyles()
  return (
    <AppBar position="relative" className={classes.controller}>
      <Grid container justify="space-around">
        <Grid item>
          <div
            style={{
              display: "flex",
              flexDirection: "column"
            }}>
            <Button
              disabled={currentTile.next_room_id_n === 0}
              className={classes.upDownButton}
              onClick={() => moveChar("north")}>
              <img src={upArrow} alt="up_arrow" />
            </Button>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "5px 0"
              }}>
              <Button
                disabled={currentTile.next_room_id_w === 0}
                className={classes.leftButton}
                onClick={() => moveChar("west")}>
                <img src={leftArrow} alt="left_arrow" />
              </Button>
              <Button
                disabled={currentTile.next_room_id_e === 0}
                className={classes.rightButton}
                onClick={() => moveChar("east")}>
                <img src={rightArrow} alt="right_arrow" />
              </Button>
            </div>

            <Button
              disabled={currentTile.next_room_id_s === 0}
              className={classes.upDownButton}
              onClick={() => moveChar("south")}>
              <img src={downArrow} alt="down_arrow" />
            </Button>
          </div>
        </Grid>
        {/* <Grid item>Mini Map Placeholder</Grid> */}
        <Grid item>
          {initData && initData.players.length > 0 && (
            <List dense className={classes.userList}>
              {initData.players.map((player, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <img src={helmetIcon} alt="helmet" />
                  </ListItemIcon>
                  <ListItemText>{player}</ListItemText>
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default GameController
