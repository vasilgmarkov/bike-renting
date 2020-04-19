import { FETCH_BIKES, GET_BIKE } from "./types";
import { getAuthUser } from "./userActions";
const url = process.env.REACT_APP_API_URL;
export const fetchBikes = () => dispatch => {
  fetch(`${url}/bikes/all`, {
    credentials: "include"
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("bad request");
    })
    .then(data => {
      dispatch({
        type: FETCH_BIKES,
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const rentBike = ({ bikeId, rentedDays }) => dispatch => {
  fetch(`${url}/rental/rentBike/${bikeId}`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ rentedDays: rentedDays })
  })
    .then(res => {
      if (res.ok) {
        return res.text();
      }
      throw new Error("bad request");
    })
    .then(data => {
      dispatch(getAuthUser());
      dispatch(fetchBikes());
    })
    .catch(err => {
      console.log(err);
    });
};

export const returnBike = rentalId => dispatch => {
  fetch(`${url}/rental/returnBike/${rentalId}`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (res.ok) {
        return res.text();
      }
      throw new Error("bad request");
    })
    .then(data => {
      dispatch(getAuthUser());
      dispatch(fetchBikes());
    })
    .catch(err => {
      console.log(err);
    });
};

export const getBike = id => dispatch => {
  dispatch({
    type: GET_BIKE,
    payload: id
  });
};
