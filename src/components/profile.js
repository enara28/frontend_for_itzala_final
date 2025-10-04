import React, { Component } from "react";
import axios from "axios";

import Header from "./header";
import Footer from "./footer";
import User from "./user";

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
        let pedido = this.state.pedidos.map((el) => (
            <div key={el.id}>
                Pedido nº{el.id}: {el.pedido}
            </div>
        ));
        return (
            <div>
                <Header />
                <div className="general-body">
                    <div className="personal-info-wrapper">
                        <div className="user-info">{this.singleUserInfo()}</div>
                        <div>
                            {/* {this.state.pedidos.map((el) => {
                                return `Pedido: 
                                ${el.pedido}`;
                            })} */}
                            {pedido}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
