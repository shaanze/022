import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import Auth from "../auth/Auth";
import toyService from "../../services/ToysService";

const NewToy = (props) => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  return (
    <Auth>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Add New Toy</h1>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <TextField
            label="name"
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            label="price"
            fullWidth
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              toyService
                .addToy({ name, price })
                .then((data) => {
                  console.log(data);
                  props.history.push("/toys");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Add New
          </Button>
        </Grid>
      </Grid>
    </Auth>
  );
};

export default NewToy;
