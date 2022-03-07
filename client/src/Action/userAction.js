import axios from "axios";
import { API_URL, token_for_access } from "../utils/constant";
import Swal from "sweetalert2";

export const USER_ACCOUNT = "USER_ACCOUNT";
export const SEARCH = "SEARCH";
export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const UPDATE_USER = "UPDATE_USER";
export const USER_ACCOUNT_ID = "USER_ACCOUNT_ID";
export const USERS = "USERS";


export const register = (data) => {
  console.log("2.");
  return (dispatch) => {
    //loading
    dispatch({
      type: REGISTER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get api
    axios({
      method: "POST",
      url: `${API_URL}/users/register`,
      timeout: 120000,
      data: data,
    })
      .then((token) => {
        Swal.fire("Good job!", "your account has been created!", "success");
        console.log("3.berhasil", token);
        dispatch({
          type: REGISTER,
          payload: {
            loading: false,
            token: token.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "username has been exist!",
        });
        console.log("3. gagal");
        dispatch({
          type: REGISTER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const login = (data) => {
  console.log("2.");
  return (dispatch) => {
    //loading
    dispatch({
      type: LOGIN,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
        isLogin: false,
      },
    });
    
    //get api
    
    axios({
      method: "POST",
      url: `${API_URL}/users/login`,
      timeout: 120000,
      data: data,
    })
      .then((token) => {
        Swal.fire("Good job!", "You have Login", "success");
        console.log("3.berhasil", token.data);
        localStorage.setItem(
          "token_for_access",
          token.data.token_for_access
        );
        
        dispatch({
          type: LOGIN,
          payload: {
            loading: false,
            data: token.data,
            errorMessage: false,
            isLogin: true,
          },
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "username or password is wrong!",
        });
        console.log("3. gagal");
        dispatch({
          type: LOGIN,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
            isLogin: false,
          },
        });
      });
  };
};

export const accountUser = () => {
  console.log("2.");
  return (dispatch) => {
    //loading
    dispatch({
      type: USER_ACCOUNT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    console.log(token_for_access);
    //get api
    axios({
      method: "GET",
      url: `${API_URL}/users/account`,
      timeout: 120000,
      headers: {
        token_for_access,
      },
    })
      .then((response) => {
        console.log("3.berhasil", response);
        dispatch({
          type: USER_ACCOUNT,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log("3. gagal");
        dispatch({
          type: USER_ACCOUNT,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const accountById = (id) => {
  console.log("2.");
  return (dispatch) => {
    //loading
    dispatch({
      type: USER_ACCOUNT_ID,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    console.log(token_for_access);
    //get api
    axios({
      method: "GET",
      url: `${API_URL}/users/detail/${id}`,
      timeout: 120000,
      headers: {
        token_for_access,
      },
    })
      .then((response) => {
        console.log("3.berhasil", response);
        dispatch({
          type: USER_ACCOUNT_ID,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log("3. gagal");
        dispatch({
          type: USER_ACCOUNT_ID,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const search = (data) => {
  console.log("2.");
  return (dispatch) => {
    //loading
    dispatch({
      type: SEARCH,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "GET",
      url: `${API_URL}/users/search`,
      timeout: 120000,
      data:data
    })
      .then((response) => {
        console.log("3.berhasil", response.data);
        dispatch({
          type: SEARCH,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log("3. gagal");
        dispatch({
          type: SEARCH,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const updateAccount = (data) => {
  console.log("2.");
  return (dispatch) => {
    //loading
    dispatch({
      type: UPDATE_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: "PUT",
      url: `${API_URL}/users/update`,
      timeout: 120000,
      headers: { token_for_access },
      data:data
    })
      .then((response) => {
        Swal.fire("Good job!", "Your account has been updated!", "success");
        console.log("3.berhasil", response.data);
        dispatch({
          type: UPDATE_USER,
          payload: {
            loading: false,
            response: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Account has not been updated!",
        });
        console.log("3. gagal");
        dispatch({
          type: UPDATE_USER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const allUser = () => {
  console.log("2.user dapet");
  return (dispatch) => {
    //loading
    dispatch({
      type: USERS,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get api
    axios({
      method: "GET",
      url: `${API_URL}/users/`,
      timeout: 120000,
      
    })
      .then((response) => {
        console.log("3.berhasil user", response.data);
        dispatch({
          type: USERS,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log("3. gagal");
        dispatch({
          type: USERS,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

