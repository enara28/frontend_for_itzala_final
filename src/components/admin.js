import React, { Component } from "react";
import axios from "axios";

import Header from "./header";
import Footer from "./footer";
import User from "./user";
import MenuItem from "./menu-item";

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
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        event.preventDefault();
    }

    get_all_users() {
        axios
            .get(`http://localhost:5000/usuarios`, { withCredentials: true })
            .then((response) => {
                this.setState({
                    users: response.data.result,
                });
            })
            .catch((err) => console.log("error mio", err));
    }

    get_menu_items() {
        axios
            .get(`http://localhost:5000/menu-item`, { withCredentials: true })
            .then((response) => {
                this.setState({
                    menu: response.data,
                });
            });
    }

    componentDidMount() {
        if (this.props.status == "admin") {
            this.get_all_users();
            this.get_menu_items();
        }
    }

    menuItems() {
        return this.state.menu.map((item) => {
            return <MenuItem key={item.id} item={item} />;
        });
    }

    usersInfo() {
        return this.state.users.map((user) => {
            return <User key={user.id} user={user} />;
        });
    }

    render() {
        return (
            <div className="admin-container">
                <Header />
                <div className="general-body">
                    <div className="admin-content-wrapper">
                        <div className="user-info">
                            <div className="admin-titulo">
                                Usuarios registrados:
                            </div>
                            {this.usersInfo()}
                        </div>
                        <div className="admin-menu">
                            <div className="admin-titulo">Menú</div>
                            {this.menuItems()}
                        </div>
                        <div>
                            <div className="admin-titulo">
                                Añadir nuevo plato al menú
                            </div>
                            <form
                                className="create-new-product"
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
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
