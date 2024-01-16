import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import axios from "axios";
import { AdminContext } from "./context/Context";
import { API_SERVER_URL } from "../app_constant";

const validationSchema = Yup.object().shape({
  emp_id: Yup.string().required("Employee ID is required"),
  full_name: Yup.string().required("Full Name is required"),
  mobile_number: Yup.number().required("Mobile Number is required"),
  dept_id: Yup.string().required("Department is required"),
  // photo: Yup.mixed().required("Photo is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  address_line_1: Yup.string().required("Address Line 1 is required"),
  address_line_2: Yup.string().required("Address Line 2 is required"),
  district: Yup.string().required("District is required"),
  tehsil: Yup.string().required("Tehsil is required"),
  city_village: Yup.string().required("City/Village is required"),
  pincode: Yup.number().required("Pin Code is required"),
  start_date: Yup.date().required("Start Date is required"),
  // resign: Yup.string().required("Resigned is required"),
  // end_date: Yup.date().when("resign", {
  //   is: "Yes",
  //   then: Yup.date().re("End Date is required"),
  // }),
  salary: Yup.number().required("Salary is required"),
});

// Define the initial form values

let data1
// Component for the form
const EditEmployee = ({employee,setEmployee}) => {

  const {adminType} = useContext(AdminContext)
  const [data,setdata] = useState([])
  let data1;

  console.log("employee",employee)

  // const fetchemployee = async () => {
  //   await axios.get(`http://localhost/api/employee.php?emp_id=${adminType.emp_id}` ).then((res) => {
  //     console.log("res",res.data.data)
  //     setdata(res.data.data)
  //      data1 = res.data.data
  //     setTimeout(() =>{
  //   console.log("data",data)
  //   console.log("newdata",data1)
  //     },2000)
  //   }).catch((err) => {
  //     console.log("err",err)
  //   })
  //     }

  const initialValues = {
    emp_id: employee?.emp_id || "",
    full_name: employee?.full_name || "",
    mobile_number: employee?.mobile_number || "",
    dept_id: employee?.dept_id || "",
    photo: null,
    // photo: employee?.photo || "",
    email: employee?.email || "",
    password: "",
    address_line_1: employee?.address_line_1 || "",
    address_line_2: employee?.address_line_2 || "",
    district: employee?.district || "",
    tehsil: employee?.tehsil || "",
    city_village: employee?.city_village || "",
    pincode: employee?.pincode || "",
    start_date: employee?.start_date || "",
    resign: employee?.resign || "No",
     end_date:null,
   // end_date: employee?.end_date == "0000-00-00" ? null : employee?.end_date,
    salary: employee?.salary || "",
  };

  const fd = new FormData()
  // Function to handle form submission
  const handleSubmit = async(values, { setSubmitting }) => {
    // Perform the form submission logic here
    
    // await axios.put(`http://localhost/api/editemp.php`,values)
    await axios.put(API_SERVER_URL +"/api/editemp.php",values)
    .then((res) => {
      console.log("res",res)
    console.log("values",values);
    //alert(res.data.message)
    alert("record successfully updated");

    }).catch((err) => {
      console.log("err" ,err) 
    })
    setSubmitting(false);

  };

  // useEffect(() => {
  //   fetchemployee()
  // },[adminType.emp_id])
  // useEffect(() => {
  //   console.log("data", data1);
  // }, [data1]);
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {/* Form element */}
        <Form>
          <div className=" mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            {/* Formik wrapper for the form */}
            <div className="grid grid-cols-4">
              {/* Employee ID field */}
              <div className="mb-4 mx-3">
                <label
                  htmlFor="employeeId"
                  className="block text-sm font-medium text-gray-700 "
                >
                  Employee ID
                </label>
                <Field
                  type="text"
                  id="employeeId"
                  name="emp_id"
                  readOnly
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="emp_id"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Full Name field */}
              <div className="mb-4 mx-3">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Field
                  type="text"
                  id="fullName"
                  name="full_name"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="full_name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Mobile Number field */}
              <div className="mb-4 mx-3">
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile Number
                </label>
                <Field
                  type="number"
                  id="mobileNumber"
                  name="mobile_number"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="mobile_number"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

             {/* Department field */}
             <div className="mb-4 mx-3">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department
                </label>
                <Field
                  as="select" // Change the input type to "select" for a dropdown
                  id="department"
                  name="dept_id"
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="1">Software Developement</option>
                  <option value="2">System Administration</option>
                  <option value="3">Application Developers</option>
                  <option value="4">Testers</option>
                  <option value="5">Business Intelligence Analysts</option>
                  <option value="6">Scrum Masters</option>
                  <option value="7">Cloud Architects</option>
                  <option value="8">Production Department</option>
                  <option value="9">Helpdesk Manager</option>
                  <option value="10">IT Trainers</option>
                  <option value="11">System Engineer</option>
                  <option value="12">Network Administrators</option>
                  <option value="13">Web Developers</option>
                  <option value="14">Database Developers</option>
                  <option value="15">QA Engineers</option>

                </Field>
                <ErrorMessage
                  name="dept_id"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              {/* Photo field
              <div className="mb-4 mx-3">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Photo
                </label>
                <Field
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="photo"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div> */}
            </div>
          </div>

          <div className=" mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            {/* Formik wrapper for the form */}
            <div className="grid grid-cols-4">
              {/* Employee ID field */}
              <div className="mb-4 mx-3">
                <label
                  htmlFor="AddressLine1"
                  className="block text-sm font-medium text-gray-700 "
                >
                  Address Line 1
                </label>
                <Field
                  type="text"
                  id="AddressLine1"
                  name="address_line_1"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="AddressLine1"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Full Name field */}
              <div className="mb-4 mx-3">
                <label
                  htmlFor="AddressLine2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address Line 2
                </label>
                <Field
                  type="text"
                  id="AddressLine2"
                  name="address_line_2"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="AddressLine2"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Full Name field */}
              <div className="mb-4 mx-3">
                <label
                  htmlFor="District"
                  className="block text-sm font-medium text-gray-700"
                >
                  District
                </label>
                <Field
                  type="text"
                  id="District"
                  name="district"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="District"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Full Name field */}
              <div className="mb-4 mx-3">
                <label
                  htmlFor="Tehsil"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tehsil
                </label>
                <Field
                  type="text"
                  id="Tehsil"
                  name="tehsil"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="Tehsil"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Full Name field */}
              <div className="mb-4 mx-3">
                <label
                  htmlFor="City/Village"
                  className="block text-sm font-medium text-gray-700"
                >
                  City/Village
                </label>
                <Field
                  type="text"
                  id="City/Village"
                  name="city_village"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="City/Village"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Pin Code Number field */}
              <div className="mb-4 mx-3">
                <label
                  htmlFor="pincode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pin Code
                </label>
                <Field
                  type="number"
                  id="pincode"
                  name="pincode"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="pincode"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <div className="mb-4">
              <label
                htmlFor="startDate"
                className="block text-gray-700 font-bold"
              >
                Start Date
              </label>
              <Field
                type="date"
                id="startDate"
                name="start_date"
                className="form-input mt-1 block w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="resign" className="block text-gray-700 font-bold">
                Resigned
              </label>
              <Field
                as="select"
                id="resign"
                name="resign"
                className="form-select mt-1 block w-full"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </Field>
            </div>

            <Field name="resign">
              {({ field, form }) => (
                <div className="mb-4">
                  <label
                    htmlFor="endDate"
                    className="block text-gray-700 font-bold"
                  >
                    End Date
                  </label>
                  <DatePicker
                    id="endDate"
                    name="end_date"
                    value={field.value == "No" && ""}
                    selected={form.values.end_date == null ? null : new Date(form.values.end_date)}
                    // selected={form.values.end_date == "0000-00-00" ?      "0000-00-00" :new Date(form.values.end_date)}
                    onChange={(date) => form.setFieldValue("end_date", date)}
                    className="form-input mt-1 block w-full"
                    disabled={field.value == "No"}
                    // disabled={form.values.end_date == null}
                  />
                </div>
              )}
            </Field>

            <div className="mb-4">
              <label htmlFor="salary" className="block text-gray-700 font-bold">
                Salary
              </label>
              <Field
                type="number"
                id="salary"
                name="salary"
                className="form-input mt-1 block w-full"
              />
            </div>
          </div>

          <div className="mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            {/* Formik wrapper for the form */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                UserID (Email)
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default EditEmployee;
