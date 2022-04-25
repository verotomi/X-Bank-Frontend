import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { Card } from "react-bootstrap";

/**
 * Inaktivítás esetén megjelenő felugró ablak
 * @param {*} param0 az ablak kezeléséhez szükséges paraméterek
 */
export const IdleTimeOutModal = ({ showModal, handleClose, handleLogout }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h5 className="card-title text-center pb-0 fs-4">Figyelem!</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card.Body className="pb-0">
          <p>Ön egy ideje nem végzett semmilyen műveletet. Marad belépve, vagy kijelentkezik?</p>
          <br />
          <form onSubmit={handleLogout} className="row g-3" noValidate>
            <Button className="btn btn-success w-100" type="submit">
              Kijelentkezek
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Maradok
            </Button>
          </form>
        </Card.Body>
      </Modal.Body>
    </Modal>
  );
};
