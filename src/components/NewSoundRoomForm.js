import React, { Component } from 'react'
import { toKebabCase } from '../utilities/string-methods'

export default class NewSoundRoomForm extends Component {

  state = {
    name: ""
  }

  handleChange = (event) => {
    if (event.target.value.length < 36) {
      this.setState({ name: event.target.value })
    }
  }

  createSoundRoom = () => {
    if (this.state.name) {
      const { id, history } = this.props,
            request = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                ...this.state,
                owner_id: id
              })
            }
      
      fetch("https://soundroom-1.herokuapp.com/soundrooms", request)
        .then(response => response.json())
        .then(response => {
          if (!response.error) {
            history.push(`/soundroom/${toKebabCase(response.soundroom.name)}`, response)
          } else {
            alert(response.error)
          }
        })
    }
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.createSoundRoom()
    }
  }
  
  render() {
    return (
      <>
        <label>Name: </label>
        <input
          autoFocus
          value={this.state.name}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <button onClick={this.createSoundRoom}>Create SoundRoom</button>
        <button onClick={this.props.toggleForm}>Back</button>
      </>
    )
  }
}