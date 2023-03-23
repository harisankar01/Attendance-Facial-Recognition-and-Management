import React from "react";

function Header({ setIsAdding, setshowBarcode }) {
  return (
    <header>
      <h1>Employee Management</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
          marginBottom: "18px",
        }}
      >
        <button onClick={() => setIsAdding(true)} className="round-button">
          Add New Employee
        </button>
        <button onClick={() => setshowBarcode(true)} className="round-button">
          Genreate Barcode
        </button>
      </div>
    </header>
  );
}

export default Header;
