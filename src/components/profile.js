import React, { Component } from "react";
import axios from "axios";

import User from "./user";
import PedidoUsuario from "./pedido-usuario";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleUser: [],
            pedidos: [],
        };
    }

    get_user_profile() {
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

    get_pedidos() {
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
            this.get_user_profile();
            this.get_pedidos();
        }
    }

    singleUserInfo() {
        return <User user={this.state.singleUser} />;
    }

    render() {
        return (
            <div className="perfil-container-wrapper">
                <div className="perfil-container">
                    <div className="personal-info-wrapper">
                        <div className="user-info-container">
                            {this.singleUserInfo()}
                        </div>
                        <div className="pedidos-wrapper">
                            <div className="pedidos-title">
                                Pedidos realizados:
                            </div>
                            <PedidoUsuario pedidos={this.state.pedidos} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
