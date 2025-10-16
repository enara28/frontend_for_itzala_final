import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import SingleUser from "./single-user";
import MenuItem from "./menu-item";
import SingleReservation from "./single-reservation";
import SingleOrder from "./single-order";

export default class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: "",
            course: "",
            price: "",
            errorMessage: "",
            users: [],
            menu: [],
            orders: [],
            newMenuItem: {},
            reservations: [],
            ["displayusers"]: "admin-users-info-content-hidden",
            ["displaymenu"]: "admin-menu-info-content-hidden",
            ["displayreservations"]: "admin-reservations-info-content-hidden",
            ["displayorders"]: "admin-orders-info-content-hidden",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeClass = this.changeClass.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorMessage: "",
        });
    }

    handleSubmit(event) {
        let checkPrice = () => {
            if (this.state.price < 1) {
                return null;
            } else {
                return this.state.price;
            }
        };
        let checkCourse = () => {
            if (this.state.course > 0 && this.state.course < 4) {
                return this.state.course;
            } else {
                return null;
            }
        };
        let checkProduct = () => {
            if (this.state.product == "") {
                return null;
            } else {
                return this.state.product;
            }
        };
        axios
            .post(
                "https://enara28.pythonanywhere.com/menu-item",
                {
                    product: checkProduct(),
                    course: checkCourse(),
                    price: checkPrice(),
                },
                { withCredentials: true }
            )
            .then((response) => {
                this.setState({
                    newMenuItem: response.data,
                    product: "",
                    course: "",
                    price: "",
                });
            })
            .catch((error) => {
                console.log("admin handleSubmit error", error),
                    this.setState({
                        errorMessage: "Ha habido un error, revisa los datos",
                    });
            });
        event.preventDefault();
    }

    getAllUsers() {
        axios
            .get(`https://enara28.pythonanywhere.com/users`, {
                withCredentials: true,
            })
            .then((response) => {
                this.setState({
                    users: response.data.result,
                });
            })
            .catch((error) => console.log("admin getAllUsers error", error));
    }

    getMenuItems() {
        axios
            .get(`https://enara28.pythonanywhere.com/menu-item`, {
                withCredentials: true,
            })
            .then((response) => {
                this.setState({
                    menu: response.data,
                });
            })
            .catch((error) => console.log("admin getMenuItems error", error));
    }

    getReservation() {
        axios
            .get("https://enara28.pythonanywhere.com/reservation", {
                withCredentials: true,
            })
            .then((response) => {
                this.setState({
                    reservations: response.data,
                });
            })
            .catch((error) => console.log("admin getReservation error", error));
    }

    getOrders() {
        axios
            .get("https://enara28.pythonanywhere.com/orders", {
                withCredentials: true,
            })
            .then((response) => {
                this.setState({
                    orders: response.data,
                });
            })
            .catch((error) => console.log("admin getOrders error", error));
    }

    componentDidMount() {
        if (this.props.status == "admin") {
            this.getAllUsers();
            this.getMenuItems();
            this.getReservation();
            this.getOrders();
        }
    }

    componentDidUpdate() {
        if (this.state.newMenuItem !== "") {
            this.getMenuItems();
        }
    }

    usersInfo() {
        return this.state.users.map((user) => {
            return <SingleUser key={user.id} user={user} />;
        });
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

    reservations() {
        return this.state.reservations.map((reservation) => (
            <SingleReservation key={reservation.id} reservation={reservation} />
        ));
    }

    orders() {
        return this.state.orders.map((order) => {
            return <SingleOrder key={order.id} order={order} />;
        });
    }

    changeClass(title) {
        if (
            this.state[`display${title}`] ===
            `admin-${title}-info-content-hidden`
        ) {
            this.setState({
                [`display${title}`]: `admin-${title}-info-content-displayed`,
            });
        } else {
            this.setState({
                [`display${title}`]: `admin-${title}-info-content-hidden`,
            });
        }
    }

    render() {
        return (
            <div className="admin-container-wrapper">
                <div className="admin-container">
                    <div className="admin-users-reservations-info">
                        <div
                            className="admin-users-reservations-info-title"
                            onClick={(title) => this.changeClass("users")}
                        >
                            Usuarios registrados
                        </div>
                        <div className={this.state["displayusers"]}>
                            {this.usersInfo()}
                        </div>
                    </div>
                    <div className="admin-menu">
                        <div
                            className="admin-menu-title"
                            onClick={(title) => this.changeClass("menu")}
                        >
                            Menú
                        </div>
                        <div className={this.state["displaymenu"]}>
                            {this.menuItems()}
                            <div className="create-new-product-container">
                                <div className="create-new-product-title">
                                    Añadir nuevo plato al menú
                                </div>
                                {this.state.errorMessage ? (
                                    <div>{this.state.errorMessage}</div>
                                ) : null}
                                <form
                                    className="create-new-product-form"
                                    onSubmit={this.handleSubmit}
                                >
                                    <input
                                        type="text"
                                        name="product"
                                        placeholder="Producto"
                                        value={this.state.product}
                                        onChange={this.handleChange}
                                        autoComplete="on"
                                    />
                                    <input
                                        type="number"
                                        name="course"
                                        placeholder="Tiempo (1, 2 o 3)"
                                        value={this.state.course}
                                        onChange={this.handleChange}
                                        autoComplete="on"
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Precio"
                                        value={this.state.price}
                                        onChange={this.handleChange}
                                        autoComplete="on"
                                    />
                                    <button className="btn" type="submit">
                                        Guardar
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="admin-users-reservations-info">
                        <div
                            className="admin-users-reservations-info-title"
                            onClick={(title) =>
                                this.changeClass("reservations")
                            }
                        >
                            Reservas
                        </div>
                        <div className={this.state["displayreservations"]}>
                            {this.reservations()}
                        </div>
                    </div>
                    <div className="admin-users-reservations-info">
                        <div
                            className="admin-users-reservations-info-title"
                            onClick={(title) => this.changeClass("orders")}
                        >
                            Pedidos
                        </div>
                        <div className={this.state["displayorders"]}>
                            {this.orders()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
