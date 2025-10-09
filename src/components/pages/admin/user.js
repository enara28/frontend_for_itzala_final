import React, { Component } from "react";

export default class User extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { usuario, email, id } = this.props.user;

        return (
            <div className="single-user-reservations-container">
                <div className="single-user-reservations-title">
                    Información del usuario nº {id}:
                </div>
                <div className="single-user-reservations-content">
                    <div className="username">
                        <b>Usuario:</b> {usuario}
                    </div>
                    <div className="email">
                        <b>Email:</b> {email}
                    </div>
                </div>
            </div>
        );
    }
}
