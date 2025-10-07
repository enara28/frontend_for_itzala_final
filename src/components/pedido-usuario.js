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
        return this.props.pedidos.map((p) => {
            let pedido_recortado = p.pedido.split(",");
            return pedido_recortado.map((el) => (
                <div className="elemento-pedido">{el}</div>
            ));
        });
    }
    // ver cómo desplegar uno por uno
    deplegar() {
        this.setState({
            desplegado: true,
        });
    }

    cerrar(id) {
        this.setState({
            desplegado: false,
        });
    }

    generarLista() {
        return this.props.pedidos.map((p) => {
            return (
                <div>
                    <div
                        className="titulo-deplegable"
                        onClick={
                            this.state.desplegado == false
                                ? () => this.deplegar(p.id)
                                : () => this.cerrar(p.id)
                        }
                        // onMouseLeave={() => this.cerrar()}
                    >
                        Pedido nº {p.id}:
                    </div>
                    {this.state.desplegado == true
                        ? this.recortarPedidos()
                        : null}
                </div>
            );
        });
    }
    render() {
        return <div>{this.generarLista()}</div>;
    }
}
