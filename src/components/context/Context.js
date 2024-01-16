import { createContext, useContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {

  const admin = localStorage.getItem("admin")
  const emp_id = localStorage.getItem("emp_id")
  const [adminType, setAdminType] = useState({
    admin: admin,
    emp_id: emp_id
});





const updateMyState = (newAdmin) => {
  setAdminType((prevAdminType) => ({
    ...prevAdminType,
    admin: newAdmin,
  }));
  console.log("Context function call..", adminType);
};



  return (
    <AdminContext.Provider value={{
        adminType,updateMyState,setAdminType
    }  }>
      {children}
    </AdminContext.Provider>
  );
};


