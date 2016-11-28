import React, { Component } from 'react';

import ReactDOM from 'react-dom';


import saveMap from './Maps.jsx';


// import Places from './Places.jsx';
// import superagent from 'superagent';
// import './normalize.css';
// import style from './App.css';

import LoginSignup from '../01LoginSignup/LoginSignup.jsx';
import TestLogin from '../TestLogin/TestLogin.jsx';
import Logout from '../01Logout/Logout.jsx';
import './App.css';



class App extends Component {


  constructor() {
    super();

    this.state = {

      address: 'time square address',
      loginFormUsername: '',
      loginFormPassword: '',
      signupFormUsername: '',
      signupFormPassword: '',
      currentToken: '',

    };
  }

  showLogin() {
    let showLogin = document.querySelector('#loginSignup');
    showLogin.style.display = 'block';
    console.log(showLogin);
  }

  hideLogin() {
    let showLogin = document.querySelector('#loginSignup');
    showLogin.style.display = 'none';
  }

  trackLoginUsername(e) {
    this.setState({
      loginFormUsername: e.target.value
    })
  }

  trackLoginPassword(e) {
    this.setState({
      loginFormPassword: e.target.value
    })
  }

  trackSignupUsername(e) {
    this.setState({
      signupFormUsername: e.target.value
    })
    console.log(e.target.value)
  }

  trackSignupPassword(e) {
    this.setState({
      signupFormPassword: e.target.value
    })
    console.log(e.target.value)
  }

  postSignup() {
    console.log(this.state.signupFormUsername, this.state.signupFormPassword)
    return fetch('/user/signup', {
      headers: {
        'Content-Type': 'application/JSON'
      },
      method: 'POST',
      body: JSON.stringify({
        'username': this.state.signupFormUsername,
        'password': this.state.signupFormPassword
      })
    })
    .then(() => {
      console.log('signedup')
    });
  }

  postLogin() {
    return fetch('/user/login', {
      headers: {
        'Content-Type': 'application/JSON'
      },
      method: 'POST',
      body: JSON.stringify({
        'username': this.state.loginFormUsername,
        'password': this.state.loginFormPassword
      })
    })
    .then(r => r.json())
    .then((data) => {
      this.setState({
        currentToken: data
      })
    })
    .then( () => {
      console.log('wtf', this.state.currentToken)
    })
    .catch(error => console.log(error))
  }

  logout() {
    console.log('logging out')
    this.setState({
      currentToken: '',
    })
    console.log('logged out')
  }

  testLogin() {
    return fetch('/api/items', {
      headers: {
        'Content-Type': 'application/JSON',
        'Authorization': 'Bearer ' + this.state.currentToken
      },
    })
    .then(r=> r.json())
    .then((data) => {
      console.log(data)
    })
    .catch(error => console.log(error))

  }


   // componentWillMount() {
   //   const head = document.getElementsByTagName('head')[0];
   //   const script = document.createElement("script");

   //    script.type = 'text/javascript';
   //    // script.className = 'container';

   //    script.src = "http://maps.google.com/maps/api/js?key=AIzaSyDu1zOGCMJEMn2Ja45WRuyWFN_Rv7ZSh3c";
   //    // script.async= true;
   //    // script.defer= true;
   //    console.log(script)
   //    head.appendChild(script);
   //    console.log(head)
   //    // script.onload = () => {
   //    //     console.log(document.querySelector('.container'));
   //    //     ReactDOM.render( <script />,
   //    //       document.querySelector('.container')
   //    //     );
   //    // };

   //  // console.log(script)
   //  }



  render(){

    const location = {
      lat: 40.7575285,
      lng: -73.9884469
    }
//Below is where you create your pins/markers
    const markers = [
      {
        location:{
          lat: 40.7575285,
          lng: -73.9884469
        }
      }
    ]

    // const script = document.querySelector('.container');

    // script.onload = () => {
    //       console.log(document.querySelector('.container'));
    //       ReactDOM.render( <script />,
    //         document.querySelector('.container')
    //       );
    //   };

    // const body = document.getElementsByTagName('body');

    // body.onload = () => {
    //       console.log(document.querySelector('.container'));
    //       componentWillMount();
    //   };

    return (
      <div>

        <div style={{width:300, height:600, background: 'pink'}}>

          <saveMap
            center={location}
            markers={markers}
          />

        </div>

        <header>
          <h1>Grojj.</h1>
          <button onClick={this.showLogin}>Login or Sign Up</button>
          <Logout
            logout={this.logout.bind(this)}
          />
          <nav>
            <div className="nButton">Search
              <input type="text" placeholder="search"/>
              <button>Go!</button>
            </div>
            <div className="nButton">myStoreFront</div>
            <div className="nButton">Messages</div>
              <LoginSignup
                hideLogin={this.hideLogin}
                trackLoginUsername={this.trackLoginUsername.bind(this)}
                trackLoginPassword={this.trackLoginPassword.bind(this)}
                trackSignupUsername={this.trackSignupUsername.bind(this)}
                trackSignupPassword={this.trackSignupPassword.bind(this)}
                postLogin={this.postLogin.bind(this)}
                postSignup={this.postSignup.bind(this)}
              />
          </nav>


        </header>
        <main>
        <script> </script>



          <TestLogin
            testLogin={this.testLogin.bind(this)}
          />
        </main>

        <footer>
          <div>copyright nonsense, about us</div>
        </footer>

      </div>

      )
  }
}


export default App;


