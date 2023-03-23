const { db } = require("../config/db");
const {
  collection,
  getDocs,
  collectionGroup,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
  Timestamp,
} = require("firebase/firestore");
exports.getCustomers = async (req, res) => {
  const collRef = collectionGroup(db, "Employee");
  await getDocs(collRef).then((querySnapshot) => {
    if (!querySnapshot.empty) {
      const newData = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          doc_id: doc.id,
        };
      });

      return res.status(200).json({
        data: newData,
      });
    }
  });
};

exports.getAttendence = async (req, res) => {
  const id = req.params.id;
  const collRef = collection(db, `Employee/${id}/Record`);
  await getDocs(collRef).then((querySnapshot) => {
    if (!querySnapshot.empty) {
      const newData = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          doc_id: doc.id,
        };
      });
      return res.status(200).json({
        data: newData,
      });
    } else {
      return res.status(400).json({
        data: "ERROR",
      });
    }

    // const newRed= collection(db, "Employee", "Record")
  });
};

exports.UpdateUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const body = req.body;
  console.log(body);
  const docsRef = doc(db, "Employee", `${id}`);
  updateDoc(docsRef, body)
    .then(() => {
      return res.status(200).json({
        status: "SUCCESS",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        status: "FAILURE",
      });
    });
};

exports.AddUser = async (req, res) => {
  const body = req.body;
  const col = collection(db, "Employee");
  const docR = doc(col);
  console.log(docR.id);
  setDoc(doc(db, "Employee", `${docR.id}`), body)
    .then(() => {
      return res.status(200).json({
        status: "SUCCESS",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        status: "FAILURE",
      });
    });
};

exports.DeleteUser = async (req, res) => {
  const id = req.params.id;
  await deleteDoc(doc(db, "Employee", `${id}`))
    .then(() => {
      return res.status(200).json({
        status: "SUCCESS",
      });
    })
    .catch((er) => {
      return res.status(400).json({
        status: "FAILURE",
      });
    });
};

exports.SetBarcode = async (req, res) => {
  const new_id = req.params.new_id;
  setDoc(doc(db, "Attributes", `Office1`), {
    code: new_id,
  })
    .then(() => {
      return res.status(200).json({
        status: "SUCCESS",
      });
    })
    .catch(() => {
      return res.status(400).json({
        status: "FAILURE",
      });
    });
};

exports.GetBarcode = async (req, res) => {
  const docsRef = collection(db, "Attributes");
  getDocs(docsRef)
    .then((data) => {
      console.log(data.docs[0].data());
      return res.status(200).json({
        data: data.docs[0].data(),
      });
    })
    .catch((e) => {
      return res.status(400).json({
        data: "ERROR",
      });
    });
};

exports.ApplyLeave = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  console.log(body, id);
  const docsRef = collection(db, "Employee", `${id}`, "Record");
  setDoc(doc(docsRef, `${body.id}`), {
    checkIn: "--/--",
    checkInLocation: "",
    checkOut: "--/--",
    checkOutLocation: "",
    date: Timestamp.fromDate(new Date(body.normal_date)),
    status: "leave",
  })
    .then(() => {
      return res.status(200).json({
        status: "SUCCESS",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        status: "FAILURE",
      });
    });
};

exports.Visualize = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const collRef = collection(db, `Employee/${id}/Record`);
  await getDocs(collRef).then((querySnapshot) => {
    let present = 0;
    let absent = 0;
    if (!querySnapshot.empty) {
      querySnapshot.docs.forEach((doc) => {
        console.log(doc.get("status"));
        if (doc.get("status") == "leave") {
          absent += 1;
        } else {
          present += 1;
        }
        console.log(present, absent);
      });
      console.log({
        present: present,
        absent: absent,
      });
      return res.status(200).json({
        present: present,
        absent: absent,
      });
    } else {
      return res.status(400).json({
        data: "ERROR",
      });
    }
  });
};
