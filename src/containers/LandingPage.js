import React, { Component } from 'react'

import '../stylesheets/LandingPage.css'

import NavBar from '../components/NavBar'
import WelcomeHeader from '../components/WelcomeHeader'
import DemoSection from '../components/DemoSection'

export default class LandingPage extends Component {
  render() {
    return (
      <div classname="landing-page">
        <NavBar {...this.props} />
        <WelcomeHeader />
        <DemoSection />
      </div>
    )
  }
}
