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
            errorMessage: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getMenu() {
        axios
            .get("http://localhost:5000/menu-item")
            .then((response) => {
                let entree = [];
                let main = [];
                let dessert = [];
                response.data.forEach((element) => {
                    if (element.course == 1) {
                        return entree.push(element);
                    } else if (element.course == 2) {
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
            })
            .catch((error) => {
                console.log("menu getMenu error", error);
                this.setState({
                    errorMessage: "Ha habido un error por nuestra parte",
                });
            });
    }

    handleChange(event) {
        if (event.target.value > 0 || event.target.value === "") {
            this.setState({
                [event.target.name]: event.target.value,
            });
        }
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
                el !== "quantity" &&
                el !== "errorMessage"
            ) {
                return el;
            }
        });

        if (getSelecction == false) {
            this.setState({
                errorMessage: "No has elegido ningún producto",
            });
        } else {
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
                        console.log("menu handleSubmit error", error),
                            alert(
                                "Ha habido un error con el pedido, vuelve a intentarlo o llama al número de contacto"
                            );
                    });
            }
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
                        {item.product}: {item.price} €
                    </li>
                );
            } else {
                return (
                    <li key={item.id}>
                        {item.product}: {item.price} €
                        <input
                            placeholder="Cantidad"
                            name={item.product}
                            type="number"
                            form="formulario" // ??
                            value={this.state.quantity[item.product]}
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
                        {item.product}: {item.price} €
                    </li>
                );
            } else {
                return (
                    <li key={item.id}>
                        {item.product}: {item.price} €
                        <input
                            placeholder="Cantidad"
                            name={item.product}
                            type="number"
                            form="formulario"
                            value={this.state.quantity[item.product]}
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
                        {item.product}: {item.price} €
                    </li>
                );
            } else {
                return (
                    <li key={item.id}>
                        {item.product}: {item.price} €
                        <input
                            placeholder="Cantidad"
                            name={item.product}
                            type="number"
                            form="formulario"
                            value={this.state.quantity[item.product]}
                            onChange={this.handleChange}
                        />
                    </li>
                );
            }
        });
        return (
            <div className="menu-container">
                {this.state.loading == true && this.state.errorMessage == "" ? (
                    <div className="loading-icon">
                        <FontAwesomeIcon icon={faSpinner} spin />
                    </div>
                ) : this.state.loading == true &&
                  this.state.errorMessage != "" ? (
                    <div>{this.state.errorMessage}</div>
                ) : (
                    <div className="menu-wrapper">
                        {this.state.loading == false &&
                        this.state.errorMessage == "" ? null : (
                            <div>{this.state.errorMessage}</div> //estilos
                        )}
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
