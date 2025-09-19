import React, { Component } from "react"

import Header from './header';
import Footer from "./footer";
import Buttons from './buttons';

export default class Home extends Component {
  render() {
    return (
      <div className='home'>
        <Header />
        <Buttons />
        <Footer />
      </div>
    );
  }
}