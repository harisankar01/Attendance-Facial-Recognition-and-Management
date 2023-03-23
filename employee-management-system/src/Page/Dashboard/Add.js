import React, { useState, useRef, useEffect } from "react";
import { useGeolocated } from "react-geolocated";

function Add({ employees, setEmployees, setIsAdding }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return month + "/" + day + "/" + year;
  }
  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      id: email,
      password: password,
      birthDate: getFormattedDate(new Date(date)),
      lat: coords.latitude,
      lon: coords.longitude,
    });

    console.log(body);
    const data = await fetch(`http://127.0.0.1:5000/api/employee/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    }).then((j) => j.json());
    if (data.status == "FAILURE") {
      console.log("FAILED");
    } else {
      setIsAdding(false);
    }
  };

  return (
    <div className="small-container">
      {/* <form > */}
      <h1>Add Employee</h1>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        type="text"
        ref={textInput}
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
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="text"
        name="salary"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="date">Date</label>
      <input
        id="date"
        type="date"
        name="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div style={{ marginTop: "30px" }}>
        <input type="submit" value="Add" onClick={handleAdd} />
        <input
          style={{ marginLeft: "12px" }}
          className="muted-button"
          type="button"
          value="Cancel"
          onClick={() => setIsAdding(false)}
        />
      </div>
      {/* </form> */}
    </div>
  );
}

export default Add;
