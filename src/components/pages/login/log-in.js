import React, { Component } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import withNavigation from "../../helpers/withNavigation";

class LogIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorText: "",
            userId: "",
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
                    userId: response.data.usuario_id,
                    status: response.data.status,
                    loggedIn: response.data.logged_in,
                    email: "",
                    password: "",
                });
                this.props.handleSuccessfullLogin(response.data);
                console.log(response, "success");
                this.props.navigation("/");
            })
            .catch((error) => {
                this.setState({
                    errorText: error.response.data.msg,
                });
            });
        event.preventDefault();
    }

    render() {
        return (
            <div className="log-sign-in-container-wrapper">
                <div className="log-sign-in-container">
                    <div className="log-sign-in-title">
                        Introduce tu email y tu contraseña
                    </div>
                    {this.state.errorText != "" ? (
                        <div>{this.state.errorText}</div>
                    ) : null}
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
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="log-sign-in-link">
                        <Link to="/sign-in">Create an account</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withNavigation(LogIn);
