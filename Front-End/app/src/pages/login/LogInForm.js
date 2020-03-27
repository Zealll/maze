import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Paper,
  TextField,
  Typography
} from "@material-ui/core"
import castleIcon from "../../assets/images/castle64x64.png"
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    background: "#F45866"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2)
  },
  formTitleContainer: {
    display: "flex",
    background: "#360849",
    color: "#FFFFFF",
    width: "100%",
    padding: theme.spacing(2),
    alignItems: "center"
  },
  formTitle: {
    fontFamily: "Pacifico",
    fontSize: "28px",
    marginLeft: "10px"
  },
  form: {
    width: "100%",
    padding: "0 20px",
    marginTop: theme.spacing(3)
  },
  link: {
    textAlign: "center"
  },
  loginButton: {
    background: "#360849",
    color: "#FFFFFF",
    margin: theme.spacing(3, 0)
  }
}))
const LogInForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleSubmit,
  handleBlur,
  isLoading
}) => {
  const classes = useStyles()
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.root}>
        <Paper className={classes.paper}>
          <Box className={classes.formTitleContainer}>
            <img src={castleIcon} alt="castle" />
            <Typography className={classes.formTitle}>
              Hero's Adventure
            </Typography>
          </Box>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="username"
                  required
                  fullWidth
                  id="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Username"
                  type="text"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  required
                  fullWidth
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Email"
                  type="text"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="password"
                  required
                  fullWidth
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Password"
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" fullWidth className={classes.loginButton}>
                  Log In
                </Button>
                <div className={classes.link}>
                  <Link href="/registration">
                    Don't have an account ? Register
                  </Link>
                </div>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  )
}

export default LogInForm
