import React, {Component} from "react"
import axios from "axios";

import Header from './header';
import Footer from "./footer";
import User from "./user";

export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
            singleUser: [],
            user_id: 2
        }
    }


    

    get_user_profile() {
        axios.get(`http://localhost:5000/usuario/${this.state.user_id}`, {withCredentials: true})
        .then(response => {
            this.setState({
                singleUser: response.data
            }), console.log(response.data)
        })
        .catch(err => console.log("error mio", err))
    }

    componentDidMount() {
        this.get_user_profile()
    }

    singleUserInfo() {
        return <User user={this.state.singleUser} />;
    }
    // Insertar lógica que distinga entre administrador y cliente para mostrar el perfil personal o todos.
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