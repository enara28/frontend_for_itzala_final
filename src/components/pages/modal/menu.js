import axios from "axios";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import withNavigation from "../../helpers/withNavigation";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullMenu: [],
            entrees: [],
            mains: [],
            desserts: [],
            loading: true,
            quantity: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getMenu() {
        axios.get("http://localhost:5000/menu-item").then((response) => {
            console.log(response.data);
            let entree = [];
            let main = [];
            let dessert = [];
            response.data.forEach((element) => {
                if (element.tiempo == 1) {
                    return entree.push(element);
                } else if (element.tiempo == 2) {
                    return main.push(element);
                } else {
                    return dessert.push(element);
                }
            });
            this.setState({
                fullMenu: response.data,
                entrees: entree,
                mains: main,
                desserts: dessert,
                loading: false,
            });
        });
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let stateKeys = Object.keys(this.state);
        let getSelecction = stateKeys.filter((el) => {
            if (
                el !== "fullMenu" &&
                el !== "entrees" &&
                el !== "mains" &&
                el !== "desserts" &&
                el !== "loading" &&
                el !== "quantity"
            ) {
                return el;
            }
        });

        let newOrder = getSelecction.map((el) => {
            return `${el}: ${this.state[el]}`;
        });

        if (confirm("¿Está tu pedido listo?")) {
            axios
                .post(
                    "http://localhost:5000/order",
                    {
                        user: this.props.userId,
                        order: newOrder.toString(),
                    },
                    { withCredentials: true }
                )
                .then((response) => {
                    console.log(response);
                    this.props.navigation("/");
                    alert("Tu pedido se ha procesado con éxito");
                })
                .catch((error) => {
                    console.log(error),
                        alert(
                            "Ha habido un error con el pedido, vuelve a intentarlo o llama al número de contacto"
                        );
                });
        }
    }

    componentDidMount() {
        this.getMenu();
    }

    render() {
        let entrada = this.state.entrees.map((item) => {
            if (this.props.location == "modal") {
                return (
                    <li key={item.id}>
                        {item.producto}: {item.precio} €
                    </li>
                );
            } else {
                return (
                    <li key={item.id}>
                        {item.producto}: {item.precio} €
                        <input
                            placeholder="Cantidad"
                            name={item.producto}
                            type="number"
                            form="formulario"
                            value={this.state.quantity[item.producto]}
                            onChange={this.handleChange}
                        />
                    </li>
                );
            }
        });
        let fuerte = this.state.mains.map((item) => {
            if (this.props.location == "modal") {
                return (
                    <li key={item.id}>
                        {item.producto}: {item.precio} €
                    </li>
                );
            } else {
                return (
                    <li key={item.id}>
                        {item.producto}: {item.precio} €
                        <input
                            placeholder="Cantidad"
                            name={item.producto}
                            type="number"
                            form="formulario"
                            value={this.state.quantity[item.producto]}
                            onChange={this.handleChange}
                        />
                    </li>
                );
            }
        });
        let final = this.state.desserts.map((item) => {
            if (this.props.location == "modal") {
                return (
                    <li key={item.id}>
                        {item.producto}: {item.precio} €
                    </li>
                );
            } else {
                return (
                    <li key={item.id}>
                        {item.producto}: {item.precio} €
                        <input
                            placeholder="Cantidad"
                            name={item.producto}
                            type="number"
                            form="formulario"
                            value={this.state.quantity[item.producto]}
                            onChange={this.handleChange}
                        />
                    </li>
                );
            }
        });
        return (
            <div className="menu-container">
                {this.state.loading == true ? (
                    <div className="loading-icon">
                        <FontAwesomeIcon icon={faSpinner} spin />
                    </div>
                ) : (
                    <div className="menu-wrapper">
                        <div className="entrees">
                            <div className="menu-title">Entrantes</div>
                            <ul>{entrada}</ul>
                        </div>
                        <div className="mains">
                            <div className="menu-title">Platos principales</div>
                            <ul>{fuerte}</ul>
                        </div>
                        <div className="desserts">
                            <div className="menu-title">Postres</div>
                            <ul>{final}</ul>
                        </div>
                        {this.props.location == "order" ? (
                            <form id="formulario" onSubmit={this.handleSubmit}>
                                <button className="btn" type="submit">
                                    Enviar
                                </button>
                            </form>
                        ) : null}
                    </div>
                )}
            </div>
        );
    }
}

export default withNavigation(Menu);
