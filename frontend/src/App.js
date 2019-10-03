import React from 'react';
import Cookies from 'universal-cookie';
import './App.css';
import AppLogin from './scenes/AppLogin';
import AppMain from './scenes/AppMain';
import API from './API';

class App extends React.Component {
  checkToken(token) {
    let username = null;
    const cookies = new Cookies();
  
    try {
      let tokenResponse = API.post('/token', {"token": token}).then(data => {
        username = data.data.username;
        const error_message = data.data.error;

        if (typeof error_message != "undefined") {
          console.log("Token error: ", error_message)
          cookies.remove('brickTubeApp');
        }
        else if (typeof username == "undefined") {
          console.log("Undefined username: ", username)
          cookies.remove('brickTubeApp');
        }
        else {
          console.log("Valid token for user: ", username)
        }
      }).then(data => {
        if(typeof cookies.get('brickTubeApp') == "undefined") {
          window.location.reload();
        }
      });
    } catch(e) {
      console.log("Error contacting auth endpoint", e)
    }

    return username;
  }

  render() {
    const cookies = new Cookies();
    const auth_token = cookies.get('brickTubeApp');
    if (typeof auth_token != "undefined") {
      this.checkToken(auth_token);
    }

    return (
      <React.Fragment>
        {(typeof auth_token == "undefined") ? <AppLogin /> : <AppMain />}
      </React.Fragment>
    );
  }
}

export default App;
