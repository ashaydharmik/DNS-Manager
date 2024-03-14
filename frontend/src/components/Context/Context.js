import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [showRegister, setShowRegister] = useState(true);
  const [fetchData, setFetchData] = useState([ ])
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editCardData, setEditCardData] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [showAnalytics, setShowAnalytics]= useState(false)
  const [showDashboard, setShowDashboard]= useState(false)
const navigate = useNavigate()
  const handleAnalyticsClick = () => {
    setShowAnalytics(true); // Set showAnalytics to true when clicking on analytics
    setShowDashboard(false); // Ensure dashboard is set to false when navigating to analytics
    console.log("analytics");
  };
 

  const auth = JSON.parse(localStorage.getItem("user")) || { token: null };
  const userToken = auth.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userToken}`,
  };

  const fetchDomains = ()=>{

    axios.get("http://localhost:4000/allDomain",{headers})
    .then((res)=>{
       console.log(res.data)
            setFetchData(res.data.domains);
          
    })
    .catch((err)=>{
        console.log(err)
    })
}

const handleEdit = async(id) => {
  try {
    const response = await axios.get(`http://localhost:4000/fetchSingleDomain/${id}`,{headers});
    
    if (response.status === 200) {
      const singleDomainData = response.data.availableDomain; // Assuming the API response structure
      console.log(singleDomainData)
      // Open the modal and pass the prefilled data
      setEditCardData(singleDomainData);
      setEditModalVisible(true);
    } else {
      toast.error("Error fetching single domain data");
      // Handle error, e.g., show an error message
    }
  } catch (error) {
    toast.error("API call failed:", error);
    // Handle error, e.g., show an error message
  }
};

const handleDelete = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:4000/deleteDomain/${id}`, { headers });

    // Handle the response based on your backend behavior
    if (response.status === 200) {
      console.log("Domain deleted successfully");
      fetchDomains(); 
      toast.success("Domain deleted successfully");
    } else {
      console.error("Error deleting domain:", response.data);
      toast.error("Error deleting domain");
    }
  } catch (error) {
    console.error("API call failed:", error);
    toast.error("An error occurred");
  }
};

  const showLoginForm = () => {
    setShowRegister(false);
  };

 

  return (
    <AppContext.Provider
      value={{
        navigate,
        showLoginForm,
        showRegister,
        setShowRegister,
        fetchDomains,
        fetchData,
        editModalVisible, 
        setEditModalVisible,
        editCardData,
        handleEdit,
        handleDelete,
        handleAnalyticsClick,
        setShowAnalytics,
        showAnalytics,
        handleAnalyticsClick,showDashboard, setShowDashboard
      }}
    >
      {children}

      <ToastContainer position="top-right" autoClose={2000} />
    </AppContext.Provider>
  );
};

const useGlobal = () => {
  return useContext(AppContext);
};
export { AppContext, useGlobal, AppProvider };
