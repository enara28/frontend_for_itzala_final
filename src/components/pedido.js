import React, { Component } from "react";

import Header from "./header";
import Footer from "./footer";
import Menu from "./menu";

export default class Pedido extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pedidos">
                <Header
                    status={this.props.status}
                    loggedIn={this.props.loggedIn}
                />
                <div className="general-body">
                    <div className="pedido-wrapper">
                        <div className="pedido-titulo">
                            Realiza aquí tu pedido
                        </div>
                        <Menu
                            lugar={"pedido"}
                            usuarioId={this.props.usuarioId}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
