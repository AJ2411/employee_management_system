import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AdminContext } from "./context/Context";
import pic from "../images/bg-remove.png";
import axios from "axios";
import { toast } from "react-toastify";
import { API_SERVER_URL } from "../app_constant";

var myuser = "";
const dynamicuserprofile = () => {
  return myuser;
};
export { dynamicuserprofile };

var type = "";
const informationtype = () => {
  return type;
};
export { informationtype };

const LoginCard = () => {
  const [userType, setUserType] = useState("employee");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { adminType, updateMyState,setAdminType } = useContext(AdminContext);

  console.log("adminType",adminType)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
     const data = {
      email:userId
      ,password:password
     }

   
    //  await axios.post("http://localhost/api/login.php",data )
     await axios.post(API_SERVER_URL + "/api/login.php",data )

    .then((res) => {
      console.log("response=>" , res.data.message)
      console.log("response data=>" , res.data)
      if(res.data.message == "Login successful.") {
        toast.success("login successful")
        localStorage.setItem("emp_id",res.data.emp_id)
        localStorage.setItem("privacy",res.data.privacy)
        setAdminType((prevstate) => ({ ...prevstate, emp_id: res.data.emp_id }));

        setTimeout(() => {
            navigate("/auth");
          }, 2000);

      }
      else alert("Login Fail")
    })
    .catch((err) => {
      console.log("error", err)
      
    })

  }

    
  return (
    <>
      <img src={pic} alt="bg-remove" className="mr-32" />
      <form onSubmit={handleLogin}>
      <div className=" p-8 rounded-lg shadow-md border-2 border-blue-500 w-96 h-96">
      <div className="mb-4 mt-8">
      <label className="block text-gray-800">
      UserID:
      <input
        type="text"
        required
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
      />
    </label>
  </div>

  <div className="mb-4 mt-8">
    <label className="block text-gray-800">
      Password:
      <input
        required
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
      />
      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          onChange={() => setShowPassword(!showPassword)}
          className="mr-2"
        />
        <span className="text-gray-600">Show Password</span>
      </div>
    </label>
  </div>

  <div className="mx-auto text-center">
    <button
      type="submit"
      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-blue"
    >
      Login
    </button>
  </div>


        {/* Popup Modal */}
        {showModal && (
          <div className="fixed inset-0 z-10 overflow-y-auto   ">
            <div className="flex  justify-center mt-10 ">
              <div className=" p-6 text-center rounded-lg shadow-md border-2 border-blue-500">
                <p className="font-bold text-2xl ">Login Successful</p>
                
              </div>
            </div>
          </div>
        )}
      </div>
      </form>
    </>
  );
};

export default LoginCard;
