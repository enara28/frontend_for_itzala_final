import React, { Component } from "react";
import ModalBase from "./modal-base";
import { Link } from "react-router";

import Header from "./header";
import Footer from "./footer";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            modalType: "",
        };

        this.handleModalMenu = this.handleModalMenu.bind(this);
        this.handleModalReservation = this.handleModalReservation.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    handleModalMenu() {
        this.setState({
            isOpen: true,
            modalType: "menu",
        });
    }

    handleModalReservation() {
        this.setState({
            isOpen: true,
            modalType: "reservation",
        });
    }

    handleModalClose() {
        this.setState({
            isOpen: false,
        });
    }

    render() {
        return (
            <div className="home-container-wrapper">
                <Header status={this.props.status} />
                <div className="general">
                    <div className="home-container">
                        <div className="menu-container">
                            <a onClick={this.handleModalMenu}>
                                <div className="menu">Menu</div>
                            </a>

                            <ModalBase
                                isOpen={this.state.isOpen}
                                modalType={this.state.modalType}
                                handleModalClose={this.handleModalClose}
                                loggedIn={this.props.loggedIn}
                            />
                        </div>
                        {this.props.loggedIn == "LOGGED_IN" &&
                        this.props.status == "usuario" ? (
                            <div className="buttons">
                                <div className="book-table">
                                    <a onClick={this.handleModalReservation}>
                                        Reservar mesa
                                    </a>
                                </div>
                                <div className="food-delivery">
                                    <Link to="/pedido">Realizar pedido</Link>
                                </div>
                            </div>
                        ) : null}
                        {this.props.loggedIn == "NO_LOGGED_IN" ? (
                            <div className="log-in-message">
                                <Link to="/log-in">
                                    Inicie sesión para reservar mesa o hacer tu
                                    pedido
                                </Link>
                            </div>
                        ) : null}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
