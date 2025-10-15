import React from "react";

import logo from "../../assets/logo/logo-512x512.png";
import { Link } from "react-router";

export default function () {
    return (
        <div className="footer-container-wrapper">
            <div className="footer-address">nº 0, Gipuzkoa</div>
            <div className="footer-logo">
                <img src={logo} />
            </div>
            <div className="footer-contact">
                <Link to="/about" title="Conócenos">
                    <div className="correo">correo@correo.eus</div>
                    <div className="telefono">+34-000-000-000</div>
                </Link>
            </div>
        </div>
    );
}
