import React from 'react';
import AppBar from '../MaterialUI/AppBar';

// let user = JSON.parse(localStorage.getItem('user'))

const App = (props) => {
  return (
    <span>
      <AppBar {...props} />
    </span>
  )
}

export default App;