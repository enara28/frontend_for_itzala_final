import React, { Component } from "react";
import { Link } from "react-router";
import axios from "axios";

export default class SignIn extends Component {
    constructor() {
        super();

        this.state = {
            usuario: "",
            contraseña: "",
            email: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmitClick(event) {
        axios
            .post("http://localhost:5000/usuario", {
                usuario: this.state.usuario,
                email: this.state.email,
                contraseña: this.state.contraseña,
            })
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        event.preventDefault();
    }

    render() {
        return (
            <div className="log-sign-in-container-wrapper">
                <div className="log-sign-in-container">
                    <div className="log-sign-in-title">
                        Enter a username, an email and a password
                    </div>
                    <form
                        onSubmit={this.handleSubmitClick}
                        className="form-group-wrapper"
                    >
                        <div className="form-group">
                            <input
                                type="usuario"
                                name="usuario"
                                placeholder="Usuario"
                                value={this.state.usuario}
                                onChange={this.handleChange}
                                autoComplete="on"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                autoComplete="on"
                            />

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
                                Sign In
                            </button>
                        </div>
                    </form>
                    <div className="log-sign-in-link">
                        <Link to="/log-in">Log-in to an existing account</Link>
                    </div>
                </div>
            </div>
        );
    }
}
