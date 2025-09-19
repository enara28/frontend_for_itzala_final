import React, {Component} from "react";

import Header from './header';
import Footer from "./footer";

export default class LogIn extends Component {
    constructor() {
        super()
    }

    render() {
        return(
            <div>
                <Header />
                    <div>You are in the log in page</div>
                <Footer />
            </div>
        )
    }

}