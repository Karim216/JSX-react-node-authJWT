import {
  FETCH_ALL_USERS_LOADING,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_ERROR,
} from "../../constants";
import axios from "axios";

const fetchAllUsersLoading = () => {
  return {
    type: FETCH_ALL_USERS_LOADING,
  };
};

const fetchAllUsersSuccess = (data) => {
  return {
    type: FETCH_ALL_USERS_SUCCESS,
    payload: data,
  };
};

const fetchAllUsersError = (error) => {
  return {
    type: FETCH_ALL_USERS_ERROR,
    payload: error,
  };
};

export const getAllUsers = () => {
  // const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const apiUrl = "http://localhost:8082/api"
  return async (dispatch) => {
    dispatch(fetchAllUsersLoading());
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };
    try {
      const response = await axios.get(
        `${apiUrl}/users`,
        config
      );
      dispatch(fetchAllUsersSuccess(response.data));
    } catch (error) {
      dispatch(fetchAllUsersError(error));
    }
  };
};
