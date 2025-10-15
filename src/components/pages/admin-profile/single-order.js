import React, { Component } from "react";

export default class SingleOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            desplegado: false,
        };

        this.openDropDown = this.openDropDown.bind(this);
        this.closeDropDown = this.closeDropDown.bind(this);
    }

    trimOrders() {
        let trimed_order = this.props.order.order.split(",");
        return trimed_order.map((el, idx) => (
            <div key={idx} className="single-order-element">
                {el}
            </div>
        ));
    }
    // ver cómo desplegar uno por uno
    openDropDown() {
        this.setState({
            desplegado: true,
        });
    }

    closeDropDown() {
        this.setState({
            desplegado: false,
        });
    }

    render() {
        return (
            <div className="single-order-container">
                <div
                    className="single-order-title"
                    onClick={
                        this.state.desplegado == false
                            ? () => this.openDropDown()
                            : () => this.closeDropDown()
                    }
                >
                    Pedido nº {this.props.order.id}:
                </div>
                <div className="single-order-content">
                    {this.state.desplegado == true ? this.trimOrders() : null}
                </div>
            </div>
        );
    }
}
