import React, { Component } from "react";
import axios from "axios";

import SingleUser from "./single-user";
import SingleOrder from "./single-order";
import SingleReservation from "./single-reservation";

export default class Perofile extends Component {
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
            .get(`http://localhost:5000/user/${this.props.userId}`, {
                withCredentials: true,
            })
            .then((response) => {
                this.setState({
                    singleUser: response.data,
                });
            })
            .catch((error) => console.log("profile getProfile error", error));
    }

    getOrders() {
        axios
            .get(`http://localhost:5000/order/${this.props.userId}`)
            .then((response) => {
                this.setState({
                    orders: response.data,
                });
            })
            .catch((error) => console.log("profile getOrders error", error));
    }

    getReservations() {
        axios
            .get(`http://localhost:5000/reservation/${this.props.userId}`)
            .then((response) => {
                this.setState({
                    reservations: response.data,
                });
            })
            .catch((error) =>
                console.log("profile getReservations error", error)
            );
    }

    componentDidMount() {
        if (this.props.status == "user") {
            this.getProfile();
            this.getOrders();
            this.getReservations();
        }
    }

    showOrders() {
        return this.state.orders.map((order) => {
            return <SingleOrder key={order.id} order={order} />;
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
                        <SingleUser user={this.state.singleUser} />
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
