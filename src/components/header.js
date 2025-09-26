import React, { Component } from "react"
import { Link } from "react-router"
import logo from "../assets/logo/logo-512x512.png"

export default class Header extends Component {
    render() {
        return (
            <div className="header-container-wrapper">
                <div className="logo-wrapper">
                    <Link to="/">
                        <img src={logo} />
                    </Link>
                </div>
                <div className="profile-wrapper">
                    <Link to="/profile">Profile</Link>
                </div>
                <div className="log-in-wrapper">
                    <Link to="/log-in">Log in</Link>
                </div>
                <div className="admin-wrapper">
                    <Link to="/admin">Admin</Link>
                </div>
            </div>
        )
    }
}