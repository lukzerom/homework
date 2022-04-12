import { useEffect, useState, useCallback } from "react";
import { getUsers } from "../api/contactApi";
import Table from "../components/Table";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";

const TableView = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nationalityFilter, setNationalityFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");

  const fetchUsers = useCallback((nationality, gender) => {
    const apiNationalty = nationality === "all" ? "" : nationality;
    const apiGender = gender === "all" ? "" : gender;

    setLoading(true);
    getUsers(apiNationalty, apiGender)
      .then((response) => {
        setUsers(response.data.results);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleClose = useCallback(() => {
    setError(false);
  }, []);

  const onChangeFilters = useCallback((e) => {
    switch (e.target.name) {
      case "nationality":
        setNationalityFilter(e.target.value);

        break;
      case "gender":
        setGenderFilter(e.target.value);
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    fetchUsers(nationalityFilter, genderFilter);
  }, [nationalityFilter, genderFilter, fetchUsers]);

  return (
    <div style={{ maxWidth: 800, margin: "120px auto 0 auto" }}>
      <h1> Zadanie domowe</h1>
      <div
        style={{
          display: "flex",
          minHeight: 300,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Table
            data={users}
            onChangeFilters={onChangeFilters}
            nationalityFilter={nationalityFilter}
            genderFilter={genderFilter}
          />
        )}
      </div>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Something went wrong!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TableView;
