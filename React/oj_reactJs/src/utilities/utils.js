// Don't use useDispatch or useNavigate here!
export const handleLogout = (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "auth/logout" }); // or use logout() from your slice
};
