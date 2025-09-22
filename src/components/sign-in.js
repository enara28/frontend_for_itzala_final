import React, {Component} from "react";

import Header from './header';
import Footer from "./footer";
import { Link } from "react-router";

export default class SignIn extends Component {
    constructor() {
        super()

        // this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSubmitClick = this.handleSubmitClick.bind(this)
    }

    // handleSubmit(){
    //     console.log("for submit")
    // }

    handleSubmitClick() {
        // this.handleSubmit()
        console.log("click")
    }

    render() {
        return(
            <div>
                <Header />
                <div className="general-body">
                    <div>Enter a username, an email and a password</div>
                    <form>
                        <input placeholder="username" />
                        <input type="email" placeholder="email" />
                        <input type="password" placeholder="password" />
                    </form>
                    <button onClick={() => this.handleSubmitClick()}>Sign-in</button>
                    <Link to="/log-in">Log-in to an existing account</Link>
                </div>
                <Footer />
            </div>
        )
    }
}