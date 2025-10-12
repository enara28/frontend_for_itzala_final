import React, { Component } from "react";
import { Route, Routes } from "react-router";
import axios from "axios";

import Home from "./pages/home/home";
import About from "./pages/about/about";
import PerfilUsuario from "./pages/userProfile/perfil-usuario";
import LogIn from "./pages/login/log-in";
import Order from "./pages/order/order";
import SignIn from "./pages/signin/sign-in";
import Admin from "./pages/admin/admin";
import Header from "./header";
import Footer from "./footer";

// Añadir lógica que te lleve a Log in

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: "",
            userId: "",
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
                    userId: response.data.usuario_id,
                    loggedIn: response.data.logged_in,
                });
                console.log(response);
            })
            .catch((error) => console.log(error));
    }

    handleSuccessfullLogin(data) {
        const { usuario_id, status, logged_in } = data;
        this.setState({
            userId: usuario_id,
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
                                userId={this.state.userId}
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
                        element={
                            <SignIn
                                loggedIn={this.state.loggedIn}
                                handleSuccessfullLogin={
                                    this.handleSuccessfullLogin
                                }
                            />
                        }
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
                                    userId={this.state.userId}
                                    status={this.state.status}
                                    loggedIn={this.state.loggedIn}
                                />
                            }
                        />
                    ) : null}

                    <Route
                        path="/order"
                        element={
                            <Order
                                userId={this.state.userId}
                                status={this.state.status}
                                loggedIn={this.state.loggedIn}
                            />
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Home
                                status={this.state.status}
                                loggedIn={this.state.loggedIn}
                                userId={this.state.userId}
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
