import React, { useEffect, useState } from "react";

import "./Cards.scss";
import axios from "axios";
import { useGlobal } from "../../Context/Context";
import { HiDotsHorizontal } from "react-icons/hi";
import CreateDomainModal from "../../Modal/CreateDomainModal/CreateDomainModal";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import DomainChart from "../Chart/DomainChart";

const Cards = () => {
  const { fetchData, fetchDomains,editModalVisible, setEditModalVisible,
    editCardData,
    handleEdit, handleDelete,handleAnalyticsClick } = useGlobal();
  const [showDropdown, setShowDropdown] = useState(false);
  


  const params = useParams();
  useEffect(() => {
    fetchDomains();
  }, []);

  const handleDropdown = (index) => {
    setShowDropdown((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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
      {Array.isArray(fetchData) &&
        fetchData.map((domain, index) => (
          <div className="card" key={index}>
            <div className="domain-name">
              <p>Domain Name : {domain.domainName}</p>
              <p onClick={() => handleDropdown(index)}>
                <HiDotsHorizontal />
              </p>
              {showDropdown[index] && (
                <div className="dropdown-content">
               <p onClick={() => handleEdit(domain._id)}>Edit</p>
               <p onClick={() => handleAnalyticsClick(domain)}>Analytics</p>
                  <p onClick={() => handleDelete(domain._id)}>Delete</p>
                </div>
              )}
            </div>
            <div className="dns-records">
              <table>
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Record Name</th>
                    <th>Record Type</th>
                    <th>Record Value</th>
                  </tr>
                </thead>
                <tbody>
                  {domain.dnsRecords.map((record, recordIndex) => (
                    <tr key={recordIndex}>
                      <td>{recordIndex + 1}</td>
                      <td>{record.name}</td>
                      <td>{record.type}</td>
                      <td>{record.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
       {editModalVisible && (
        <Modal
          isOpen={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}
          contentLabel="Edit Domain"
          shouldCloseOnOverlayClick={false}
          style={customStyles}
        >
          <CreateDomainModal
            closeModal={() => setEditModalVisible(false)}
            initialValues={editCardData}
          />
        </Modal>
      )}
      
    </>
  );
};

export default Cards;
