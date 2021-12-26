import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import Admin from "../auth/Admin";
import toyService from "../../services/ToysService";
const UpdateToy = (props) => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const id = props.match.params.id;
  React.useEffect(() => {
    toyService.getSingleToy(id).then((data) => {
      setName(data.name);
      setPrice(data.price);
    });
  }, []);
  return (
    <Admin>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Update Toy</h1>
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
                .updateToy(id, { name, price })
                .then((data) => {
                  console.log(data);
                  props.history.push("/toys");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </Admin>
  );
};

export default UpdateToy;
