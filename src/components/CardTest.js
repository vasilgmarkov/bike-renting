import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import { rentBike } from "../store/actions/bikeActions";
import { getBike } from "../store/actions/bikeActions";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function CardTest(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const { bike, bikes } = useSelector(state => state.bikes);
  const { isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getBike(Number(props.bikeId)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bikes]);

  const handleExpandClick = e => {
    let value = e.target.value;

    setCount(value);
  };

  const rentBikeHandleClick = () => {
    dispatch(rentBike({ bikeId: props.bikeId, rentedDays: count }));
  };

  return (
    <div id="rentBike">
      {bike ? (
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {bike.pricePerDay}€
              </Avatar>
            }
            title={`Type: ${bike.type}`}
            subheader="per day!"
          />
          <CardMedia
            className={classes.media}
            image={bike.image}
            title="Paella dish"
          />
          {bike && bike.rented ? (
            <p>
              <NotInterestedIcon />
              Rented
            </p>
          ) : (
            <CardActions disableSpacing>
              <InputLabel shrink>Days</InputLabel>
              <TextField
                InputLabelProps={{ shrink: true }}
                type="number"
                value={count}
                inputProps={{ min: "1" }}
                onChange={handleExpandClick}
              />
              <InputLabel shrink> = {count * bike.pricePerDay} €</InputLabel>
              <Tooltip
                title={isAuthenticated ? "" : "You need to be logged in!"}
                disableTouchListener
              >
                <IconButton
                  aria-label="rent"
                  onClick={isAuthenticated ? rentBikeHandleClick : null}
                >
                  <ShoppingCartIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          )}
        </Card>
      ) : (
        <p>Loading!!</p>
      )}
    </div>
  );
}
