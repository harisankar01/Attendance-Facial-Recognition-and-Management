import React, { useState } from "react";
import { useBarcode } from "next-barcode";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function Barcode({ barvalue, setbarvalue, setshowBarcode }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleClikc = async () => {
    setbarvalue(barcode_value);
    const data = await fetch(
      `http://127.0.0.1:5000/api/employee/barcode/${barcode_value}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    ).then((j) => j.json());
    if (data.status == "FAILURE") {
      console.log("ERROR");
    } else {
      setshowBarcode(false);
    }
  };
  const [barcode_value, setbarcode_value] = useState(barvalue);
  const { inputRef } = useBarcode({
    value: barcode_value == "" ? 1 : barcode_value,
    options: {
      width: "5px",
      background: "#ffffff",
    },
  });
  return (
    <div>
      <Card sx={style}>
        <CardContent>
          <Typography
            sx={{ fontSize: 14, textAlign: "center" }}
            color="text.secondary"
            gutterBottom
          >
            Barcode
          </Typography>
          <svg ref={inputRef} />
        </CardContent>
        <TextField
          label="Barcode"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
          value={barcode_value}
          onChange={(e) => {
            setbarcode_value(e.target.value);
          }}
          placeholder="Enter new barcode value"
          variant="outlined"
        />
        <CardActions>
          <Box
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleClikc}
            >
              {" "}
              Okay
            </Button>
          </Box>
        </CardActions>
      </Card>
    </div>
  );
}
