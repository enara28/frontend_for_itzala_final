import React, {Component} from 'react';
import {Route, Routes} from "react-router"
import axios from 'axios';

import Home from './home';
import About from './about';
import Profile from './profile';
import LogIn from './log-in';
import Pedido from './pedido';
import SignIn from './sign-in';
import Admin from './admin';

// Añadir lógica que te lleve a Log in



export default class App extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      errorText: "",
      usuarioId: "",
      accessToken: "",
      status: "",
      login_data: ""
    }

    this.handleSuccessfullLogin = this.handleSuccessfullLogin.bind(this)
  }

  handleSuccessfullLogin(data) {
    const {usuario_id, access_token, status} = data
    this.setState({
      usuarioId: usuario_id,
      accessToken: access_token,
      status: status
    })
  }

  render() {
    return (
      <div className="app">
            <Routes>
              <Route exact path="/" element={<Home status={this.state.status} />} />
              <Route path="/about" element={<About/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/log-in" element={<LogIn handleSuccessfullLogin={this.handleSuccessfullLogin} />} />
              <Route path="/pedido" element={<Pedido/>} />
              <Route path="/sign-in" element={<SignIn/>} />
              <Route path="/admin" element={<Admin status={this.state.status}/>} />
            </Routes>
      </div>
    );
  }
}
