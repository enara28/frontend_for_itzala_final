import React, { Component } from "react";

export default class SingleReservation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, date, quantity, comment, reservation_user_id } =
            this.props.reservation;

        return (
            <div className="single-user-reservations-container">
                <div className="single-user-reservations-title">
                    Información de la reserva nº {id}:
                </div>
                <div className="single-user-reservations-content">
                    <div>
                        <b>Usuario:</b> {reservation_user_id}
                    </div>
                    <div className="username">
                        <b>Día:</b> {date}
                    </div>
                    <div className="email">
                        <b>Grupo:</b> {quantity} personas
                    </div>
                    <div className="email">
                        <b>Comentarios:</b> {comment}
                    </div>
                </div>
            </div>
        );
    }
}
