import React, { useState } from 'react';
import "./domainTable.scss";
import axios from 'axios';
import { IoMdAdd } from "react-icons/io";
import Modal from "react-modal";
import Cards from './Cards';
import CreateDomainModal from '../../Modal/CreateDomainModal/CreateDomainModal';
import { FaUpload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobal } from '../../Context/Context';
import DomainChart from '../Chart/DomainChart';
const DomainTable = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);


    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
      const auth = JSON.parse(localStorage.getItem("user")) || { token: null };
      const userToken = auth.token;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      };
        if (!selectedFile) {
          toast.error('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            setUploading(true);
            const response = await axios.post('http://localhost:4000/upload', formData,{headers})
            console.log(response.data);
            toast.success('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('An error occurred while uploading the file. Please try again.');
        } finally {
            setUploading(false);
        }
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

                    <div className='buttons'>
                        <button onClick={() => openModal(null)}> <IoMdAdd />Add Records</button>
                        <label className="upload-btn">
                           
                            <input type="file" accept=".csv, .json" onChange={handleFileChange} />
                        </label>
                        <button onClick={handleUpload}> <FaUpload />Upload Records</button>
                    </div>
                </div>
                <div className='cards-container'>
                    <Cards />
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
            <ToastContainer position="top-right" autoClose={2000} />
        </>
    );
}

export default DomainTable;
