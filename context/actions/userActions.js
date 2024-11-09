import axios from "axios";

export const FETCH_USER_INFO_REQUEST = "FETCH_USER_INFO_REQUEST";
export const FETCH_USER_INFO_SUCCESS = "FETCH_USER_INFO_SUCCESS";
export const FETCH_USER_INFO_FAILURE = "FETCH_USER_INFO_FAILURE";

export const fetchUserInfo = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_USER_INFO_REQUEST });

  try {
    const response = await axios.get(`${API_URL}/getpromoterinfo/${userId}`);
    dispatch({ type: FETCH_USER_INFO_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_USER_INFO_FAILURE, error: error.message });
  }
};
