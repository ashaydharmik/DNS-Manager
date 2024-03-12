import React, { useState } from "react";
import "./dashboard.scss";
import { IoLogOutOutline } from "react-icons/io5";
import LogoutModal from "../Modal/LogoutModal/LogoutModal";
import DomainTable from "./Table/DomainTable";
const Dashboard = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };
  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <section className="dashboard-container">
        <div className="left-box">
          <p>Dashboard</p>
        
        <p onClick={handleLogoutClick}>
          <IoLogOutOutline />
          <span>Log out</span>
        </p>
   
     
        </div>
        <div className="right-box">
       <div className="heading">
        <h1>DNS MANAGER</h1>
        </div>
        <div className="dns-table">
          <DomainTable/>
        </div>

        </div>
      </section>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={handleCloseLogoutModal}
      />
    </>
  );
};

export default Dashboard;
