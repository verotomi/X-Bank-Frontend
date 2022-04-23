import Modal from "react-bootstrap/Modal";
import React from "react";
import { Button, Card } from "react-bootstrap";

export const LogoutModal = ({ showModal, handleClose, handleLogout }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="card-title text-center pb-0 fs-4">Biztos, hogy ki szeretne jelentkezni?</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Body className="pb-0">
            <form onSubmit={handleLogout} className="row g-3" noValidate>
              <Button className="btn btn-success w-100" type="submit">
                Kijelentkezés
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Mégsem
              </Button>
            </form>
          </Card.Body>
        </Modal.Body>
      </Modal>
  );
};
