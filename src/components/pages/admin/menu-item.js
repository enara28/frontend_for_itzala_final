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
            successMessage: "",
        };

        this.deleteProduct = this.deleteProduct.bind(this);
        this.productToEdit = this.productToEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    deleteProduct(id) {
        axios
            .delete(`http://localhost:5000/menu-item/${id}`, {
                withCredentials: true,
            })
            .then(
                console.log("producto eliminado"),
                this.setState({ item: "" })
            )
            .catch((err) => console.log(err));
    }
    productToEdit(id) {
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
                `http://localhost:5000/menu-item/${this.state.editId}`,
                {
                    producto: this.state.editProducto,
                    tiempo: this.state.editTiempo,
                    precio: this.state.editPrecio,
                },
                { withCredentials: true }
            )
            .then((response) => {
                console.log(response),
                    this.setState({
                        item: response.data,
                        editMode: false,
                        editProducto: "",
                        editPrecio: "",
                        editTiempo: "",
                        editId: "",
                        successMessage:
                            "El producto se ha actualizado de forma correcta",
                    });
            })
            .catch((err) => console.log(err));
        event.preventDefault();
    }

    render() {
        const { precio, producto, tiempo, id } = this.state.item;
        return (
            <div>
                {this.state.editMode == false ? (
                    <div className="admin-menu-item-container">
                        {this.state.item == "" ? (
                            <div>Porducto eliminado</div>
                        ) : (
                            <div className="admin-menu-item">
                                <div className="menu-item-info">
                                    <div>
                                        <b>Producto:</b> {producto}
                                    </div>
                                    <div>
                                        <b>Precio:</b> {precio} €
                                    </div>
                                    <div>
                                        <b>Tiempo:</b> {tiempo}
                                    </div>
                                </div>
                                <div className="menu-item-icons">
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={() => this.deleteProduct(id)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        onClick={() => this.productToEdit(id)}
                                    />
                                </div>
                                <div>{this.state.successMessage}</div>
                            </div>
                        )}
                    </div>
                ) : (
                    <form onSubmit={this.handleSubmit} className="edit-item">
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
                        <button className="btn" type="submit">
                            Guardar
                        </button>
                    </form>
                )}
            </div>
        );
    }
}
