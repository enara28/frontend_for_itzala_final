import React, { Component } from "react"
import Modal from "react-modal"

import Menu from "./menu"
import Reservation from "./reservation"

Modal.setAppElement(".app-wrapper")

export default class ModalBase extends Component {
    
    constructor(props) {
        super(props)

        this.handleClose = this.handleClose.bind(this)
    }
    
    handleClose() {
        this.props.handleModalClose()
    }

    render() {
        return(
            <div>
                <Modal 
                isOpen={this.props.isOpen}
                onRequestClose={this.handleClose}>
                    <a onClick={this.handleClose}>Close</a>
                    {this.props.modalType == "menu" ? <Menu /> : <Reservation />}
                </Modal>
                {/* Meter lógica para distinguir qué modal abirir */}

            </div>
        )
    }
}