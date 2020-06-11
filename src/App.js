import React from 'react';
import './SCSS/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import HamburgerNav from './components/sfm-hamburger-nav/sfm-hamburger-nav';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes/index';
import {apiGetHeader} from './api/main/mainapistorage';
import userInfo from './api/userInfo/userInfo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
      userName: "",
      email: "",
      profile: ""
    }
  }

  disableMenu = (showFlag) => {
    this.setState({
      showMenu: showFlag
    })
  }
  triggerUserNameAndPassword = () => {

    let accessTokenActual = (document.cookie);
    let accessArr = accessTokenActual.split(':');
    accessTokenActual = accessArr[1];
    let obj = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessTokenActual
      }
    };

    fetch('https://sfhc-dev.auth.us-east-1.amazoncognito.com/oauth2/userInfo', obj)
      .then(resp => resp.json())
      .then(
        (result) => {

          if (result.error) {
            this.setState({
              userName: "Error"
            });
          } else {
            fetch(userInfo+`?pocName=${result.email}`,apiGetHeader)
            .then(resp => resp.json())
            .then(
              (resultant) => 
              this.setState({
              userName: result.username,
              email: result.email,
              profile: resultant.profile
            }))
           
            localStorage.setItem("userName", result.username);
            localStorage.setItem("userEmail", result.email);
            localStorage.setItem("userProfile", result.profile)
          }
        }
      ).catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.triggerUserNameAndPassword();
  }

  render() {
    return (
      <div className="App">
        <Router>
          {this.state.showMenu && <HamburgerNav user={this.state.userName} />}
          <div className="main">
            <Routes disableMenu={this.disableMenu} userProfile={this.state.profile} username={this.state.username} userEmail={this.state.email} />
          </div>
        </Router>
      </div>
    );
  }
}

export default (App);
