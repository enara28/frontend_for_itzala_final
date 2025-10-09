import React, { Component } from "react";

export default class SingleReservation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, día, cantidad, comentario, reserva_usuario_id } =
            this.props.reservation;

        return (
            <div className="single-user-reservations-container">
                <div className="single-user-reservations-title">
                    Información de la reserva nº {id}:
                </div>
                <div className="single-user-reservations-content">
                    <div>
                        <b>Usuario:</b> {reserva_usuario_id}
                    </div>
                    <div className="username">
                        <b>Día:</b> {día}
                    </div>
                    <div className="email">
                        <b>Grupo:</b> {cantidad} personas
                    </div>
                    <div className="email">
                        <b>Comentarios:</b> {comentario}
                    </div>
                </div>
            </div>
        );
    }
}
