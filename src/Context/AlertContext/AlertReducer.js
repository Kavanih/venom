import { ADD_ALERT, DELETE_ALERT } from "../type";

export default (state, action) => {
  switch (action.type) {
    case ADD_ALERT:
      return {
        ...state,
        alert: [...state.alert, action.payload],
      };
      break;

    case DELETE_ALERT:
      return {
        ...state,
        alert: state.alert.filter((ale) => ale.id !== action.payload),
      };
      break;

    default:
      return state;
      break;
  }
};
