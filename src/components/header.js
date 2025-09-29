import React, { Component } from "react"
import { Link } from "react-router"
import logo from "../assets/logo/logo-512x512.png"

export default class Header extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className="header-container-wrapper">
                <div className="logo-wrapper">
                    <Link to="/">
                        <img src={logo} />
                    </Link>
                </div>
                {this.props.status && this.props.status == "usuario" ?
                <div className="profile-wrapper"><Link to="/profile">Profile</Link></div>
                : null}
                <div className="log-in-wrapper">
                    <Link to="/log-in">Log in</Link>
                </div>
                {this.props.status && this.props.status == "admin" ?
                <div className="admin-wrapper">
                    <Link to="/admin">Admin</Link>
                </div>
                : null}
            </div>
        )
    }
}