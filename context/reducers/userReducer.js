import {
  FETCH_USER_INFO_REQUEST,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
} from "../actions/userActions";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_INFO_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_INFO_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case FETCH_USER_INFO_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default userReducer;
