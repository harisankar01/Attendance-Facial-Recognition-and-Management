const express = require("express");

const {
  getCustomers,
  getAttendence,
  UpdateUser,
  AddUser,
  DeleteUser,
  SetBarcode,
  GetBarcode,
  ApplyLeave,
  Visualize,
} = require("../controller/employeeController");

const router = express.Router();

router.get("/all", getCustomers);

router.get("/emp/:id", getAttendence);

router.post("/update/:id", UpdateUser);

router.post("/add", AddUser);

router.delete("/delete/:id", DeleteUser);

router.put("/barcode/:new_id", SetBarcode);

router.get("/barcode", GetBarcode);

router.post("/leave/:id", ApplyLeave);

router.get("/visualize/:id", Visualize);

module.exports = router;
