import axios from "axios";
import React, {Component} from "react";

export default class MenuItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: this.props.item,
            id: this.props.item.id
        }

        this.eliminar_producto = this.eliminar_producto.bind(this)
    }

    eliminar_producto(id) {
        axios.delete(`http://localhost:5000/menu-item/${id}`, {withCredentials: true}).then(
            console.log("producto eliminado")
        ).catch(err => console.log(err))
    }

    render() {
        const {precio, producto, tiempo, id} = this.state.item
        return (
            <div>
                <div>{precio}</div>
                <div>{producto}</div>
                <div>{tiempo}</div>
                <button onClick={() => this.eliminar_producto(id)}>Eliminar</button>
            </div>
        )
    }
}