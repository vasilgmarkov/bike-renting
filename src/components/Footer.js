import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import { useHistory } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0
  },
  "& > *": {
    marginBottom: theme.spacing(2)
  },
  "& .MuiBadge-root": {
    marginRight: theme.spacing(4)
  }
}));

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const { isAuthenticated, user } = useSelector(state => state.user);
  const changePage = page => {
    history.push(page);
  };

  return (
    <div id="footer">
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label="Bikes"
          icon={<DirectionsBikeIcon />}
          onClick={() => changePage("/")}
        />

        {isAuthenticated ? (
          <BottomNavigationAction
            label="Dashboard"
            icon={
              <Badge
                color="secondary"
                badgeContent={user.actualRent ? 1 : null}
              >
                <DashboardIcon />
              </Badge>
            }
            onClick={() => changePage("/dashboard")}
          />
        ) : null}
        <BottomNavigationAction
          label="Contact Us"
          icon={<ContactSupportIcon />}
        />
      </BottomNavigation>
    </div>
  );
}
