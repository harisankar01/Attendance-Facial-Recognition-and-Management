import React, { useState } from "react";
import { Button, Modal } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import AttendenceTable from "../../Components/AttendenceTable";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function List({ employees, handleEdit, handleDelete }) {
  const [open, setopen] = useState(false);
  const [close, setclose] = useState(false);
  const handleClose = () => setopen(false);
  const [Attendence, setAttendence] = useState([]);
  const showAttendence = async (doc) => {
    const data = await fetch(`http://127.0.0.1:5000/api/employee/emp/${doc}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((j) => j.json());
    if (data.data == "ERROR") {
      setclose(true);
    } else {
      setAttendence(data.data);
      setopen(true);
    }
    // console.log("da");
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [newID, setnewID] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openLeave = Boolean(anchorEl);
  const [open2, setopen2] = useState(false);
  const [open3, setopen3] = useState(false);
  const [leaveDate, setleaveDaate] = useState(new Date());
  const [piedata, setpiedata] = useState(null);
  const Visualize = async (finaleID) => {
    console.log(finaleID);
    const data = await fetch(
      `http://127.0.0.1:5000/api/employee/visualize/${finaleID}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then((j) => j.json());
    console.log(data);
    setpiedata({
      labels: ["Absent", "Present"],
      datasets: [
        {
          label: "Attendence Comparision",
          data: [data.absent, data.present],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 3,
        },
      ],
    });
    // setopen3(true);
  };
  const applyLeave = async () => {
    const dateparts = new Date(leaveDate)
      .toDateString("default", { month: "long" })
      .split(" ");
    console.log(dateparts);
    const month = new Date(leaveDate).toLocaleString("default", {
      month: "long",
    });
    const finale = `${dateparts[2]} ${month} ${dateparts[3]}`;
    const data = await fetch(
      `http://127.0.0.1:5000/api/employee/leave/${newID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: finale,
          normal_date: leaveDate,
        }),
      }
    ).then((j) => j.json());
    console.log(data?.status);
  };

  return (
    <div className="contain-table">
      {piedata && (
        // <Modal
        //   open={open3}
        //   onClose={() => {
        //     setopen3(false);
        //     setAnchorEl(null);
        //   }}
        //   aria-labelledby="modal-modal-title"
        //   aria-describedby="modal-modal-description"
        // >
        <Pie data={piedata} />
      )}
      <Modal
        open={open2}
        onClose={() => {
          setopen2(false);
          setAnchorEl(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            value={leaveDate}
            onChange={(e) => setleaveDaate(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => {
              applyLeave();
            }}
            color="success"
          >
            {" "}
            Mark Leave{" "}
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={close}
        autoHideDuration={6000}
        onClose={() => setclose(false)}
      >
        <Alert
          onClose={() => setclose(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          No attendence Found for the Employee
        </Alert>
      </Snackbar>
      {Attendence.length && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AttendenceTable data={Attendence} />
        </Modal>
      )}
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Attendence</th>
            <th>Date OF Birth</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
            <th colSpan={2} className="text-center">
              More options
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee.id}>
                <td>{i + 1}</td>
                <td>
                  {employee.firstName} {employee.lastName}
                </td>
                <td>{employee.id}</td>
                <td>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => showAttendence(employee.doc_id)}
                  >
                    {" "}
                    Show Attendence{" "}
                  </Button>
                </td>
                <td>{employee.birthDate} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee.doc_id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee.doc_id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
                <td className="text-left">
                  <Button
                    id="fade-button"
                    variant="contained"
                    aria-controls={openLeave ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openLeave ? "true" : undefined}
                    onClick={(event) => {
                      setnewID(employee.doc_id);
                      setAnchorEl(event.currentTarget);
                    }}
                  >
                    Options
                  </Button>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={openLeave}
                    onClose={() => setAnchorEl(null)}
                    TransitionComponent={Fade}
                  >
                    <MenuItem
                      onClick={() => {
                        // setnewID(employee.doc_id);
                        console.log(newID);
                        setopen2(true);
                      }}
                    >
                      Mark Leave
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        console.log(newID);
                        Visualize(newID);
                      }}
                    >
                      See Attendence
                    </MenuItem>
                  </Menu>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
