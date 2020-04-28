import React from 'react';
import assessmentsIcon from '../../images/icon-small-assessments.svg';
import analyticsIcon from '../../images/icon-small-analytics.svg';
import utilSumIcon from '../../images/icon-small-utlization-summary.svg';
import DropDownImg from '../../images/icon-small-chevron-down.svg';
import {Link} from 'react-router-dom';

class HamburgerNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            x: 0,
            divId: "",
            toggleSidebar: "block",
            username: "Bryan Takayama",
            showNav:"",
            email:""
        };

        this.navbar = this.navbar.bind(this);
        this.getNick = this.getNick.bind(this);
        
    }

    navbar() {
        if (this.state.x === 0) {
            document.querySelector(".sidenav").style.width = "55px";
            // document.querySelector(".main").style.width = "calc(100vw - 55px)";
            this.setState({
                x: 1
            });
        }
        else {
            document.querySelector(".sidenav").style.width = "250px";
            // document.querySelector(".main").style.width = "calc(100vw - 250px)";
            this.setState({
                x: 0
            });
        }
    }

    darken(value) {
        if (this.state.divId !== "") {
            document.getElementById(this.state.divId).style.background = "none";
        }
        else {
            document.getElementById("assessments").style.background = "none";
        }
        document.getElementById(value).style.background = "#161617";
        this.setState({
            divId: value
        }); 
    }

    getNick() {
        let nameArray = this.state.username.split(" ");
        let nickName = nameArray.length > 0 ? nameArray[0].charAt(0) + nameArray[1].charAt(0) :  nameArray[0].charAt(0);
      
        return nickName;
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
                this.setState({
                  userName: result.username,
                  email: result.email
                });
                localStorage.setItem("userName", result.username);
                localStorage.setItem("userEmail", result.email);
              }
            }
          ).catch(err => {
            console.log(err)
        })
      }
    componentDidMount(){
        this.triggerUserNameAndPassword();
    }
    render() {
        return (
            
                <>
               <div className="sidenav">
                    <div className="top-part">
                    <div className="sidebar-option-top">
                        <div className="hamburger" onClick={this.navbar}>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                        <div className="top-text" style={{display: this.state.toggleSidebar}}>SMART FACTORY</div>
                    </div>
                    <Link onClick={() => this.darken("assessments")} className="sidebar-option" id="assessments" to="/" style={{background: "#161617"}}>
                        <img src={assessmentsIcon} className="sidebar-icon" alt=""/>
                        <div className="sidebar-text">Assessments</div>
                    </Link>
                    <Link onClick={() => this.darken("analytics")} className="sidebar-option" id="analytics" to="/analytics">
                        <img src={analyticsIcon} className="sidebar-icon" alt=""/>
                        <div className="sidebar-text">Analytics</div>
                    </Link>
                    <Link onClick={() => this.darken("utilization")} className="sidebar-option" id="utilization" to="/utilization">
                        <img src={utilSumIcon} className="sidebar-icon" alt=""/>
                        <div className="sidebar-text">Utilization Summary</div>
                    </Link>
                    <Link onClick={() => this.darken("overview")} className="sidebar-option" id="overview" to="/overview">
                        <span className="circle"></span>
                        <div className="sidebar-text">Frame Overview</div>
                    </Link>
                    </div>
                    <div className="logout">
                        <span className="name-circle">{this.getNick()}</span>
                        <div className="user-info">
                            <p className="username">{this.state.username}</p>
                            <p className="logout-text">LOGOUT</p>
                        </div>
                        <img src={DropDownImg} alt="" className="logout-down-arrow"/>
                    </div>
                </div>
              </>
        );
    
    }
    
}

export default HamburgerNav;