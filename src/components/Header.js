import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logOut } from "../store/actions/userActions";
import { Link } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Header() {
  const classes = useStyles();
  const { user, isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const logOutUser = () => dispatch(logOut());

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Typography variant="h6" className={classes.title}>
              <DirectionsBikeIcon />
              <b>B</b>
              <i>ike</i>
              <b>CN</b>
            </Typography>
          </Link>
          {isAuthenticated ? (
            [
              user.name,
              <Button color="inherit" onClick={() => logOutUser()} key={"exit"}>
                <ExitToAppIcon />
              </Button>
            ]
          ) : (
            <Link to="/login">
              <Button color="inherit">
                <VpnKeyIcon />
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
