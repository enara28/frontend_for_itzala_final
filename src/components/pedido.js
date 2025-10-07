import React, { Component } from "react";

import Menu from "./menu";

export default class Pedido extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pedidos">
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
            </div>
        );
    }
}
