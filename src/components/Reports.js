// EmployeeReport.js
import axios from "axios";
import React, { useState, useEffect, useContext, useMemo } from "react";
import DataTable from "react-data-table-component";
import { AdminContext } from "./context/Context";
import { API_SERVER_URL } from "../app_constant";
// import { useNavigate } from 'react-router';

const Report = ({ setActiveTab, employee, setEmployee }) => {
  const { adminType, setAdminType } = useContext(AdminContext);
  const [filterText, setFilterText] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [resignedFilter, setResignedFilter] = useState("");

  console.log("adminType", adminType.emp_id);
  console.log("setAdminType", setAdminType);
  const [data1, setData1] = useState([]);

  const fetchdata = async () => {
    // await axios.get("http://localhost/api/report.php")
    await axios.get(API_SERVER_URL + "/api/report.php")
      .then((res) => {
        console.log("res data", res.data.data);
        setData1(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    // Fetch or set your employee data here
    fetchdata();
    // setData(sampleData);
  }, []);

  const columns = [
    { name: "emp_id", selector: "emp_id", sortable: true },
    // { name: "photo", selector: "photo", sortable: true },
    // {
    //   name: "photo",
    //   cell: (row) => (
    //     <img
    //       src={`http://localhost/uploads/${row.photo}`}
    //       alt={row.full_name}
    //       style={{
    //         width: "100px",
    //         height: "100px",
    //         borderRadius: "50%",
    //         marginTop: "15px",
    //         marginBottom: "15px",
    //         marginRight: "50px",
    //       }}
    //     />
    //   ),
    //   sortable: false,
    // },
    { name: "full_name", selector: "full_name", sortable: true },
    { name: "mobile_number", selector: "mobile_number", sortable: true },
    { name: "dept_name", selector: "dept_name", sortable: true },
    { name: "email", selector: "email", sortable: true },

    { name: "address_line_1", selector: "address_line_1", sortable: true },
    { name: "address_line_2", selector: "address_line_2", sortable: true },
    { name: "district", selector: "district", sortable: true },
    { name: "tehsil", selector: "tehsil", sortable: true },
    { name: "salary", selector: "salary", sortable: true },
    { name: "start_date", selector: "start_date", sortable: true },
    // { name: "end_date", selector: "end_date", sortable: true },
    { name: "end_date", 
  cell: (row) => (
    <div> { row.end_date == "0000-00-00" ? "NA" : row.end_date}</div>
  ) },
    { name: "resign", selector: "resign", sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex  ml-[-30px] w-full space-x-2 m-5">
          <button
            onClick={() => handleEdit(row)}
            className="bg-green-500 text-white font-bold w-48 h-10 rounded-md"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="bg-red-500 text-white  font-bold w-48 h-10  rounded-md "
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (employee) => {
    // Implement your edit functionality here
    // setAdminType((prevAdminType) => ({
    //   ...prevAdminType,
    //   emp_id: employee.emp_id,
    // }));
    setEmployee(employee);

    setActiveTab("Edit Employee");
    // navigate("")

    console.log("Edit employee:", employee.emp_id);
  };

  const handleDelete = async (employee) => {
    console.log("Emp_id", employee.emp_id);
    // await axios.delete(`http://localhost/api/delete.php?emp_id=${employee.emp_id}`)
    await axios.delete(API_SERVER_URL+ `/api/delete.php?emp_id=${employee.emp_id}`)
      .then((res) => {
        console.log("res", res);
        alert(res.data);
        fetchdata();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const filteredData = useMemo(() => {
    return data1.filter(
      (item) =>
        item.full_name.toLowerCase().includes(filterText.toLowerCase()) &&
        item.dept_id.includes(departmentFilter) &&
        item.salary.toString().includes(salaryFilter) &&
        item.privacy === "employee" &&
        (startDateFilter === "" ||
          new Date(item.start_date) >= new Date(startDateFilter)) &&
        (endDateFilter === "" ||
          new Date(item.start_date) <= new Date(endDateFilter)) &&
        (resignedFilter === "" ||
          item.resign.toLowerCase().includes(resignedFilter.toLowerCase()))
    );
  }, [
    data1,
    filterText,
    departmentFilter,
    salaryFilter,
    startDateFilter,
    endDateFilter,
    resignedFilter,
  ]);

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };
  const customFilterText = () => (
    <div>
      <input
        type="text"
        placeholder="Filter by name, mobile number, or email"
        value={filterText}
        onChange={handleFilterChange}
      />
      <br />
      <label>
        Department:{" "}
        <input
          type="text"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        />
      </label>
      <br />
      <label>
        Salary:{" "}
        <input
          type="text"
          value={salaryFilter}
          onChange={(e) => setSalaryFilter(e.target.value)}
        />
      </label>
      <br />
      <label>
        Start Date:{" "}
        <input
          type="text"
          value={startDateFilter}
          onChange={(e) => setStartDateFilter(e.target.value)}
        />
      </label>
      <br />
      <label>
        End Date:{" "}
        <input
          type="text"
          value={endDateFilter}
          onChange={(e) => setEndDateFilter(e.target.value)}
        />
      </label>
      <br />
      <label>
        Resigned:{" "}
        <input
          type="text"
          value={resignedFilter}
          onChange={(e) => setResignedFilter(e.target.value)}
        />
      </label>
    </div>
  );

  return (
    <div className="container mx-auto my-8  ">
      <DataTable
        title="Employee Data"
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={5}
        subHeader
        subHeaderComponent={customFilterText}
      />
    </div>
  );
};

export default Report;
