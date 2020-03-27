import React from "react"
import { Redirect, Route } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const serializedToken = localStorage.getItem("mud_token")
  const token = JSON.parse(serializedToken)

  return (
    <Route
      {...rest}
      render={props => {
        if (token && token.key) {
          return <Component {...props} />
        }
        return <Redirect to={"/login"} />
      }}
    />
  )
}

export default PrivateRoute
