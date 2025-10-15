import axios from "axios";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            id: this.props.item.id, // revisar si hace falta
            editMode: false,
            editProduct: "",
            editCourse: "",
            editPrice: "",
            editId: "",
            successMessage: "",
            deleteMessage: "",
        };

        this.deleteProduct = this.deleteProduct.bind(this);
        this.productToEdit = this.productToEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    deleteProduct(id) {
        confirm("¿Estás segura de querer eliminar este producto?");
        axios
            .delete(`http://localhost:5000/menu-item/${id}`, {
                withCredentials: true,
            })
            .then(this.setState({ deleteMessage: "Porducto eliminado" }))
            .catch((error) =>
                console.log("menu-item deleteProduct error", error)
            );
    }

    productToEdit(id) {
        axios
            .get(`http://localhost:5000/menu-item/${id}`, {
                withCredentials: true,
            })
            .then((response) => {
                this.setState({
                    editMode: true,
                    editProduct: response.data.product,
                    editPrice: response.data.price,
                    editCourse: response.data.course,
                    editId: response.data.id,
                });
            })
            .catch((error) =>
                console.log("menu-item productToEdit error", error)
            );
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        confirm("¿Estás segura de querer actualizar este producto?");
        axios
            .patch(
                `http://localhost:5000/menu-item/${this.state.editId}`,
                {
                    product: this.state.editProduct,
                    course: this.state.editCourse,
                    price: this.state.editPrice,
                },
                { withCredentials: true }
            )
            .then((response) => {
                this.setState({
                    item: response.data,
                    editMode: false,
                    editProduct: "",
                    editPrice: "",
                    editCourse: "",
                    editId: "",
                    successMessage: "Actualizado",
                });
            })
            .catch((error) =>
                console.log("menu-item handleSubmit error", error)
            );
        event.preventDefault();
    }

    render() {
        const { price, product, course, id } = this.state.item;
        return (
            <div>
                {this.state.editMode == false ? (
                    <div className="admin-menu-item-container">
                        {this.state.deleteMessage ? (
                            <div>{this.state.deleteMessage}</div>
                        ) : null}
                        <div className="admin-menu-item">
                            <div className="menu-item-info">
                                <div>
                                    <b>Producto:</b> {product}
                                </div>
                                <div>
                                    <b>Precio:</b> {price} €
                                </div>
                                <div>
                                    <b>Tiempo:</b> {course}
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
                            {this.state.successMessage ? (
                                <div>{this.state.successMessage}</div>
                            ) : null}
                        </div>
                    </div>
                ) : (
                    <form onSubmit={this.handleSubmit} className="edit-item">
                        <input
                            type="text"
                            name="editProduct"
                            placeholder="Producto"
                            value={this.state.editProduct}
                            onChange={this.handleChange}
                            autoComplete="on"
                        />
                        <input
                            type="number"
                            name="editCourse"
                            placeholder="Tiempo(1, 2 o 3)"
                            value={this.state.editCourse}
                            onChange={this.handleChange}
                            autoComplete="on"
                        />
                        <input
                            type="number"
                            name="editPrice"
                            placeholder="Precio"
                            value={this.state.editPrice}
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
