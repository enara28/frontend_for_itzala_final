import React, {Component} from "react"
import axios from "axios";

import Header from './header';
import Footer from "./footer";

export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
            users: {}
        }
    }

    get_info() {
        axios.get("localhost:5000/users")
        .then(response => {
            // this.setState({
            //     users: response.data
            // })
            console.log(response.data)
        })
        .catch(err => console.log("error mio", err))
    }

    render() {
        return(
            <div>
                <Header />
                <div>You are in the profile page</div>
                {this.get_info()}
                <Footer />
            </div>
        )
    }
}