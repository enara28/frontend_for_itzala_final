import React, { Component } from "react";
import axios from "axios";
import { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Reservation extends Component {
    constructor() {
        super();

        this.state = {
            cantidad: "",
            comentario: "",
            madeReservation: false,
            today: new Date(),
            date: new Date(),
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.value == "") {
            this.setState({
                [event.target.name]: null,
            });
        } else {
            this.setState({
                [event.target.name]: event.target.value,
            });
        }
    }

    handleSubmit(event) {
        let cantidadChecked = () => {
            if (this.state.cantidad == "") {
                return null;
            } else {
                return this.state.cantidad;
            }
        };
        axios
            .post(
                "http://localhost:5000/reserva",
                {
                    day: this.state.date.toLocaleDateString("es"),
                    cantidad: cantidadChecked(),
                    comentario: this.state.comentario,
                    user: this.props.userId,
                },
                { withCredentials: true }
            )
            .then((response) => {
                console.log(response),
                    this.setState({
                        madeReservation: true,
                    });
            })
            .catch((error) => {
                console.log(error),
                    alert(
                        "Se ha producido un error en la reserva, intentalo de nuevo o llama al número de contacto"
                    );
            });
        event.preventDefault();
    }

    render() {
        return (
            <div className="reservation-container">
                {this.state.madeReservation === false ? (
                    <div className="reservation-modal">
                        <div className="reservation-title">
                            Selecciona el día de la reserva y indica cuántos
                            seréis
                        </div>
                        <form
                            className="reservation-inputs"
                            onSubmit={this.handleSubmit}
                        >
                            <div className="date-picker">
                                <div>Selecciona un día</div>
                                <DatePicker
                                    selected={this.state.date}
                                    onChange={(newDate) =>
                                        this.setState({ date: newDate })
                                    }
                                    dateFormat="dd/MM/yyyy"
                                    minDate={new Date()}
                                    maxDate={this.state.today.setMonth(
                                        this.state.today.getMonth() + 1
                                    )}
                                />
                            </div>
                            {/* <select
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
                            </select> */}
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
                ) : this.state.madeReservation === true ? (
                    <div className="reservation-success-message">
                        <div className="reservation-success-message-title">
                            Tu reserva se ha gestionado con éxito:
                        </div>
                        <div className="reservation-success-message-content">
                            <div>
                                <b>Día:</b>{" "}
                                {this.state.date.toLocaleDateString("es")}
                            </div>
                            <div>
                                <b>Grupo:</b> {this.state.cantidad} personas
                            </div>
                            <div>
                                <b>Comentarios:</b> {this.state.comentario}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
