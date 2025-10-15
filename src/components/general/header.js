import React, { Component } from "react";
import { Link } from "react-router";
import logo from "../../assets/logo/logo-512x512.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightToBracket,
    faArrowRightFromBracket,
    faUser,
    faHammer,
    faHandshake,
} from "@fortawesome/free-solid-svg-icons";

import withNavigation from "../helpers/withNavigation";

class Header extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     loggedIn: this.props.loggedIn,
        // };
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        axios
            .post("http://localhost:5000/logout", {}, { withCredentials: true })
            .then(
                (response) => console.log(response),
                this.props.navigation("/")
            )
            .catch((error) => console.log("header logOut error", error));
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

                <div className="header-links-container">
                    <div className="header-about-link">
                        <Link to="/about">
                            <div className="header-buttons">
                                <div className="big-screen">Conócenos</div>
                                <div className="small-screen">
                                    <FontAwesomeIcon icon={faHandshake} />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="header-profile-admin-link">
                        {this.props.loggedIn == "LOGGED_IN" &&
                        this.props.status &&
                        this.props.status == "user" ? (
                            <Link to="/profile">
                                <div className="header-buttons">
                                    <div className="big-screen">Perfil</div>
                                    <div className="small-screen">
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                </div>
                            </Link>
                        ) : this.props.loggedIn == "LOGGED_IN" &&
                          this.props.status &&
                          this.props.status == "admin" ? (
                            <Link to="/admin">
                                <div className="header-buttons">
                                    <div className="big-screen">Admin</div>
                                    <div className="small-screen">
                                        <FontAwesomeIcon icon={faHammer} />
                                    </div>
                                </div>
                            </Link>
                        ) : null}
                    </div>
                    <div className="header-log-in-out-wrapper">
                        {this.props.loggedIn == "NO_LOGGED_IN" ? (
                            <Link to="/log-in">
                                <div className="header-buttons">
                                    <div className="big-screen">
                                        Iniciar sesión
                                    </div>
                                    <div className="small-screen">
                                        <FontAwesomeIcon
                                            icon={faArrowRightToBracket}
                                        />
                                    </div>
                                </div>
                            </Link>
                        ) : this.props.loggedIn == "LOGGED_IN" ? (
                            <Link to="/" onClick={() => this.logOut()}>
                                <div className="header-buttons">
                                    <div className="big-screen">
                                        Cerrar sesión
                                    </div>
                                    <div className="small-screen">
                                        <FontAwesomeIcon
                                            icon={faArrowRightFromBracket}
                                        />
                                    </div>
                                </div>
                            </Link>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default withNavigation(Header);
