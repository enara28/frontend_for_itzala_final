import React, {Component} from 'react';
import {Route, Routes} from "react-router"
import axios from 'axios';
import history from "history/browser";

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
      status: "",
      loggedIn: "NO_LOGGED_IN"
    }

    this.handleSuccessfullLogin = this.handleSuccessfullLogin.bind(this)
  }

  verifyUser() {
    axios.get("http://localhost:5000/verify", {withCredentials: true}).then(
      response => this.setState({status: response.data.status, usuarioId: response.data.usuario_id})
    )
  }

  handleSuccessfullLogin(data) {
    const {usuario_id, status, logged_in} = data
    this.setState({
      usuarioId: usuario_id,
      status: status,
      loggedIn: logged_in
    })
  }

  componentDidMount() {
    this.verifyUser()
  }

  render() {
    return (
      <div className="app">
            <Routes>
              <Route exact path="/" element={<Home status={this.state.status} />} />
              <Route path="/about" element={<About/>} />
              <Route path="/log-in" element={<LogIn handleSuccessfullLogin={this.handleSuccessfullLogin} />} />
              <Route path="/sign-in" element={<SignIn/>} />
              {this.state.status == "admin" ? 
                <Route path="/admin" element={<Admin status={this.state.status}/>} /> :
                this.state.status == "usuario" ? 
                <Route path="/profile" element={<Profile usuarioId={this.state.usuarioId} status={this.state.status}/>} /> : "error"
              }
              <Route path="/pedido" element={<Pedido/>} />
            </Routes>
      </div>
    );
  }
}

// {"src":"/android-chrome-192x192.png","sizes":"192x192","type":"image/png"} guardado por si acaso de site.webmanifest