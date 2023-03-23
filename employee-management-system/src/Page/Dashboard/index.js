import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import Header from "./Header";
import List from "./List";
import Add from "./Add";
import Edit from "./Edit";

import Barcode from "./Barcode";
import { Modal } from "@mui/material";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showBarcode, setshowBarcode] = useState(false);
  const [barvalue, setbarvalue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const data = await fetch("http://127.0.0.1:5000/api/employee/all", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((j) => j.json());
      setEmployees(data.data);
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      const data = await fetch("http://127.0.0.1:5000/api/employee/barcode", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((j) => j.json());
      console.log(data);

      setbarvalue(data.data.code);
    };
    getData();
  }, []);

  const handleEdit = (id) => {
    const [employee] = employees.filter((employee) => employee.doc_id === id);

    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.value) {
        const data = await fetch(
          `http://127.0.0.1:5000/api/employee/delete/${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        ).then((j) => j.json());
        if (data.status == "FAILURE") {
          console.log("FAILED");
        } else {
          setEmployees(employees.filter((employee) => employee.doc_id !== id));
        }
      }
    });
  };

  return (
    <div className="container">
      {/* List */}
      <Modal
        closeAfterTransition
        open={showBarcode}
        onClose={() => {
          setshowBarcode(false);
        }}
      >
        <Barcode
          barvalue={barvalue}
          setbarvalue={setbarvalue}
          setshowBarcode={setshowBarcode}
        />
      </Modal>
      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} setshowBarcode={setshowBarcode} />
          <List
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {/* Add */}
      {isAdding && (
        <Add
          employees={employees}
          setEmployees={setEmployees}
          setIsAdding={setIsAdding}
        />
      )}
      {/* Edit */}
      {isEditing && (
        <Edit selectedEmployee={selectedEmployee} setIsEditing={setIsEditing} />
      )}
    </div>
  );
}

export default Dashboard;
