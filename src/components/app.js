import React, { Component } from "react";
import { Route, Routes } from "react-router";
import axios from "axios";

import Home from "./pages/home/home";
import About from "./pages/about/about";
import Profile from "./pages/admin-profile/profile";
import LogIn from "./pages/login/log-in";
import Order from "./pages/order/order";
import SignIn from "./pages/signin/sign-in";
import Admin from "./pages/admin-profile/admin";
import Header from "./general/header";
import Footer from "./general/footer";

// Añadir lógica que te lleve a Log in
// TODOs => revisar los post axios para evitar mandar elementos que rompan la app
// Añadir ciclo de vida que refresque la página al actualizar elementos del menú

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: "", // revisar si se está usando
            userId: "",
            status: "",
            loggedIn: "NO_LOGGED_IN",
        };

        this.handleSuccessfullLogin = this.handleSuccessfullLogin.bind(this);
    }

    verifyUser() {
        axios
            .get("https://enara28.pythonanywhere.com/verify", {
                withCredentials: true,
            })
            .then((response) => {
                this.setState({
                    status: response.data.status,
                    userId: response.data.user_id,
                    loggedIn: response.data.logged_in,
                });
            })
            .catch((error) => {
                console.log("app verifyUser error", error);
                this.setState({
                    errorMessage: "Ha habido un error por nuestra parte",
                });
            });
    }

    handleSuccessfullLogin(data) {
        const { user_id, status, logged_in } = data;
        this.setState({
            userId: user_id,
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
                {this.state.errorMessage ? (
                    <div>{this.state.errorMessage}</div>
                ) : null}
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
                    ) : this.state.status == "user" ? (
                        <Route
                            path="/profile"
                            element={
                                <Profile
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
