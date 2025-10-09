import React, { Component } from "react";

export default class PedidoUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            desplegado: false,
        };

        this.deplegar = this.deplegar.bind(this);
        this.cerrar = this.cerrar.bind(this);
    }
    recortarPedidos() {
        let pedido_recortado = this.props.pedido.pedido.split(",");
        return pedido_recortado.map((el, idx) => (
            <div key={idx} className="single-order-element">
                {el}
            </div>
        ));
    }
    // ver cómo desplegar uno por uno
    deplegar() {
        this.setState({
            desplegado: true,
        });
    }

    cerrar() {
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
                            ? () => this.deplegar()
                            : () => this.cerrar()
                    }
                >
                    Pedido nº {this.props.pedido.id}:
                </div>
                <div className="single-order-content">
                    {this.state.desplegado == true
                        ? this.recortarPedidos()
                        : null}
                </div>
            </div>
        );
    }
}
