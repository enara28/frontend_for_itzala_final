import React, { Component } from "react";

export default class About extends Component {
    render() {
        return (
            <div>
                <div className="about-container-wrapper">
                    <div className="text-container">
                        <p>
                            Bienvenidos a nuesto rincón en el que podrás
                            degustar una variedad enorme de platos basados en
                            plantas con productos de temporada.
                        </p>
                        <p>
                            Si quieres realizar un pedido para recoger en
                            nuestro local, inicia sesión y realiza el pedido,
                            recuerda que el pago se realizará en el local cuando
                            se recoga el pedido.
                        </p>
                        <p>
                            Si, por el contrario quereis reservar una mesa,
                            elegid el día de la semana entre y indicad el número
                            de personas que conformarán el grupo. Además, tenés
                            un apartado de comentarios disponible para
                            comunicarnos información relevante como alergias o
                            posibles retrasos en la llegada.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
