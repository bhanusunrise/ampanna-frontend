'use client';

import { BACK, DELETE_BUTTON_DELETE_MODAL, DELETE_CONFIRM, DELTETION } from '@/app/constants/constants';
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
      <Modal.Header closeButton className={"bg-danger"}>
        <Modal.Title className={"text-white"}>{DELTETION}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {itemName + DELETE_CONFIRM} 
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {BACK}
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          {DELETE_BUTTON_DELETE_MODAL}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
