import React from 'react';
import Cookies from 'universal-cookie';
import './App.css';
import AppLogin from './scenes/AppLogin';
import AppMain from './scenes/AppMain';
import AppPlay from './scenes/AppPlay';
import API from './API';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      username: null,
    }
  }

  checkToken(token) {
    let username = null;
    const cookies = new Cookies();
  
    try {
      API.post('/token', {"token": token}).then(data => {
        username = data.data.username;
        const error_message = data.data.error;

        if (typeof error_message != "undefined") {
          console.log("Token error: ", error_message)
          cookies.remove('brickTubeApp');
          cookies.remove('brickTubeAppUser');
        }
        else if (typeof username == "undefined") {
          console.log("Undefined username: ", username);
          cookies.remove('brickTubeApp');
          cookies.remove('brickTubeAppUser');
        }
        else {
          console.log("Valid token for user: ", username);
          cookies.set('brickTubeAppUser', username);
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
      <Router>
        <Switch>
          <Route path="/videos/:videoID">
            <AppPlay />
          </Route>
          <Route path="/">
            {(typeof auth_token == "undefined") ? <AppLogin /> : <AppMain />}
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
