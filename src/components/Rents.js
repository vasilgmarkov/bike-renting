import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { useDispatch } from "react-redux";
import { returnBike } from "../store/actions/bikeActions";

const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);

  let day = result.getDate() < 10 ? "0" + result.getDate() : result.getDate();
  let month =
    result.getMonth() < 10
      ? "0" + (result.getMonth() + 1)
      : result.getMonth() + 1;
  let year = result.getFullYear();
  return `${year}-${month}-${day}`;
};

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%"
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

export default function Rents({ rent }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const returnBikeNow = rentalId => {
    dispatch(returnBike(rentalId));
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {rent.bike.type.charAt(0)}
          </Avatar>
        }
        title={`To return : ${addDays(rent.rentDay, rent.rentedDays)}`}
        subheader={`Rented : ${rent.rentDay}`}
      />
      <CardMedia
        className={classes.media}
        image={rent.bike.image}
        title={rent.bike.type}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <span>
            <span>Bike Type:</span> {rent.bike.type}
          </span>
          <span>
            <span>Rented days:</span> {rent.rentedDays}
          </span>
          <span>
            <span>Upfront payment:</span> {rent.regularPrice}€
          </span>
          <span>
            <span>Extra days:</span> {rent.extraDays ? rent.extraDays : 0}
          </span>
          <span>
            <span>Total price paid:</span>
            {rent.totalPrice ? rent.totalPrice : rent.regularPrice}€
          </span>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="Return Bike"
          onClick={() => (rent.returnDay ? null : returnBikeNow(rent.id))}
        >
          <span>{rent.returnDay ? "Finished" : "Return Bike"}</span>
        </IconButton>
      </CardActions>
    </Card>
  );
}
