import React, { Component } from "react";
import { Route, Routes } from "react-router";
import axios from "axios";

import Home from "./home";
import About from "./about";
import PerfilUsuario from "./perfil-usuario";
import LogIn from "./log-in";
import Pedido from "./pedido";
import SignIn from "./sign-in";
import Admin from "./admin";
import Header from "./header";
import Footer from "./footer";

// Añadir lógica que te lleve a Log in

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: "",
            usuarioId: "",
            status: "",
            loggedIn: "NO_LOGGED_IN",
        };

        this.handleSuccessfullLogin = this.handleSuccessfullLogin.bind(this);
    }

    verifyUser() {
        axios
            .get("http://localhost:5000/verify", { withCredentials: true })
            .then((response) => {
                this.setState({
                    status: response.data.status,
                    usuarioId: response.data.usuario_id,
                    loggedIn: response.data.logged_in,
                });
                console.log(response);
            })
            .catch((err) => console.log(err));
    }

    handleSuccessfullLogin(data) {
        const { usuario_id, status, logged_in } = data;
        this.setState({
            usuarioId: usuario_id,
            status: status,
            loggedIn: logged_in,
        });
    }

    handleSuccessfullLogout() {
        this.setState({
            loggedIn: "NO_LOGGED_IN",
        });
    }

    componentDidMount() {
        this.verifyUser();
    }

    render() {
        return (
            <div className="app">
                <Header
                    loggedIn={this.state.loggedIn}
                    status={this.state.status}
                    handleSuccessfullLogout={() =>
                        this.handleSuccessfullLogout()
                    }
                />
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <Home
                                status={this.state.status}
                                loggedIn={this.state.loggedIn}
                            />
                        }
                    />
                    <Route
                        path="/about"
                        element={<About />}
                        loggedIn={this.state.loggedIn}
                    />
                    <Route
                        path="/log-in"
                        element={
                            <LogIn
                                handleSuccessfullLogin={
                                    this.handleSuccessfullLogin
                                }
                            />
                        }
                    />
                    <Route
                        path="/sign-in"
                        element={<SignIn loggedIn={this.state.loggedIn} />}
                    />
                    {this.state.status == "admin" ? (
                        <Route
                            path="/admin"
                            element={
                                <Admin
                                    status={this.state.status}
                                    loggedIn={this.state.loggedIn}
                                />
                            }
                        />
                    ) : this.state.status == "usuario" ? (
                        <Route
                            path="/perfil-usuario"
                            element={
                                <PerfilUsuario
                                    usuarioId={this.state.usuarioId}
                                    status={this.state.status}
                                    loggedIn={this.state.loggedIn}
                                />
                            }
                        />
                    ) : (
                        "error"
                    )}
                    <Route
                        path="/pedido"
                        element={
                            <Pedido
                                usuarioId={this.state.usuarioId}
                                status={this.state.status}
                                loggedIn={this.state.loggedIn}
                            />
                        }
                    />
                </Routes>
                <Footer />
            </div>
        );
    }
}

// {"src":"/android-chrome-192x192.png","sizes":"192x192","type":"image/png"} guardado por si acaso de site.webmanifest
