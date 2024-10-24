'use client';

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface RestoreModalProps {
  show: boolean;
  handleClose: () => void;
  handleRestore: () => void;
  itemName: string;
}

export default function RestoreModal({ show, handleClose, handleRestore, itemName }: RestoreModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className={"bg-success"}>
        <Modal.Title className='text-white'>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to restore {itemName}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleRestore}>
          Restore
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
