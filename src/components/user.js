import React, { Component } from "react";

export default class User extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { usuario, email, id } = this.props.user;

        return (
            <div>
                <div className="user-title">
                    Información del usuario nº {id}:
                </div>
                <div className="user-content">
                    <div className="username">Usuario: {usuario}</div>
                    <div className="email">Email: {email}</div>
                </div>
            </div>
        );
    }
}
