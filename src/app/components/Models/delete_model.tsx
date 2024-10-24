'use client';

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface DeleteModalProps {
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  itemName: string;
}

export default function DeleteModal({ show, handleClose, handleDelete, itemName }: DeleteModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete {itemName}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
