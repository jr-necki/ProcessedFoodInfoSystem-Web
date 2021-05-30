import React, { Component } from 'react';
import Router from './Router';
import GlobalStyle from './GlobalStyle';
import axios from 'axios';

class App extends Component {
  componentWillMount() {
    axios({
      url: 'http://13.124.55.59:8080/login',
      method: 'POST',
      data: {
        email: localStorage.getItem('userLoginEmail'),
        password: localStorage.getItem('userLoginPassword'),
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Create New Token');
        localStorage.setItem('authorization', response.headers.authorization);
        console.log(localStorage.getItem('authorization'));
      })
      .catch((error) => {
        const status = error.response.status;
        console.log(status);
        localStorage.setItem('authorization', 'null');
      });
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <Router />
      </>
    );
  }
}
export default App;
