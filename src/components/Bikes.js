import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LockIcon from "@material-ui/icons/Lock";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import Tooltip from "@material-ui/core/Tooltip";
import RentBike from "./RentBike";
import { returnBike } from "../store/actions/bikeActions";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "100%",
    height: "100%",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  icon: {
    color: "white"
  }
}));
export default function Bikes(props) {
  const [open, setOpen] = useState(false);
  const [bikeId, setBikeId] = useState(false);
  const dispatch = useDispatch();
  const { bikes } = props.bikes;
  const classes = useStyles();
  const { user, isAuthenticated } = useSelector(state => state.user);

  const handleOpen = bikeId => {
    setOpen(open ? false : true);
    setBikeId(bikeId);
  };

  const returnBikeNow = rentalId => {
    dispatch(returnBike(rentalId));
  };

  return (
    <div className={classes.root}>
      <RentBike open={open} handleOpen={handleOpen} bikeId={bikeId} />
      <GridList cellHeight={200} spacing={1} className={classes.gridList}>
        {bikes.map((tile, i) => (
          <GridListTile
            key={tile.id}
            //cols={tile.featured ? 2 : 1}
            //rows={tile.featured ? 2 : 1}
            cols={i === 0 || i === bikes.length - 1 ? 2 : 1}
            //rows={i === 0 || i === bikes.length - 1 ? 2 : 1}
          >
            <img src={tile.image} alt={tile.type} />
            <GridListTileBar
              title={tile.type}
              titlePosition="top"
              actionIcon={
                <IconButton
                  aria-label={`star ${tile.title}`}
                  className={classes.icon}
                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
            <GridListTileBar
              title={
                tile.rented
                  ? isAuthenticated && user.bike && user.bike.id === tile.id
                    ? "Returns"
                    : "Rented"
                  : "Rent"
              }
              titlePosition="bottom"
              actionIcon={
                <Tooltip
                  title={isAuthenticated ? "" : "You need to be logged in!"}
                  disableTouchListener
                >
                  <span>
                    <IconButton
                      disabled={
                        tile.rented
                          ? isAuthenticated &&
                            user.bike &&
                            user.bike.id === tile.id
                            ? false
                            : true
                          : isAuthenticated && user.bike
                          ? true
                          : false
                      }
                      aria-label={`star ${tile.title}`}
                      className={classes.icon}
                      onClick={() =>
                        isAuthenticated
                          ? user.actualRent
                            ? returnBikeNow(user.actualRent.id)
                            : handleOpen(tile.id)
                          : null
                      }
                    >
                      {tile.rented ? (
                        isAuthenticated &&
                        user.bike &&
                        user.bike.id === tile.id ? (
                          <KeyboardReturnIcon />
                        ) : (
                          <LockIcon />
                        )
                      ) : (
                        // <Link to={`/rent/${tile.id}`}>
                        //   {" "}
                        <ShoppingCartIcon />
                        // </Link>
                      )}
                    </IconButton>
                  </span>
                </Tooltip>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
