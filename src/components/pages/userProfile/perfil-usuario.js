import React, { Component } from "react";
import axios from "axios";

import User from "../admin/user";
import PedidoUsuario from "./pedido-usuario";
import SingleReservation from "../admin/single-reservation";

export default class PerfilUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleUser: [],
            orders: [],
            reservations: [],
        };
    }

    getProfile() {
        axios
            .get(`http://localhost:5000/usuario/${this.props.userId}`, {
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

    getOrders() {
        axios
            .get(`http://localhost:5000/pedido/${this.props.userId}`)
            .then((response) => {
                this.setState({
                    orders: response.data,
                }),
                    console.log(response.data);
            })
            .catch((err) => console.log("error mio", err));
    }

    getReservations() {
        axios
            .get(`http://localhost:5000/reservation/${this.props.userId}`)
            .then((response) => {
                this.setState({
                    reservations: response.data,
                }),
                    console.log(response.data);
            })
            .catch((err) => console.log("error mio", err));
    }

    componentDidMount() {
        if (this.props.status == "usuario") {
            this.getProfile();
            this.getOrders();
            this.getReservations();
        }
    }

    showOrders() {
        return this.state.orders.map((pedido) => {
            return <PedidoUsuario key={pedido.id} pedido={pedido} />;
        });
    }

    showReservations() {
        return this.state.reservations.map((reservation) => {
            return (
                <SingleReservation
                    key={reservation.id}
                    reservation={reservation}
                />
            );
        });
    }

    render() {
        return (
            <div className="profile-container-wrapper">
                <div className="profile-container">
                    <div className="user-info-container">
                        <User user={this.state.singleUser} />
                    </div>
                    <div className="orders-reservations-info-container">
                        <div className="orders-reservations-title">
                            Pedidos realizados:
                        </div>
                        <div className="orders-reservations-content">
                            {this.showOrders()}
                        </div>
                    </div>
                    <div className="orders-reservations-info-container">
                        <div className="orders-reservations-title">
                            Reservas realizadas:
                        </div>
                        <div className="orders-reservations-content">
                            {this.showReservations()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
