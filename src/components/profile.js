import React, {Component} from "react"
import axios from "axios";

import Header from './header';
import Footer from "./footer";
import User from "./user";

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            singleUser: []
        }
    }

    get_user_profile() {
        axios.get(`http://localhost:5000/usuario/${this.props.usuarioId}`, {withCredentials: true})
        .then(response => {
            this.setState({
                singleUser: response.data
            }), console.log(response.data)
        })
        .catch(err => console.log("error mio", err))
    }

    componentDidMount() {
        if (this.props.status == "usuario"){
            this.get_user_profile()
        }
    }

    singleUserInfo() {
        return <User user={this.state.singleUser} />;
    }
    render() {
        return(
            <div>
                <Header />
                <div className="general-body">
                    <div className="personal-info-wrapper">
                        <div className="user-info">
                            {this.singleUserInfo()}
                        </div> 
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}