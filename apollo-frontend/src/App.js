import React, { Component } from 'react'
import Header from './components/Header'
import Links from './components/Links'
import Chat from './components/Chat'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="wrapper">
          <Links />
          <Chat />
        </div>
      </div>
    );
  }
}

export default App;
