import React, { useState, useEffect } from "react"
import { Button, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Pusher from "pusher-js"
import axios from "axios"

const useStyles = makeStyles(theme => ({
  chatContainer: {
    height: "100%",
    border: "1px"
  },
  form: {
    display: "flex",
    justifyContent: "space-around"
  },
  sendButton: {
    background: "#360849",
    color: "#FFFFFF"
  }
}))
const Chat = props => {
  const classes = useStyles()
  const [chat, setChat] = useState([
    // {id: 1, user: 'elan8', message: 'Elan\'s Message!'},
    // {id: 2, user: 'Riznis', message: 'Riznis\' Message!'},
    // {id: 1, user: 'elan8', message: 'Elan\'s Message!'},
    // {id: 2, user: 'Riznis', message: 'Riznis\' Message!'},
    // {id: 1, user: 'elan8', message: 'Elan\'s Message!'},
    // {id: 2, user: 'Riznis', message: 'Riznis\' Message!'},
    // {id: 1, user: 'elan8', message: 'Elan\'s Message!'},
    // {id: 2, user: 'Riznis', message: 'Riznis\' Message!'},
    // {id: 2, user: 'Riznis', message: 'Riznis\' Message!'},
    // {id: 2, user: 'Riznis', message: 'Riznis\' Message!'},
  ])
  const [message, setMessage] = useState("")
  const [user, setUser] = useState("")

  // const [pusher, setPusher] = useState('')

  Pusher.logToConsole = true
  
  useEffect(() => {
    axios
      .get("https://wack-ass-game.herokuapp.com/api/adv/init", {
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("mud_token")).key
          }`
        }
      })
      .then(res => {
        setUser(res.data.name)
      })
      .catch(err => {
        console.log("ERRRRORRRR")
      })
      // setPusher(new Pusher("103635f1e5e86ef0cf06", {
      //   cluster: "us2",
      //   forceTLS: true
      // }))

    const pusher = new Pusher("103635f1e5e86ef0cf06", {
        cluster: "us2",
        forceTLS: true
    })
    const channel = pusher.subscribe("my-channel")
    channel.bind("my-event", function(data) {
      // console.log('DATAAAAAAAAAAAAAAA',data)
      setChat(chat => [...chat, data])
    })
  }, [])

  // if(pusher !== ''){
  //   pusher.bind("my-event", data => {
  //     console.log('DATAAAAAAA', data)
  //     setChat(chat => [...chat, data])
  //   })
  // }
  

  const messageHandler = e => {
    setMessage(e.target.value)
  }

  const submit = e => {
    e.preventDefault()
    const newMessage = { message: message }
    axios
      .post("https://wack-ass-game.herokuapp.com/api/adv/say/", newMessage, {
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("mud_token")).key
          }`
        }
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log("This is an error")
      })

    setMessage("")
  }

  return (
    <div className='chat-container'>
      <div className='scroll'>
        {chat.map((each, index) => (
          <div
            className={each.user === user ? "right both" : "left both"}
            key={index}>
            <h4 style={{ color: "#8B1E3F" }}>{each.user}</h4>
            <p>{each.message}</p>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className={classes.form}>
        <TextField
          variant="outlined"
          value={message}
          onChange={messageHandler}
        />
        <Button className={classes.sendButton}>Send Message</Button>
      </form>
    </div>
  )
}

export default Chat
