import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import PrivateRoute from "./routes/PrivateRoute"
import Registration from "./pages/registration"
import LogIn from "./pages/login"
import Game from "./pages/game"
import Home from "./pages/Home"

const theme = createMuiTheme({
  typography: "Pacifico"
})
const AppRouter = () => {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/login" component={LogIn} />
            <PrivateRoute exact path="/game" component={Game} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </>
  )
}

export default AppRouter
