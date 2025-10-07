import React, { Component } from "react";
import { Link } from "react-router";
import logo from "../assets/logo/logo-512x512.png";
import axios from "axios";
import withNavigation from "./withNavigation";

class Header extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     loggedIn: this.props.loggedIn,
        // };
        this.cerrarSesion = this.cerrarSesion.bind(this);
    }

    cerrarSesion() {
        axios
            .post("http://localhost:5000/logout", {}, { withCredentials: true })
            .then(
                (response) => console.log(response),
                this.props.navigation("/")
            )
            .catch((error) => console.log(error));
        this.props.handleSuccessfullLogout();
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
                        {this.props.loggedIn == "LOGGED_IN" &&
                        this.props.status &&
                        this.props.status == "usuario" ? (
                            <Link to="/profile">Profile</Link>
                        ) : this.props.loggedIn == "LOGGED_IN" &&
                          this.props.status &&
                          this.props.status == "admin" ? (
                            <Link to="/admin">Admin</Link>
                        ) : null}
                    </div>
                    <div className="log-in-wrapper">
                        {this.props.loggedIn == "NO_LOGGED_IN" ? (
                            <Link to="/log-in">Iniciar sesión</Link>
                        ) : this.props.loggedIn == "LOGGED_IN" ? (
                            <Link to="/" onClick={() => this.cerrarSesion()}>
                                Cerrar sesión
                            </Link>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default withNavigation(Header);
