
import React, { useContext, useEffect, useState } from "react";
import { dynamicuserprofile } from "./LoginCard";
import { informationtype } from "./LoginCard";
import axios from "axios";
import { AdminContext } from "./context/Context";
import "react-datepicker/dist/react-datepicker.css";

function Userprofile() {
  const [employeeData, setEmployeeData] = useState([]);
  const [resigned, setResigned] = useState("No");
  const [sectionsOpen, setSectionsOpen] = useState({
    personalInfo: true,
    addressInfo: true,
    employmentInfo: true,
  });
  const emp_id = localStorage.getItem("emp_id")

  // var id = dynamicuserprofile();
  // console.log("hello");
  // console.log(`NAME : ${id}`);

  // var abc = informationtype();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost/api/employee.php?emp_id=${emp_id}`
        );
        console.log("res data=>", response.data.data);
        console.log(
          "url",
          `http://localhost/api/employee.php?emp_id=${emp_id}`
        );
        setEmployeeData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(employeeData);
  console.log("emp_id", emp_id);

  const toggleSection = (sectionName) => {
    setSectionsOpen((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  function formatDateString(inputDate) {
    const dateObject = new Date(inputDate);

    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear().toString().slice(0);

    return `${day}:${month}:${year}`;
  }

  return (
    <>
      {/* <h1>
        Hello {abc} {id}
      </h1> */}

      <div className="bg-white border rounded border-gray-300 mb-10">
        <div className="flex items-center justify-between p-4 cursor-pointer">
          <h1 className="font-bold text-black text-xl">Personal Information</h1>
          <button
            onClick={() => toggleSection("personalInfo")}
            className="focus:outline-none"
          >
            {sectionsOpen.personalInfo ? "-" : "+"}
          </button>
        </div>
        {sectionsOpen.personalInfo && (
          <div className="flex">
            <img
              src={`http://localhost/uploads/${employeeData.photo}`}
              alt="Profile"
              className="w-28 h-28 ml-5 mb-5 rounded-full object-cover border-4 border-white shadow-md"
            />
            <div className="ml-7 pt-2">
              <h1 className="font-bold text-black text-4xl inline">
                {employeeData.full_name}
              </h1>
            </div>

            <div className="flex justify-between mt-4 ">
            <div className="flex-col ml-24 text-center  ">
             <h1 className="font-bold text-black text-xl">Mobile Number</h1>
            <h1 className="">{employeeData.mobile_number}</h1>
           </div>

           <div className="flex-col ml-12 text-center ">
             <h1 className="font-bold text-black text-xl">Employee ID</h1>
            <h1 className="">{employeeData.emp_id}</h1>
           </div>

           <div className="flex-col ml-12  text-center ">
             <h1 className="font-bold text-black text-xl ">Department</h1>
             <h1 className="">{employeeData.dept_name}</h1>
           </div>

        
           <div className="flex-col ml-12  text-center  ">
             <h1 className="font-bold text-black text-center text-xl">User ID</h1>
             <h1 className="">{employeeData.email}</h1>
        </div>

        </div>
          </div>
        )}
      </div>

      <div className="bg-white h-52 mb-10 border rounded border-gray-300">
        <div className="flex items-center justify-between p-4 cursor-pointer">
          <h1 className="font-bold text-black text-xl">Address Information</h1>
          <button
            onClick={() => toggleSection("addressInfo")}
            className="focus:outline-none"
          >
            {sectionsOpen.addressInfo ? "-" : "+"}
          </button>
        </div>
        {sectionsOpen.addressInfo && (
          <div className="flex justify-between">
            <div className="flex-col  mt-5 ml-14 text-center  ">
              <h1 className="font-bold text-black text-xl">Address Line 1</h1>
              <h1 className="">{employeeData.address_line_1}</h1>
            </div>
         <div className="flex-col mt-5  text-center mr-5  ">
             <h1 className="font-bold text-black text-xl">Address Line 2</h1>
             <h1 className="">{employeeData.address_line_2}</h1>
           </div>

           <div className="flex-col  mt-5  text-center ">
            <h1 className="font-bold text-black text-xl">District</h1>
             <h1 className="">{employeeData.district}</h1>
           </div>

           <div className="flex-col  mt-5 text-center  ">
             <h1 className="font-bold text-black text-xl">Tehsil</h1>
             <h1 className="">{employeeData.tehsil}</h1>
           </div>
      

         <div className="flex ">
           <div className="flex-col  mt-5 text-center mr-14 ">
             <h1 className="font-bold text-black text-xl">City/Village</h1>
             <h1 className="">{employeeData.city_village}</h1>
           </div>

           <div className="flex-col  mt-5 mr-14 text-center ">
             <h1 className="font-bold text-black text-xl">Pin Code</h1>
             <h1 className="">{employeeData.pincode}</h1>
          </div>
          </div>
          </div>
        )}
      </div>

      <div className="bg-white h-52 border rounded border-gray-300 mb-10">
        <div className="flex items-center justify-between p-4 cursor-pointer">
          <h1 className="font-bold text-black text-xl">Employment Information</h1>
          <button
            onClick={() => toggleSection("employmentInfo")}
            className="focus:outline-none"
          >
            {sectionsOpen.employmentInfo ? "-" : "+"}
          </button>
        </div>
        {sectionsOpen.employmentInfo && (
          <div className="flex">
            <div className=" flex mt-5 ">
              <div className="flex-col ml-14">
              <h1 className="font-bold text-black text-xl ">Start Date</h1>
              <h1 className="ml-2">
                {formatDateString(employeeData.start_date)}
              </h1>
              </div>
              
              <div className="flex">
              
               
              <div className="flex-col ml-28 text-center">
              <h1 className="font-bold text-black text-xl  ">Resigned</h1>
              <h1 className="ml-2">
              {employeeData.resign == "Yes" ? "yes"  : " No"}
              </h1>
              </div>

               {employeeData.end_date  && (
                 <div className="ml-28 text-center">
                   {/* <h1 className="font-bold text-black text-xl mt-5  ">:Yes</h1> */}
                    <h1 className="font-bold text-black text-xl  ">
                    End Date
                 </h1>
                   {/* <h1 className="ml-32  ">{employeeData.end_date}</h1> */}
                   <h1 className=" ">{employeeData.end_date == "0000-00-00" ? ("NA") : formatDateString(employeeData.end_date)}</h1>
                 
                 
                 
                 </div>
               )}

               <div className="ml-28 text-center">
               <h1 className="font-bold text-black text-xl text-right ">Salary</h1>
               <h1 className="">{employeeData.salary}</h1>
               </div>
             </div>
             <div/>

            </div>
            
          </div>
        )}
      </div>

     
          
    </>
  );
}

export default Userprofile;
