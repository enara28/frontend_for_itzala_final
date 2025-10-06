import React, { Component } from "react";

export default class PedidoUsuario extends Component {
    constructor(props) {
        super(props);
    }
    recortarPedidos() {
        return this.props.pedidos.map((p) => {
            let pedido_recortado = p.pedido.split(",");
            return pedido_recortado.map((el) => (
                <div className="elemento-pedido">{el}</div>
            ));
        });
    }
    generarLista() {
        return this.props.pedidos.map((p) => {
            return (
                <div>
                    <div>Pedido nº {p.id}:</div>
                    {this.recortarPedidos()}
                </div>
            );
        });
    }
    render() {
        return <div>{this.generarLista()}</div>;
    }
}
