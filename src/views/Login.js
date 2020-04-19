import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import { login } from "../store/actions/userActions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    "& label.Mui-focused": {
      color: "green"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green"
    },
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: "25ch"
  }
}));

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector(state => state.user);
  const history = useHistory();
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    showPassword: false
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      login({
        username: values.username.toLowerCase(),
        password: values.password
      })
    );
  };

  const changePage = page => {
    history.push(page);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <div id="login" className={classes.root}>
        <div>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="outlined-user"
              label="User Name"
              type="text"
              variant="outlined"
              onChange={handleChange("username")}
              error={error}
              helperText={error ? error.error : null}
            />

            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
                error={error}
                helperText={error ? error.error : null}
              />
            </FormControl>
            <Button variant="outlined" color="primary" type="submit">
              Login
            </Button>
          </form>
          <p>Or</p>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => changePage("/signUp")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    );
  }
}
