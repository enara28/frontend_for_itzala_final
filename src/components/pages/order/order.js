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
                    <div className="order-title">
                        Los pedidos son para el mismo día
                    </div>
                    <Menu location={"order"} userId={this.props.userId} />
                </div>
            </div>
        );
    }
}
