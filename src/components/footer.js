import React from "react";

import logo from "../assets/logo/logo-512x512.png";
import { Link } from "react-router";

export default function () {
    return (
        <div className="footer-container-wrapper">
            <div className="footer-address">Address goes here</div>
            <div className="footer-logo">
                <img src={logo} />
            </div>
            <div className="footer-contact">
                <Link to="/about">Contact info goes here</Link>
            </div>
        </div>
    );
}
