import React, {Component} from "react";

import Header from './header';
import Footer from "./footer";

export default class Pedido extends Component {
    constructor() {
        super()
    }

    render() {
        return(
            <div>
                <Header />
                <div className="general-body">
                    <div>Realiza aquí tu pedido</div>
                </div>
                <Footer />
            </div>
        )
    }
}