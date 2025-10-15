import React, { Component } from "react";
import { Link } from "react-router";
import axios from "axios";
import withNavigation from "../../helpers/withNavigation";

class SignIn extends Component {
    constructor() {
        super();

        this.state = {
            user: "",
            password: "",
            email: "",
            errorMessage: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorMessage: "",
        });
    }

    handleSubmitClick(event) {
        event.preventDefault();
        if (
            this.state.user === "" ||
            this.state.email === "" ||
            this.state.password === ""
        ) {
            this.setState({
                errorMessage: "Rellena los compos vacíos",
            });
        } else {
            axios
                .post("http://localhost:5000/user", {
                    user: this.state.user,
                    email: this.state.email,
                    password: this.state.password,
                })
                .then((response) => {
                    axios
                        .post(
                            "http://localhost:5000/login",
                            {
                                email: this.state.email,
                                password: this.state.password,
                            },
                            { withCredentials: true }
                        )
                        .then((response) => {
                            this.setState({
                                user: "",
                                email: "",
                                password: "",
                            });
                            this.props.handleSuccessfullLogin(response.data);
                            alert("Tu cuenta se ha creado con éxito");
                            this.props.navigation("/");
                        })
                        .catch((error) => {
                            console.log(
                                "sign-in handleSubmitClick response error",
                                error
                            ),
                                this.setState({
                                    errorMessage: error.response.data.msg,
                                });
                        });
                    return response;
                })
                .catch((error) => {
                    console.log("sign-in handleSubmitClick error", error),
                        this.setState({
                            errorMessage: error.response.data.msg,
                        });
                });
        }
    }

    render() {
        return (
            <div className="log-sign-in-container-wrapper">
                <div className="log-sign-in-container">
                    <div className="log-sign-in-title">
                        Introduce nombre de usuario, email y contraseña
                    </div>
                    {this.state.errorMessage ? (
                        <div>{this.state.errorMessage}</div>
                    ) : null}
                    <form
                        onSubmit={this.handleSubmitClick}
                        className="form-group-wrapper"
                    >
                        <div className="form-group">
                            <input
                                type="text"
                                name="user"
                                placeholder="Usuario"
                                value={this.state.user}
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
                                type="password"
                                name="password"
                                placeholder="Constraseña"
                                value={this.state.password}
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
                        <Link to="/log-in">Iniciar sesión con otra cuenta</Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default withNavigation(SignIn);
