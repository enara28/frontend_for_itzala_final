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

    // get_info() {
    //     axios.get("localhost:5000/users")
    //     .then(response => {
    //         // this.setState({
    //         //     users: response.data
    //         // })
    //         console.log(response.data)
    //     })
    //     .catch(err => console.log("error mio", err))
    // }

    render() {
        return(
            <div>
                <Header />
                <div>You are in the profile page</div>
                <div className="personal-info-wrapper">
                    <div className="name">
                        Name goes here
                    </div>
                    <div className="email">
                        Email goes here
                    </div>
                    <div className="address">
                        Optionally adress goes here
                    </div>
                </div>
                {/* {this.get_info()} */}
                <Footer />
            </div>
        )
    }
}