import React, { Component } from "react";

import Menu from "../modal/menu";

export default class Order extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="order-container-wrapper">
                <div className="order-container">
                    <div className="order-title">Realiza aquí tu pedido</div>
                    <Menu location={"order"} usuarioId={this.props.usuarioId} />
                </div>
            </div>
        );
    }
}
