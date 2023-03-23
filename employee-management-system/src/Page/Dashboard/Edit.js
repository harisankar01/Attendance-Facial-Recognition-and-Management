import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
function Edit({ selectedEmployee, setIsEditing }) {
  const id = selectedEmployee.id;
  const [firstName, setFirstName] = useState(selectedEmployee.firstName);
  const [lastName, setLastName] = useState(selectedEmployee.lastName);
  const [email, setEmail] = useState(selectedEmployee.id);
  const [date, setDate] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(selectedEmployee);
    if (selectedEmployee.birthDate) {
      const date = selectedEmployee.birthDate.split("/");
      setDate(`${date[2]}-${date[0]}-${date[1]}`);
    }
  }, []);
  function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return month + "/" + day + "/" + year;
  }
  const [value, setValue] = useState(selectedEmployee.WorkType);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleUpdate = async (e) => {
    const body = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      id: email,
      birthDate: getFormattedDate(new Date(date)),
      WorkType: value,
    });
    console.log(selectedEmployee);
    console.log(body);
    const data = await fetch(
      `http://127.0.0.1:5000/api/employee/update/${selectedEmployee.doc_id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      }
    ).then((j) => j.json());
    console.log(data);
    if (data.status == "FAILURE") {
      console.log("FAILED");
    } else {
      navigate("/");
      setIsEditing(false);
    }
  };

  return (
    <div className="small-container">
      {/* <form> */}
      <h1>Edit Employee</h1>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        type="text"
        name="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        type="text"
        name="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="date">Date</label>
      <input
        id="date"
        type="date"
        name="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          Work Type
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="in-office"
            control={<Radio />}
            label="In-office"
          />
          <FormControlLabel
            value="home"
            control={<Radio />}
            label="Work from home"
          />
        </RadioGroup>
      </FormControl>

      <div style={{ marginTop: "30px" }}>
        <input type="submit" onClick={handleUpdate} value="Update" />
        <input
          style={{ marginLeft: "12px" }}
          className="muted-button"
          type="button"
          value="Cancel"
          onClick={() => setIsEditing(false)}
        />
      </div>
      {/* </form> */}
    </div>
  );
}

export default Edit;
