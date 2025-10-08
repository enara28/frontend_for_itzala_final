import React, { Component } from "react";
import axios from "axios";

import User from "./user";
import PedidoUsuario from "./pedido-usuario";

export default class PerfilUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleUser: [],
            pedidos: [],
        };
    }

    obtenerPerfil() {
        axios
            .get(`http://localhost:5000/usuario/${this.props.usuarioId}`, {
                withCredentials: true,
            })
            .then((response) => {
                this.setState({
                    singleUser: response.data,
                }),
                    console.log(response.data);
            })
            .catch((err) => console.log("error mio", err));
    }

    obtenerPedidos() {
        axios
            .get(`http://localhost:5000/pedido/${this.props.usuarioId}`)
            .then((response) => {
                this.setState({
                    pedidos: response.data,
                }),
                    console.log(response.data);
            })
            .catch((err) => console.log("error mio", err));
    }

    componentDidMount() {
        if (this.props.status == "usuario") {
            this.obtenerPerfil();
            this.obtenerPedidos();
        }
    }

    mostrarPedidos() {
        return this.state.pedidos.map((pedido) => {
            return <PedidoUsuario key={pedido.id} pedido={pedido} />;
        });
    }

    render() {
        return (
            <div className="profile-container-wrapper">
                <div className="profile-container">
                    <div className="personal-info-wrapper">
                        <div className="user-info-container">
                            <User user={this.state.singleUser} />
                        </div>
                        <div className="pedidos-wrapper">
                            <div className="pedidos-title">
                                Pedidos realizados:
                            </div>
                            <div className="pedidos-content">
                                {this.mostrarPedidos()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
