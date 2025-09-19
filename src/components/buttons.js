import React, { Component } from "react"
import ModalBase from "./modal-base"

import Pedido from "./pedido"
import { Link } from "react-router-dom"

export default class Buttons extends Component {
    
    constructor() {
        super()
        this.state = {
            isOpen: false,
            modalType: ""
        }

        this.handleModalMenu = this.handleModalMenu.bind(this)
        this.handleModalReservation = this.handleModalReservation.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
    }

    handleModalMenu() {
        this.setState({
            isOpen: true,
            modalType: "menu"
        })
    }

    handleModalReservation() {
        this.setState({
            isOpen: true,
            modalType: "reservation"
        })
    }

    handleModalClose() {
        this.setState({
            isOpen: false
        })
    }

    render() {
        return (
            <div className="buttons-container-wrapper">
                <div className="buttons-container">
                    <div className="menu"><a onClick={this.handleModalMenu}>Menu</a></div>
                    <ModalBase isOpen={this.state.isOpen}
                    modalType={this.state.modalType}
                    handleModalClose={this.handleModalClose}/>
                    <div className="buttons">
                        <div className="book-table">
                            <a onClick={this.handleModalReservation}>Reservar mesa</a>
                        </div>
                        <div className="food-delivery">
                            <Link to="/pedido">Realizar pedido</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}