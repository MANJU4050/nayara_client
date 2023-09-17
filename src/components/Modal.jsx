import React from 'react'
import styles from '../assets/css/modules/Modal.module.css'

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div className={styles.modaloverlay}>
        <div className={styles.modal}>
          <button className={styles.closebutton} onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  }

export default Modal