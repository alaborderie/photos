import React, { Component } from 'react';
import './App.css';

import Router from './router'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { title: 'Mot de passe requis' }
    this.inputRef = React.createRef()
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header-background">
          </div>
          <h1 className="App-title">{this.state.title}</h1>
        </header>
        <Router changeTitle={this.changeTitle} />
      </div>
    );
  }
  // ADD THIS TO UPLOAD PHOTOS (WIP)
  // <input className="photo-upload" onChange={this.uploadPhoto} ref={this.inputRef} type="file" accept=".jpg" />

  uploadPhoto = async () => {
    if (this.inputRef) {
      let file = this.inputRef.current.files[0]
      let blob = new Blob([file])
      let base64 = btoa(blob)
      const rawResponse = await fetch('http://localhost:8080/upload-photo', {
        method: 'POST',
        headers: {
          'Content-type': 'application/octet-stream'
        },
        body: base64
      })
      console.log(rawResponse)
    }
  }

  changeTitle = (title) => {
    this.setState({ title: title })
  }
}

export default App;
