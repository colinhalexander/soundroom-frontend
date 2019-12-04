import React, { Component } from 'react'
// import WebSocket from 'ws'

export default class RequestPage extends Component {


  componentDidMount() {
    const ws = new window.WebSocket('ws://localhost:3000/')
  
    ws.onopen = () => {
      console.log("connection successful")
    }
  
    ws.onmessage = (message) => {
      console.log(message.data)
    }
  }

  render() {
    return (
      <div className="request-page">
        <p>Request Page</p>
      </div>
    )
  }
}
