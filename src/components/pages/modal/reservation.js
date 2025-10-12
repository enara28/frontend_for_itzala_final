import React, { Component } from "react";
import axios from "axios";

export default class Reservation extends Component {
    constructor() {
        super();

        this.state = {
            day: "Lunes",
            cantidad: "",
            comentario: "",
            madeReservation: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        axios
            .post(
                "http://localhost:5000/reserva",
                {
                    day: this.state.day,
                    cantidad: this.state.cantidad,
                    comentario: this.state.comentario,
                    user: this.props.userId,
                },
                { withCredentials: true }
            )
            .then(
                (response) => console.log(response),
                this.setState({
                    madeReservation: true,
                })
            )
            .catch((error) => console.log(error));
        event.preventDefault();
    }

    render() {
        return (
            <div className="reservation-container">
                {this.state.madeReservation == false ? (
                    <div>
                        <div className="reservation-title">
                            Selecciona el día de la reserva y indica cuántos
                            seréis
                        </div>
                        <form
                            className="reservation-inputs"
                            onSubmit={this.handleSubmit}
                        >
                            <select
                                className="day-selecction"
                                type="text"
                                name="day"
                                value={this.state.day}
                                onChange={this.handleChange}
                                autoComplete="on"
                            >
                                <option>Lunes</option>
                                <option>Martes</option>
                                <option>Miércoles</option>
                                <option>Jueves</option>
                                <option>Viernes</option>
                                <option>Sábado</option>
                                <option>Domingo</option>
                            </select>
                            <input
                                type="number"
                                name="cantidad"
                                placeholder="¿Cuántas personas seréis?"
                                value={this.state.cantidad}
                                onChange={this.handleChange}
                                autoComplete="on"
                            />
                            <textarea
                                type="text"
                                name="comentario"
                                placeholder="Añade alergias u otros comentarios"
                                value={this.state.comentario}
                                onChange={this.handleChange}
                                autoComplete="on"
                            />
                            <button className="btn" type="submit">
                                Reservar
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="reservation-success-message">
                        <div className="reservation-success-message-title">
                            Tu reserva se ha gestionado con éxito:
                        </div>
                        <div className="reservation-success-message-content">
                            <div>
                                <b>Día:</b> {this.state.day}
                            </div>
                            <div>
                                <b>Grupo:</b> {this.state.cantidad} personas
                            </div>
                            <div>
                                <b>Comentarios:</b> {this.state.comentario}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
