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
            .post("http://localhost:5000/user", {
                user: this.state.user,
                email: this.state.email,
                password: this.state.password,
            })
            .then((response) => {
                console.log(response);
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
                        console.log(response, "success");
                        this.props.navigation("/");
                    })
                    .catch((error) => {
                        console.log(error.response.data.msg, "error");
                    });
            })
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
                        <Link to="/log-in">Log-in to an existing account</Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default withNavigation(SignIn);
