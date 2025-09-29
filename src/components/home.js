import React, { Component } from "react"

import Header from './header';
import Footer from "./footer";
import Buttons from './buttons';

export default class Home extends Component {
  
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className='home'>
        <Header status={this.props.status}/>
        <Buttons />
        <Footer />
      </div>
    );
  }
}