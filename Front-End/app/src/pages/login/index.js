import React, { useEffect, useState } from "react"
import axios from "axios"

import { Formik } from "formik"
// import * as Yup from "yup"
import LogInForm from "./LogInForm"

const Login = ({ history }) => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (loggedIn) {
      const serializedToken = localStorage.getItem("mud_token")
      const token = JSON.parse(serializedToken)
      if (token && token.key) {
        history.push("/game")
        setLoggedIn(false)
      }
    }
  }, [loggedIn, history])
  return (
    <div className="block--registration-login">
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values, actions) => {
          axios
            .post("https://wack-ass-game.herokuapp.com/api/login/", values)
            .then(response => {
              const serializedToken = JSON.stringify(response.data)
              localStorage.setItem("mud_token", serializedToken)
              setLoggedIn(true)
              //console.log(response.data)
            })
        }}
        render={formikProps => <LogInForm {...formikProps} />}
      />
    </div>
  )

}

export default Login
