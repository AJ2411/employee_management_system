// Sidebar.js

import React, { useContext, useEffect, useState } from "react";
import AddEmployee from "../components/AddEmployee";
// import DeleteEmployee from "../components/DeleteEmployee";
import EditEmployee from "../components/EditEmployee";
import Reports from "../components/Reports";
import Userprofile from "../components/Userprofile";
import { useNavigate } from "react-router";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SweetAlert from "react-bootstrap-sweetalert";
// import 'react-bootstrap-sweetalert/dist/sweetalert.css';
const Home = () => {
  const [activeTab, setActiveTab] = useState("Add Employee");
  const [showAlert, setShowAlert] = useState(false);
  const [employee,setEmployee] = useState({})

  const privacy = localStorage.getItem("privacy")

  const handleLogout = () => {
    setShowAlert(true);
  };

  const onConfirmLogout = () => {
    // Perform your logout logic here
    console.log("Logout confirmed");
    localStorage.removeItem("admin");
    localStorage.removeItem("emp_id");
    localStorage.removeItem("privacy");
    setShowAlert(false);
        navigate("/");

  };

  const onCancelLogout = () => {
    console.log("Logout cancelled");
    setShowAlert(false);
  };

  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    if (privacy == "office admin") setActiveTab("Add Employee");
    else setActiveTab("Userprofile");
  }, []);

  // const handleLogout = () => {

  // }

  return (<>
  {showAlert && (
    
<SweetAlert
  warning
  showCancel
  confirmBtnText="Yes,Logout!"
  confirmBtnBsStyle='info'
  confirmBtnCssClass="bg-red-500 text-white hover:bg-pink-700" // Tailwind CSS classes for pink button
  title="Are you sure you want to logout?"
  onConfirm={onConfirmLogout}
  onCancel={onCancelLogout}
  focusCancelBtn
> 
</SweetAlert>
        
          )}{" "}




    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800  text-white p-6 ">
        {privacy == "employee" && (
          <div className="mb-4">
            <a
              href="#"
              className={`block py-2 px-4 ${
                activeTab === "Userprofile" ? "bg-blue-500" : ""
              }`}
              onClick={() => handleTabChange("Userprofile")}
            >
              Userprofile
            </a>
          </div>
        )}

        {privacy == "office admin" && (
          <div>
            <div className="mb-4">
              <a
                href="#"
                className={`block py-2 px-4 ${
                  activeTab === "Add Employee" ? "bg-blue-500" : ""
                }`}
                onClick={() => handleTabChange("Add Employee")}
              >
                Add Employee
              </a>
            </div>
            <div className="mb-4">
              <a
                href="#"
                className={`block py-2 px-4 ${
                  activeTab === "Edit Employee" ? "bg-blue-500" : ""
                }`}
                onClick={() => handleTabChange("Edit Employee")}
              >
                Edit Employee
              </a>
            </div>
            {/* <div className="mb-4">
              <a
                href="#"
                className={`block py-2 px-4 ${
                  activeTab === "Delete Employee" ? "bg-blue-500" : ""
                }`}
                onClick={() => handleTabChange("Delete Employee")}
              >
                Delete Employee
              </a>
            </div> */}
            <div className="mb-4">
              <a
                href="#"
                className={`block py-2 px-4 ${
                  activeTab === "Reports" ? "bg-blue-500" : ""
                }`}
                onClick={() => handleTabChange("Reports")}
              >
                Reports
              </a>
            </div>
          </div>
        )}

        <div className="flex">
          <FontAwesomeIcon
            icon={faRightFromBracket}
            rotation={180}
            style={{ color: "#f4f3f0", marginLeft: "2px", marginTop: "5px" }}
          />
          <button className="ml-2" onClick={handleLogout}>
            {" "}
            Log out
          </button>
          
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-scroll">
        {/* Render the component based on the active tab */}
        {activeTab === "Add Employee" && <AddEmployee />}
        {activeTab === "Edit Employee" && <EditEmployee setEmployee={setEmployee} employee={employee} />}
        {/* {activeTab === "Delete Employee" && <DeleteEmployee />} */}
        {activeTab === "Reports" && <Reports setActiveTab={setActiveTab} setEmployee={setEmployee} employee={employee}/>}
        {activeTab === "Userprofile" && <Userprofile />}
      </div>
    </div>
    </>
  );
};

export default Home;
