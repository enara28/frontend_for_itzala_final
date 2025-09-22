import React, {Component} from "react"
import axios from "axios";

import Header from './header';
import Footer from "./footer";

export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
            users: {},
            user: {},
            user_id: 2
        }
    }


    get_all_users() {
        axios.get(`http://localhost:5000/users`)
        .then(response => {
            this.setState({
                users: response.data
            }), console.log(response.data)
        })
        .catch(err => console.log("error mio", err))
    }

    get_user_profile() {
        axios.get(`http://localhost:5000/user/${this.state.user_id}`)
        .then(response => {
            this.setState({
                userr: response.data
            }), console.log(response.data)
        })
        .catch(err => console.log("error mio", err))
    }

    componentDidMount() {
        this.get_all_users()
    }

    render() {
        
        // let username, email, password = this.state.users

        return(
            <div>
                <Header />
                <div className="general-body">
                    <div>You are in the profile page</div>
                    <div className="personal-info-wrapper">
                        <div className="name">
                            Username: {this.state.users.username}
                        </div>
                        <div className="email">
                            Email: {this.state.users.email}
                        </div>
                        <div className="address">
                            Optionally adress goes here
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}