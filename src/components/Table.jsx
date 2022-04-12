import React, { useCallback } from "react";
import MUITable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Table = ({ data, onChangeFilters, genderFilter, nationalityFilter }) => {
  const classes = useStyles();

  const handleChangeFilters = useCallback(
    (e) => {
      onChangeFilters(e);
    },
    [onChangeFilters]
  );

  return (
    <TableContainer component={Paper}>
      <MUITable className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name </TableCell>
            <TableCell align="right">Email </TableCell>
            <TableCell align="right">
              <Select
                placeholder="Gender"
                variant="outlined"
                value={genderFilter}
                name="gender"
                onChange={handleChangeFilters}
                style={{ minWidth: 140 }}
              >
                <MenuItem value={"all"}>All Genders</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"male"}>Male</MenuItem>
              </Select>
            </TableCell>
            <TableCell align="right">
              <Select
                placeholder="Nationality"
                variant="outlined"
                value={nationalityFilter}
                name="nationality"
                onChange={handleChangeFilters}
                style={{ minWidth: 140 }}
              >
                <MenuItem value={"all"}>All countries</MenuItem>
                <MenuItem value={"us"}>USA</MenuItem>
                <MenuItem value={"gb"}>Great Britain</MenuItem>
              </Select>
            </TableCell>
            <TableCell align="right"> Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.email}>
                <TableCell component="th" scope="row">
                  {row.name.title}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.nat}</TableCell>
                <TableCell align="right">{row.cell}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow key="no-data">
              <TableCell>No data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};

export default Table;
