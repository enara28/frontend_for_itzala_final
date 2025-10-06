import React, { Component } from "react";
import { Link } from "react-router";
import logo from "../assets/logo/logo-512x512.png";

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    cerrarSesion() {
        // lógica para cerrar sesión
        cookieStore.delete(access_token_cookie);
    }

    render() {
        return (
            <div className="header-container-wrapper">
                <div className="logo-wrapper">
                    <Link title="Inicio" to="/">
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
                        {this.props.loggedIn == "NO_LOGGED_IN" ? (
                            <Link to="/log-in">Iniciar sesión</Link>
                        ) : (
                            <Link to="/" onClick={() => this.cerrarSesion()}>
                                Cerrar sesión
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
