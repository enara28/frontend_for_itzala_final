import React, { Component } from "react";
import Modal from "react-modal";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import Menu from "./menu";
import Reservation from "./reservation";

Modal.setAppElement(".app-wrapper");

export default class ModalBase extends Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.handleModalClose();
    }

    render() {
        const customStyles = {
            content: {
                width: "80%",
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
            },
        };
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    onRequestClose={this.handleClose}
                    style={customStyles}
                >
                    <div className="modal-wrapper-container">
                        <a onClick={this.handleClose} className="icon">
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </a>
                        {this.props.modalType == "menu" ? (
                            <div className="modal-wrapper">
                                <Menu location={"modal"} />
                            </div>
                        ) : (
                            <Reservation usuarioId={this.props.usuarioId} />
                        )}
                        {this.props.loggedIn == "NO_LOGGED_IN" ? (
                            <div className="log-in-message">
                                <Link to="/log-in">
                                    Inicia sesión{" "}
                                    <span>
                                        para reservar mesa o hacer tu pedido
                                    </span>
                                </Link>
                            </div>
                        ) : null}
                    </div>
                </Modal>
            </div>
        );
    }
}
