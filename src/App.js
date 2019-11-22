import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './stylesheets/App.css';
import LandingPage from './containers/LandingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={(props) => <LandingPage {...props} />} />
      </div>
    </Router>
  );
}

export default App;
