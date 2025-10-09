import axios from "axios";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import withNavigation from "../../helpers/withNavigation";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuCompleto: [],
            entrantes: [],
            segundos: [],
            postres: [],
            cargando: true,
            cantidad: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    get_menu() {
        axios.get("http://localhost:5000/menu-item").then((response) => {
            console.log(response.data);
            let entrante = [];
            let segundo = [];
            let postre = [];
            response.data.forEach((element) => {
                if (element.tiempo == 1) {
                    return entrante.push(element);
                } else if (element.tiempo == 2) {
                    return segundo.push(element);
                } else {
                    return postre.push(element);
                }
            });
            this.setState({
                menuCompleto: response.data,
                entrantes: entrante,
                segundos: segundo,
                postres: postre,
                cargando: false,
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
        let cadena = Object.keys(this.state);
        let coment = cadena.filter((el) => {
            if (
                el !== "menuCompleto" &&
                el !== "entrantes" &&
                el !== "segundos" &&
                el !== "postres" &&
                el !== "cargando" &&
                el !== "cantidad"
            ) {
                return el;
            }
        });

        let nuevo_pedido = coment.map((el) => {
            return `${el}: ${this.state[el]}`;
        });

        if (confirm("¿Está tu pedido listo?")) {
            axios
                .post(
                    "http://localhost:5000/pedido",
                    {
                        usuario: this.props.usuarioId,
                        pedido: nuevo_pedido.toString(),
                    },
                    { withCredentials: true }
                )
                .then((response) => {
                    console.log(response);
                    this.props.navigation("/");
                })
                .catch((error) => console.log(error));
        }
    }

    componentDidMount() {
        this.get_menu();
    }

    render() {
        let entrada = this.state.entrantes.map((item) => {
            if (this.props.location == "modal") {
                return (
                    <li key={item.id}>
                        {item.producto}: {item.precio} €
                    </li>
                );
            } else {
                return (
                    <li key={item.id}>
                        {item.producto}: <span>{item.precio} €</span>{" "}
                        <input
                            placeholder="Cantidad"
                            name={item.producto}
                            type="number"
                            form="formulario"
                            value={this.state.cantidad[item.producto]}
                            onChange={this.handleChange}
                        />
                    </li>
                );
            }
        });
        let fuerte = this.state.segundos.map((item) => {
            if (this.props.location == "modal") {
                return (
                    <li key={item.id}>
                        {item.producto}: {item.precio} €
                    </li>
                );
            } else {
                return (
                    <li key={item.id}>
                        {item.producto}: <span>{item.precio} €</span>{" "}
                        <input
                            placeholder="Cantidad"
                            name={item.producto}
                            type="number"
                            form="formulario"
                            value={this.state.cantidad[item.producto]}
                            onChange={this.handleChange}
                        />
                    </li>
                );
            }
        });
        let final = this.state.postres.map((item) => {
            if (this.props.location == "modal") {
                return (
                    <li key={item.id}>
                        {item.producto}: {item.precio} €
                    </li>
                );
            } else {
                return (
                    <li key={item.id}>
                        {item.producto}: <span>{item.precio} €</span>{" "}
                        <input
                            placeholder="Cantidad"
                            name={item.producto}
                            type="number"
                            form="formulario"
                            value={this.state.cantidad[item.producto]}
                            onChange={this.handleChange}
                        />
                    </li>
                );
            }
        });
        return (
            <div className="menu-container">
                {this.state.cargando == true ? (
                    <div>
                        <FontAwesomeIcon icon={faSpinner} spin />
                    </div>
                ) : (
                    <div className="menu-wrapper">
                        <div className="entrees">
                            <div className="menu-titulo">Entrantes</div>
                            <ul>{entrada}</ul>
                        </div>
                        <div className="principales">
                            <div className="menu-titulo">
                                Platos principales
                            </div>
                            <ul>{fuerte}</ul>
                        </div>
                        <div className="postres">
                            <div className="menu-titulo">Postres</div>
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
