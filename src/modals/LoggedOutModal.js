import Modal from "react-bootstrap/Modal";
import React from "react";
import { Card } from "react-bootstrap";

/**
 * Felugró ablakban tájékkoztatja a felhasználót az automatikus kijelentkeztetésről
 * @param {*} param0 az ablak kezeléséhez szükséges paraméterek
 */
export const LoggedOutModal = ({ showModal, handleClose, text }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h5 className="card-title text-center pb-0 fs-4">Figyelem!</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card.Body className="pb-0">
          <p>{text}</p>
          <br />
        </Card.Body>
      </Modal.Body>
    </Modal>
  );
};
