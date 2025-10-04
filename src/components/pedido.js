import React, { Component } from "react";

import Header from "./header";
import Footer from "./footer";
import Menu from "./menu";

export default class Pedido extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="pedidos">
                <Header />
                <div className="general-body">
                    <div className="pedido-wrapper">
                        <div>Realiza aquí tu pedido</div>
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
