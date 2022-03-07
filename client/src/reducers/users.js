import {
  REGISTER,
  USER_ACCOUNT,
  LOGIN,
  UPDATE_USER,
  USER_ACCOUNT_ID,
  USERS,
} from "../Action/userAction";

let initialState = {
  registerResult: false,
  registerLoading: false,
  registerError: false,

  loginResult: false,
  loginLoading: false,
  loginError: false,

  userAccountResult: false,
  userAccountLoading: false,
  userAccountError: false,

  userAccountIdResult: false,
  userAccountIdLoading: false,
  userAccountIdError: false,

  updateUserResult: false,
  updateUserLoading: false,
  updateUserError: false,
 
  usersResult: false,
  usersLoading: false,
  usersError: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        registerResult: action.payload.data,
        registerLoading: action.payload.loading,
        registerError: action.payload.errorMessage,
      };

    case LOGIN:
      return {
        ...state,
        loginResult: action.payload.data,
        loginLoading: action.payload.loading,
        loginError: action.payload.errorMessage,
      };

    case USER_ACCOUNT:
      return {
        ...state,
        userAccountResult: action.payload.data,
        userAccountLoading: action.payload.loading,
        userAccountError: action.payload.errorMessage,
      };

    case USER_ACCOUNT_ID:
      return {
        ...state,
        userAccountIdResult: action.payload.data,
        userAccountIdLoading: action.payload.loading,
        userAccountIdError: action.payload.errorMessage,
      };

    case UPDATE_USER:
      return {
        ...state,
        updateUserResult: action.payload.data,
        updateUserLoading: action.payload.loading,
        updateUserError: action.payload.errorMessage,
      };

    case USERS:
      console.log("5.user masukk")
      return {
        ...state,
        usersResult: action.payload.data,
        usersLoading: action.payload.loading,
        usersError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default users;
