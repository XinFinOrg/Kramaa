// index.js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const styles = {
  app: {
    paddingTop: 40,
    textAlign: 'center',
  },
}
if (module.hot) {
  module.hot.accept();
}

class App extends Component {
  render() {
    return (
      <div style={styles.app}>
        Welcome to Kramaa!
      </div>
    )
  }
}

const root = document.querySelector('#app')
ReactDOM.render(<App />, root)
