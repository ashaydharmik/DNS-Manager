import React, { useState } from "react";
import { ImBin2 } from "react-icons/im";
import "./createDomainModal.scss";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const CreateDomainModal = ({ closeModal }) => {
  const initialRecordValue = {
    name: "",
    type: "",
    value: "",
  };

  const [formData, setFormData] = useState({
    domainName: "",
    dnsRecords: [initialRecordValue],
  });

  const changeHandler = (e, index, isDomainName = false) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [isDomainName ? "domainName" : "dnsRecords"]: isDomainName
        ? value
        : prevData.dnsRecords.map((record, i) =>
            i === index ? { ...record, [name]: value } : record
          ),
    }));
  };
  

  const addRecord = () => {
    setFormData((prevData) => ({
      ...prevData,
      dnsRecords: [...prevData.dnsRecords, initialRecordValue],
    }));
  };

  const removeRecord = (index) => {
    setFormData((prevData) => {
      if (prevData.dnsRecords.length > 1) {
        return {
          ...prevData,
          dnsRecords: prevData.dnsRecords.filter((_, i) => i !== index),
        };
      }
      return prevData;
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  
    try {
      const auth = JSON.parse(localStorage.getItem("user")) || { token: null };
      const userToken = auth.token;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      };
  
      const response = await axios.post("http://localhost:4000/addDomain", formData, { headers });
  
      // Handle the response based on your backend behavior
      if (response.status === 200) {
        console.log("Domain added successfully:", response.data);
  setFormData(response.data)
  closeModal();
  setTimeout(() => {
    toast.success("Domains added successfully");
  }, 1000);
      } else {
        console.error("Error adding domain:", response.data);
        toast.error("Error adding domain:");
      }
    } catch (error) {
      console.error("API call failed:", error);
      toast.error("API call failed:");
    }
  };
  


  return (
    <>
      <div className="modal-container">
        <div className="heading">
          <p>Create Domains and Add DNS Records</p>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="domain-name">
              <label>
                Domain Name <span>*</span>
              </label>
              <input
                type="text"
                required
                name="domainName"
                onChange={(e) => changeHandler(e, 0, true)}
                value={formData.domainName}
                placeholder="Enter Domain Name"
              />
            </div>
            <div className="dns-records">
              <p>
                Dns Records <span>*</span>
              </p>
              {formData.dnsRecords.map((record, index) => (
                <div className="records" key={index}>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    onChange={(e) => changeHandler(e, index)}
                    value={record.name}
                  />
                  <input
                    type="text"
                    placeholder="Type"
                    required
                    name="type"
                    onChange={(e) => changeHandler(e, index)}
                    value={record.type}
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    required
                    name="value"
                    onChange={(e) => changeHandler(e, index)}
                    value={record.value}
                  />
                  <ImBin2 onClick={() => removeRecord(index)} />
                </div>
              ))}
              <button type="button" id="addRecord" onClick={addRecord}>
                Add Record
              </button>
            </div>
            <div className="submit-button">
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
      <Toaster
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
            width: "350px",
            fontSize: "18px",
          },
        }}
      />

    </>
  );
};

export default CreateDomainModal;
