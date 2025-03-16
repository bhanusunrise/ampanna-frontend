'use client';

import { BACK, RESTORE, RESTORE_CONFIRM } from '@/app/constants/constants';
import React from 'react';
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
        <Modal.Title className='text-white'>{RESTORE}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {itemName + RESTORE_CONFIRM}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {BACK}
        </Button>
        <Button variant="success" onClick={handleRestore}>
          {RESTORE}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
