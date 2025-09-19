import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class Header extends Component {
    render() {
        return (
            <div className="header-container-wrapper">
                <div className="logo-wrapper">
                    <Link to="/">Logo goes here</Link>
                </div>
                <div className="profile-wrapper">
                    <Link to="/profile">Profile</Link>
                </div>
                <div className="log-in-wrapper">
                    <Link to="/log-in">Log in</Link>
                </div>
            </div>
        )
    }
}