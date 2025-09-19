import React, {Component} from 'react';
import {Route, Routes} from "react-router"

import Home from './home';
import About from './about';
import Profile from './profile';
import LogIn from './log-in';
import Pedido from './pedido';



export default class App extends Component {
  render() {
    return (
      <div className="app">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/log-in" element={<LogIn/>} />
              <Route path="/pedido" element={<Pedido/>} />
            </Routes>
      </div>
    );
  }
}
