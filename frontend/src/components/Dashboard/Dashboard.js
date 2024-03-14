import React, { useState } from "react";
import "./dashboard.scss";
import { IoLogOutOutline } from "react-icons/io5";
import LogoutModal from "../Modal/LogoutModal/LogoutModal";
import DomainTable from "./Table/DomainTable";
import { useGlobal } from "../Context/Context";
import DomainChart from "./Chart/DomainChart";
const Dashboard = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
const {setShowAnalytics,showAnalytics,showDashboard, setShowDashboard} = useGlobal()



  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };
  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

 
  const handleDashboard = () => {
    setShowDashboard(true);
    setShowAnalytics(false); // Ensure analytics is set to false when navigating to the dashboard
    console.log("open");
  };

  

  let dashboardContent;
  if (showDashboard) {
    dashboardContent = <DomainTable />;
  } else if (showAnalytics) {
    dashboardContent = <DomainChart />;
  } else {
    dashboardContent = <DomainTable />;
  }


  return (
    <>
      <section className="dashboard-container">
        <div className="left-box">
          <p onClick={handleDashboard}>Dashboard</p>
        
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
      {dashboardContent}
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
