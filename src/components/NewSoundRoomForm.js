import React, { Component } from 'react'

export default class NewSoundRoomForm extends Component {

  state = {
    name: ""
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value })
  }
  
  render() {
    return (
      <>
        <label>Name: </label>
        <input value={this.state.name} onChange={this.handleChange} autoFocus />
      </>
    )
  }
}
