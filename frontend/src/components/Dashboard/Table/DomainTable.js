import React, { useState } from 'react'
import "./domainTable.scss"
import { IoMdAdd } from "react-icons/io";
import Modal from "react-modal";
import Cards from './Cards';
import CreateDomainModal from '../../Modal/CreateDomainModal/CreateDomainModal';
const DomainTable = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
      };
    
      const customStyles = {
        content: {
          position: "fixed",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          width: "45%",
          height: "70%",
          borderRadius: "10px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      };
  return (
    <>
    <section className='table-container'>
        <div className='heading'>
            <p> Domains and DNS records </p>
            <p> <IoMdAdd onClick={() => openModal(null)}/></p>
        </div>
        <div className='cards-container'>
            <Cards/>
        </div>
    </section>
    <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Domains and dns records"
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        <CreateDomainModal
          closeModal={closeModal}
        />
      </Modal>
    </>
  )
}

export default DomainTable