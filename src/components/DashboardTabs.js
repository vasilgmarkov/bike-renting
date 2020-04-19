import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Rents from "./Rents";
import { useHistory } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  }
}));

export default function DashboardTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { user, isAuthenticated } = useSelector(state => state.user);
  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  if (!isAuthenticated) {
    history.push("/");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          TabIndicatorProps={{ style: { background: "#6db33f" } }}
          value={value}
          onChange={handleChange}
          //   indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Actual rent" {...a11yProps(0)} />
          <Tab label="All Rents" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {isAuthenticated && user.actualRent ? (
            <Rents rent={user.actualRent} />
          ) : (
            <h4>No rented bike!</h4>
          )}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {isAuthenticated
            ? user.rentals
                .filter(rent => rent.returnDay !== null)
                .map(rent => <Rents rent={rent} key={rent.id} />)
            : null}
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
