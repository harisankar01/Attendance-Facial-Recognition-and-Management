import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ status, theme }) => ({
  backgroundColor: status ? "red" : "inherit",
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AttendenceTable({ data }) {
  React.useEffect(() => {
    console.log(data);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">CheckIn</StyledTableCell>
            <StyledTableCell align="right">CheckOut</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <StyledTableRow
              key={row?.doc_id}
              status={row?.status === "leave" ? true : false}
            >
              <StyledTableCell component="th" scope="row">
                {new Date(row?.date?.nanoseconds).toDateString("MM dd yyyy")}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row?.status === "leave" ? "LEAVE" : row?.checkIn}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row?.status === "leave" ? "LEAVE" : row?.checkOut}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row?.status === "leave" ? "LEAVE" : row?.checkOutLocation}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
