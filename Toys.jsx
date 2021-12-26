import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import userService from "../../services/UserService";
import toyService from "../../services/ToysService";
import SingleToy from "./SingleToy";
const useStyles = makeStyles((theme) => ({
  addBtn: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));
const Toys = (props) => {
  const [toys, setToys] = React.useState([]);
  const classes = useStyles();
  const page = props.match.params.page ? props.match.params.page : 1;
  const [total, setTotal] = React.useState(0);
  const [perPage, setPerPage] = React.useState(10);
  const getData = () => {
    toyService
      .getToys(page, perPage)
      .then((data) => {
        setToys(data.toys);
        setTotal(data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // getData();
  React.useEffect(getData, [page, perPage]);
  // console.log("Inside Toys Component");
  const handleNewToyClick = () => {
    console.log(props);
    props.history.push("/toys/new");
  };
  return (
    <div>
      <h1>Toys</h1>
      Records Per Page:{" "}
      <select
        value={perPage}
        onChange={(e) => setPerPage(e.target.value)}
        style={{ width: "100px", height: "30px" }}
      >
        <option value="2">Two</option>
        <option value="10">Ten</option>
      </select>
      {userService.isLoggedIn() && (
        <Fab
          color="primary"
          aria-label="add"
          className={classes.addBtn}
          onClick={handleNewToyClick}
        >
          <AddIcon />
        </Fab>
      )}
      {toys.length == 0 ? (
        <p>There are no toys</p>
      ) : (
        <Grid container spacing={3}>
          {toys.map((toy, index) => (
            <SingleToy key={index} toy={toy} onDelete={getData} />
          ))}
        </Grid>
      )}
      <Grid item xs={12}>
        <Pagination
          count={Math.ceil(total / perPage)}
          variant="outlined"
          shape="rounded"
          onChange={(e, value) => {
            console.log(value);
            props.history.push("/toys/" + value);
          }}
        />{" "}
        Total: {total} Showing {(page - 1) * perPage} to{" "}
        {(page - 1) * perPage + toys.length}
      </Grid>
    </div>
  );
};

export default Toys;
