import { GET_AUTH_USER, LOGOUT, ERROR } from "./types";
const url = process.env.REACT_APP_API_URL;
export const login = user => dispatch => {
  fetch(`${url}/api/login`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    body: getBody({ name: user.username.toLowerCase(), pwd: user.password })
  })
    .then(data => {
      if (data.status === 200) {
        dispatch(getAuthUser());
        dispatch(getError(null));
      } else {
        console.log("Error ");
        dispatch(getError({ error: "Wrong credentials!" }));
      }
    })
    .catch(function(error) {
      console.log("Request failure: ", error);
    });
};

export const createUser = user => dispatch => {
  fetch(`${url}/user/add`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      username: user.username.toLowerCase(),
      password: user.password,
      email: user.email
    })
  })
    .then(res => {
      if (res.status === 201) {
        dispatch(login({ username: user.username, password: user.password }));
        dispatch(getError(null));
      } else {
        return res.json();
      }
    })
    .then(data => {
      dispatch(getError(data));
    })
    .catch(function(error) {
      console.log("Request failure: ", error);
    });
};

export const getAuthUser = () => dispatch => {
  fetch(`${url}/user/auth`, {
    credentials: "include"
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error("bad request");
    })
    .then(user => {
      dispatch({
        type: GET_AUTH_USER,
        payload: user
      });
    })
    .catch(function(error) {
      console.log("Request failure: ", error);
    });
};

export const logOut = () => dispatch => {
  fetch(`${url}/api/logout`, {
    credentials: "include",
    method: "POST"
  })
    .then(data => {
      dispatch({
        type: LOGOUT
      });
    })
    .catch(function(error) {
      console.log("Request failure: ", error);
    });
};

export const getError = msg => dispatch => {
  dispatch({
    type: ERROR,
    payload: msg
  });
};

function getBody(json) {
  var body = [];
  for (var key in json) {
    var encKey = encodeURIComponent(key);
    var encVal = encodeURIComponent(json[key]);
    body.push(encKey + "=" + encVal);
  }
  return body.join("&");
}
