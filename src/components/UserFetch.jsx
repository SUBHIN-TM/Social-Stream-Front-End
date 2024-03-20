import axios from "axios";

export const setUser = (userData) => ({
  type: "SET_USER",
  payload: userData,
});

export const fetchUser = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3000');
    if (response.data.details) {
      dispatch(setUser(response.data.details));
    }
  } catch (error) {
    console.error(error);
  }
};
