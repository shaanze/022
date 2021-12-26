import React from "react";
import { Grid, Button } from "@material-ui/core";
import { withRouter } from "react-router";
import userService from "../../services/UserService";
import toyService from "../../services/ToysService";

const SingleToy = (props) => {
  const { toy, onDelete, history } = props;
  console.log(props);
  return (
    <Grid item xs={4}>
      <h2>
        {toy.name}{" "}
        {userService.isAdmin() && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                console.log("navigate to update");
                history.push("/toys/update/" + toy._id);
              }}
            >
              Edit
            </Button>{" "}
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => {
                toyService
                  .deleteToy(toy._id)
                  .then((data) => {
                    console.log(data);
                    onDelete();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Delete
            </Button>
          </>
        )}
      </h2>
      <p>{toy.price}</p>
      <hr />
    </Grid>
  );
};

export default withRouter(SingleToy);
