import React, { Component } from "react";
import axios from "axios";
import { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Reservation extends Component {
    constructor() {
        super();

        this.state = {
            quantity: "",
            comment: "",
            madeReservation: false,
            today: new Date(),
            date: new Date(),
            errorMessage: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorMessage: "",
        });
    }

    handleSubmit(event) {
        let quantityChecked = () => {
            if (this.state.quantity == "" || this.state.quantity <= 0) {
                return null;
            } else {
                return this.state.quantity;
            }
        };
        axios
            .post(
                "https://enara28.pythonanywhere.com/reservation",
                {
                    day: this.state.date.toLocaleDateString("es"),
                    quantity: quantityChecked(),
                    comment: this.state.comment,
                    user: this.props.userId,
                },
                { withCredentials: true }
            )
            .then((response) => {
                this.setState({
                    madeReservation: true,
                });
                return response;
            })
            .catch((error) => {
                console.log("reservation handleSubmit error", error),
                    this.setState({
                        errorMessage: error.response.data.msg,
                    });
            });
        event.preventDefault();
    }

    render() {
        return (
            <div className="reservation-container">
                {this.state.madeReservation === false ? (
                    <div className="reservation-modal">
                        <div className="reservation-title">
                            Selecciona el día de la reserva e indica cuántos
                            seréis
                        </div>
                        {this.state.errorMessage ? (
                            <div className="error-message">
                                {this.state.errorMessage}
                            </div>
                        ) : null}
                        <form
                            className="reservation-inputs"
                            onSubmit={this.handleSubmit}
                        >
                            <div className="date-picker">
                                <div>Selecciona un día:</div>
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
                            <input
                                type="number"
                                name="quantity"
                                placeholder="¿Cuántas personas seréis?"
                                value={this.state.quantity}
                                onChange={this.handleChange}
                                autoComplete="on"
                            />
                            <textarea
                                type="text"
                                name="comment"
                                placeholder="Añade alergias u otros comentarios"
                                value={this.state.comment}
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
                                <b>Grupo:</b> {this.state.quantity} personas
                            </div>
                            <div>
                                <b>Comentarios:</b> {this.state.comment}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
