import React, { Component } from "react"

import Header from './header';
import Footer from "./footer";

export default class About extends Component {
    render() {
        return(
            <div>
                <Header />
                <div>You are in the about page</div>
                <Footer />
            </div>
        )
    }
}