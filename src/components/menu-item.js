import axios from "axios";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            id: this.props.item.id,
            editMode: false,
            editProducto: "",
            editTiempo: "",
            editPrecio: "",
            editId: "",
        };

        this.eliminar_producto = this.eliminar_producto.bind(this);
        this.editarProducto = this.editarProducto.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    eliminar_producto(id) {
        axios
            .delete(`http://localhost:5000/menu-item/${id}`, {
                withCredentials: true,
            })
            .then(console.log("producto eliminado"))
            .catch((err) => console.log(err));
    }
    editarProducto(id) {
        axios
            .get(`http://localhost:5000/menu-item/${id}`, {
                withCredentials: true,
            })
            .then((response) => {
                this.setState({
                    editMode: true,
                    editProducto: response.data.producto,
                    editPrecio: response.data.precio,
                    editTiempo: response.data.tiempo,
                    editId: response.data.id,
                });
                console.log(response);
            });
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleSubmit(event) {
        axios
            .patch(
                `http://localhost:5000/${this.state.editId}`,
                {
                    producto: this.state.editProducto,
                    tiempo: this.state.editTiempo,
                    precio: this.state.editPrecio,
                },
                { withCredentials: true }
            )
            .then(
                (response) => console.log(response),
                this.setState({ editMode: false })
            )
            .catch((err) => console.log(err));
        event.preventDefault();
    }

    render() {
        const { precio, producto, tiempo, id } = this.state.item;
        return (
            <div className="menu-item-container">
                {this.state.editMode == false ? (
                    <div>
                        <div>Producto: {producto}</div>
                        <div>Precio: {precio}</div>
                        <div>Tiempo: {tiempo}</div>
                        <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => this.eliminar_producto(id)}
                        />
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            onClick={() => this.editarProducto(id)}
                        />
                    </div>
                ) : (
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name="editProducto"
                            placeholder="Producto"
                            value={this.state.editProducto}
                            onChange={this.handleChange}
                            autoComplete="on"
                        />
                        <input
                            type="number"
                            name="editTiempo"
                            placeholder="Tiempo(1, 2 o 3)"
                            value={this.state.editTiempo}
                            onChange={this.handleChange}
                            autoComplete="on"
                        />
                        <input
                            type="number"
                            name="editPrecio"
                            placeholder="Precio"
                            value={this.state.editPrecio}
                            onChange={this.handleChange}
                            autoComplete="on"
                        />
                        <button type="submit">Submit</button>
                    </form>
                )}
            </div>
        );
    }
}
