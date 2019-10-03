import React from 'react';
import Cookies from 'universal-cookie';
import './App.css';
import AppLogin from './scenes/AppLogin';
import AppMain from './scenes/AppMain';

function App() {
  const cookies = new Cookies();
  const auth_token = cookies.get('brickTubeApp');
  console.log(auth_token)

  return (
    <React.Fragment>
      {(typeof auth_token == "undefined") ? <AppLogin /> : <AppMain />}
    </React.Fragment>
  );
}

export default App;
