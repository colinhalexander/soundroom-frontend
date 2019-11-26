import React, { Component } from 'react'

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
      const { id } = this.props,
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
  
      fetch("http://localhost:3000/soundrooms", request)
        .then(response => response.json())
        .then(response => {
          console.log("new soundroom response:", response)

        })
    }
  }
  
  render() {
    return (
      <>
        <label>Name: </label>
        <input value={this.state.name} onChange={this.handleChange} autoFocus />
        <button onClick={this.createSoundRoom}>Create SoundRoom</button>
        <button onClick={this.props.toggleForm}>Back</button>
      </>
    )
  }
}
