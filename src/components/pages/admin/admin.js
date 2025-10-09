import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import User from "./user";
import MenuItem from "./menu-item";
import SingleReservation from "./single-reservation";

export default class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            producto: "",
            tiempo: "",
            precio: "",
            errorText: "",
            users: [],
            menu: [],
            newMenuItem: "",
            reservations: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: "",
        });
    }

    handleSubmit(event) {
        axios
            .post(
                "http://localhost:5000/menu-item",
                {
                    producto: this.state.producto,
                    tiempo: this.state.tiempo,
                    precio: this.state.precio,
                },
                { withCredentials: true }
            )
            .then((response) => {
                console.log(response),
                    this.setState({
                        newMenuItem: response.data,
                        producto: "",
                        tiempo: "",
                        precio: "",
                    });
            })
            .catch((error) => console.log(error));
        event.preventDefault();
    }

    getAllUsers() {
        axios
            .get(`http://localhost:5000/usuarios`, { withCredentials: true })
            .then((response) => {
                this.setState({
                    users: response.data.result,
                });
            })
            .catch((err) => console.log("error mio", err));
    }

    getMenuItems() {
        axios
            .get(`http://localhost:5000/menu-item`, { withCredentials: true })
            .then((response) => {
                this.setState({
                    menu: response.data,
                });
            });
    }

    getReservation() {
        axios
            .get("http://localhost:5000/reservation")
            .then((response) => {
                this.setState({
                    reservations: response.data,
                });
                console.log(response);
            })
            .catch((error) => console.log(error));
    }

    reservations() {
        return this.state.reservations.map((reservation) => (
            <SingleReservation key={reservation.id} reservation={reservation} />
        ));
    }

    componentDidMount() {
        if (this.props.status == "admin") {
            this.getAllUsers();
            this.getMenuItems();
            this.getReservation();
        }
    }

    menuItems() {
        return this.state.menu.map((item) => {
            return (
                <MenuItem
                    key={item.id}
                    item={item}
                    newMenuItem={this.state.newMenuItem}
                />
            );
        });
    }

    usersInfo() {
        return this.state.users.map((user) => {
            return <User key={user.id} user={user} />;
        });
    }

    render() {
        return (
            <div className="admin-container-wrapper">
                <div className="admin-container">
                    <div className="admin-users-reservations-info">
                        <div className="admin-users-reservations-info-title">
                            Usuarios registrados:
                        </div>
                        {this.usersInfo()}
                    </div>
                    <div className="admin-menu">
                        <div className="admin-menu-title">Menú</div>
                        {this.menuItems()}
                        {this.state.newMenuItem != "" ? (
                            <div className="admin-menu-item-container">
                                <div className="admin-menu-item">
                                    <div className="menu-item-info">
                                        <div>
                                            <b>Producto:</b>{" "}
                                            {this.state.newMenuItem.producto}
                                        </div>
                                        <div>
                                            <b>Precio:</b>{" "}
                                            {this.state.newMenuItem.precio}
                                        </div>
                                        <div>
                                            <b>Tiempo:</b>{" "}
                                            {this.state.newMenuItem.tiempo}
                                        </div>
                                    </div>
                                    <div>Nuevo producto creado</div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div className="create-new-product-container">
                        <div className="create-new-product-title">
                            Añadir nuevo plato al menú
                        </div>
                        <form
                            className="create-new-product-form"
                            onSubmit={this.handleSubmit}
                        >
                            <input
                                type="text"
                                name="producto"
                                placeholder="Producto"
                                value={this.state.producto}
                                onChange={this.handleChange}
                                autoComplete="on"
                            />
                            <input
                                type="number"
                                name="tiempo"
                                placeholder="Tiempo (1, 2 o 3)"
                                value={this.state.tiempo}
                                onChange={this.handleChange}
                                autoComplete="on"
                            />
                            <input
                                type="number"
                                name="precio"
                                placeholder="Precio"
                                value={this.state.precio}
                                onChange={this.handleChange}
                                autoComplete="on"
                            />
                            <button className="btn" type="submit">
                                Guardar
                            </button>
                        </form>
                    </div>
                    <div className="admin-users-reservations-info">
                        <div className="admin-users-reservations-info-title">
                            Reservas:
                        </div>
                        {this.reservations()}
                    </div>
                </div>
            </div>
        );
    }
}
