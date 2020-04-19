import { FETCH_BIKES, GET_BIKE } from "../actions/types";

const initialState = {
  bikes: [],
  bike: null
};

export default function bikeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BIKES:
      return {
        ...state,
        bikes: action.payload
      };
    case GET_BIKE:
      return {
        ...state,
        bike: state.bikes.find(bikeR => bikeR.id === action.payload)
      };

    default:
      return state;
  }
}
