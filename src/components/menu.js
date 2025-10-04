import axios from "axios";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import withNavigation from "./withNavigation";

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
            pedido: [],
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
                total: [],
            });
        });
    }

    handleChange(event) {
        this.setState((prevState) => ({
            pedido: [
                ...prevState.pedido,
                { [event.target.name]: event.target.value },
            ],
            cantidad: event.target.value,
        }));
        // this.generarTotal();
    }
    // Ejemplo para poder multiplicar un string
    //     const mood = "Happy! ";

    // console.log(`I feel ${mood.repeat(3)}`);
    // Expected output: "I feel Happy! Happy! Happy! "

    handleSubmit(event) {
        event.preventDefault();
        let coment = this.state.pedido.map((el) => {
            for (const [key, value] of Object.entries(el)) {
                return ` ${key}: ${value}`;
            }
        });
        // let calculo = this.state.pedido.map((el) => {
        //     for (const [key, value] of Object.entries(el)) {
        //         return [
        //             this.state.menuCompleto.producto == key,
        //             parseFloat(value),
        //         ];
        //     }
        // });
        // calculo = this.state.menuCompleto.map((el) => {});
        if (confirm("¿Está tu pedido listo?")) {
            axios
                .post(
                    "http://localhost:5000/pedido",
                    {
                        usuario: this.props.usuarioId,
                        pedido: coment.toString(),
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

    // generarTotal() {
    //     return this.state.pedido.map((el) => {
    //         for (const [key, value] of Object.entries(el)) {
    //             return key;
    //         }
    //         this.setState((prevState) => ({
    //             total: [...prevState.total, key],
    //         }));
    //     });
    // }

    render() {
        let entrada = this.state.entrantes.map((item) => {
            if (this.props.lugar == "modal") {
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
            if (this.props.lugar == "modal") {
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
            if (this.props.lugar == "modal") {
                return (
                    <li key={item.id}>
                        {item.producto}: {item.precio} €
                    </li>
                );
            } else {
                return (
                    <li key={item.id}>
                        <label>
                            {item.producto}: <span>{item.precio} €</span>{" "}
                            <input
                                placeholder="Cantidad"
                                name={item.producto}
                                type="number"
                                form="formulario"
                                value={this.state.cantidad[item.producto]}
                                onChange={this.handleChange}
                            />
                        </label>
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
                            <div>Entrantes</div>
                            <ul>{entrada}</ul>
                        </div>
                        <div className="principales">
                            <div>Platos principales</div>
                            <ul>{fuerte}</ul>
                        </div>
                        <div className="postres">
                            <div>Postres</div>
                            <ul>{final}</ul>
                        </div>
                        {this.props.lugar == "pedido" ? (
                            <form id="formulario" onSubmit={this.handleSubmit}>
                                <button type="submit">Enviar</button>
                            </form>
                        ) : null}
                    </div>
                )}
            </div>
        );
    }
}

export default withNavigation(Menu);
