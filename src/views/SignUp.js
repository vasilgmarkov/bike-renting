import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { createUser } from "../store/actions/userActions";
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
function SignUp() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    email: "",
    showPassword: false
  });
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector(state => state.user);
  const history = useHistory();

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    dispatch(createUser(values));
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  if (isAuthenticated) {
    setTimeout(() => {
      history.push("/");
    }, 10);
  }
  return (
    <div id="signUp">
      <div>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-email"
            label="Email"
            type="text"
            variant="outlined"
            onChange={handleChange("email")}
            error={error && error.error.includes("email")}
            helperText={
              error && error.error.includes("email") ? error.error : null
            }
          />
          <TextField
            id="outlined-user"
            label="User Name"
            type="text"
            variant="outlined"
            onChange={handleChange("username")}
            error={error && error.error.includes("username")}
            helperText={
              error && error.error.includes("username") ? error.error : null
            }
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
              error={error && error.error.includes("password")}
              helperText={
                error && error.error.includes("password") ? error.error : null
              }
            />
          </FormControl>
          <Button variant="outlined" color="primary" type="submit">
            SignUp
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
