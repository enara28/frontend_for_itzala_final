import React from "react";
import { Link } from "react-router";

export default function() {
    return(
        <div className="menu-container">
            <div className="title">This is the menu</div>
            <div className="menu-wrapper">
                <div className="entrees">
                    <ul>
                        <li>Ensalada mixta</li>
                        <li>Revuelto de hongos</li>
                        <li>Guacamole con totopos</li>
                        <li>Creps rellenos de setas</li>
                        <li>Croquetas variadas</li>
                    </ul>
                </div>
                <div className="mains">
                    <ul>
                        <li>Tofu a la plancha</li>
                        <li>Hamburguesa vegana</li>
                        <li>Seitan con verduras</li>
                        <li>Quesadilla de verduras</li>
                        <li>Lasaña de boloñesa de soja</li>
                    </ul>
                </div>
                <div className="desserts">
                    <ul>
                        <li>Brownie con helado</li>
                        <li>Tarta de queso</li>
                        <li>Flan sin huevo</li>
                        <li>Sorvete de mandarina</li>
                        <li>Tarta de manzana</li>
                    </ul>
                </div>
                <div className="log-in-message">
                    <Link to="/log-in">Inicie sesión para reservar mesa o hacer tu pedido</Link>
                </div>
            </div>

        </div>
    )
}