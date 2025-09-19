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
                <div>Realiza aquí tu pedido</div>
                <Footer />
            </div>
        )
    }
}