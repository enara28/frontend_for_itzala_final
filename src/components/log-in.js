import React, { Component } from "react";
import { Link, useNavigate } from "react-router";
import Axios from "axios";
import withNavigation from "./withNavigation";

import Header from "./header";
import Footer from "./footer";

class LogIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            contraseña: "",
            errorText: "",
            usuarioId: "",
            status: "",
            loggedIn: "NO_LOGGED_IN",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: "",
        });
    }

    handleSubmit(event) {
        Axios.post(
            "http://localhost:5000/login",
            {
                email: this.state.email,
                contraseña: this.state.contraseña,
            },
            { withCredentials: true }
        )
            .then((response) => {
                this.setState({
                    usuarioId: response.data.usuario_id,
                    status: response.data.status,
                    loggedIn: response.data.logged_in,
                });
                this.props.handleSuccessfullLogin(response.data);
                console.log(response, "success");
                this.props.navigation("/");
            })
            .catch((error) => {
                this.setState({
                    errorText: "An error occurred",
                });
                console.log(error, "error");
            });
        event.preventDefault();
    }

    render() {
        return (
            <div className="gen">
                <Header />
                <div className="general-body">
                    <div>Introduce tu email y tu contraseña</div>
                    {/* <div>{this.state.errorText}</div> */}
                    <form
                        onSubmit={this.handleSubmit}
                        className="form-group-wrapper"
                    >
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                autoComplete="on"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="contraseña"
                                name="contraseña"
                                placeholder="Constraseña"
                                value={this.state.contraseña}
                                onChange={this.handleChange}
                                autoComplete="on"
                            />
                        </div>

                        <div>
                            <button type="submit" className="btn">
                                Login
                            </button>
                        </div>
                    </form>
                    <Link to="/sign-in">Create an account</Link>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withNavigation(LogIn);
