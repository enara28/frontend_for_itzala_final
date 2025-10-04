import React, { Component } from "react";
import { Link } from "react-router";
import logo from "../assets/logo/logo-512x512.png";

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header-container-wrapper">
                <div className="logo-wrapper">
                    <Link to="/">
                        <img src={logo} />
                    </Link>
                </div>
                <div className="links-container">
                    <div className="profile-wrapper">
                        {this.props.status && this.props.status == "usuario" ? (
                            <Link to="/profile">Profile</Link>
                        ) : this.props.status &&
                          this.props.status == "admin" ? (
                            <Link to="/admin">Admin</Link>
                        ) : null}
                    </div>
                    <div className="log-in-wrapper">
                        <Link to="/log-in">Iniciar sesión</Link>
                    </div>
                </div>
            </div>
        );
    }
}
