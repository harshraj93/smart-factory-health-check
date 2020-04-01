import React from 'react';
import './SCSS/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import HamburgerNav from './components/sfm-hamburger-nav/sfm-hamburger-nav';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes/index'
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showMenu:true
    }
  }

  disableMenu = (showFlag)=>{
    this.setState({
      showMenu:showFlag
    })
  }

  render(){
  return (
    <div className="App">
      <Router>
      {this.state.showMenu&&<HamburgerNav/>}
        <div className="main">
          <Routes disableMenu={this.disableMenu}/>
        </div>
      </Router>
    </div> 
  );
}
}

export default App;
