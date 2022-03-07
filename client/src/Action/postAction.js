import axios from "axios";
import { API_URL, token_for_access } from "../utils/constant";
import Swal from "sweetalert2";

export const LIST_POST = "LIST_POST";
export const GET_POSTS_DETAIL = "GET_POSTS_DETAIL";
export const POST_POSTS_CREATE = "POST_POSTS_CREATE";
export const POST_USER = "POST_USER";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const POST_USER_ID = "POST_USER_ID";

export const PostsList = () => {
  console.log("2.");
  return (dispatch) => {
    //loading
    dispatch({
      type: LIST_POST,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get api
    axios({
      method: "GET",
      url: `${API_URL}/posts`,
      timeout: 120000,
    })
      .then((response) => {
        console.log("3.berhasil", response);
        dispatch({
          type: LIST_POST,
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
          type: LIST_POST,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getPostDetail = (id) => {
  console.log("2.");
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_POSTS_DETAIL,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get api
    axios({
      method: "GET",
      url: `${API_URL}/posts/${id}`,
      timeout: 120000,
    })
      .then((response) => {
        console.log("3.berhasil", response);
        dispatch({
          type: GET_POSTS_DETAIL,
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
          type: GET_POSTS_DETAIL,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const updatePost = (id, data) => {
  console.log("2.");
  return (dispatch) => {
    //loading
    dispatch({
      type: UPDATE_POST,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    
    //get api
    axios({
      method: "PUT",
      url: `${API_URL}/posts/update/${id}`,
      timeout: 120000,
      headers: { token_for_access },
      data: data,
    })
      .then((response) => {
        Swal.fire("Good job!", "Your post has been updated!", "success");
        console.log("3.berhasil", response);
        dispatch({
          type: UPDATE_POST,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your post has not updated!",
        });
        console.log("3. gagal");
        dispatch({
          type: UPDATE_POST,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postPostsCreate = (data) => {
  console.log("2.");
  return (dispatch) => {
    //loading
    dispatch({
      type: POST_POSTS_CREATE,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get api
    axios({
      method: "POST",
      url: `${API_URL}/posts/create`,
      timeout: 120000,
      headers: { token_for_access, "Content-Type": "multipart/form-data" },
      data: data,
    })
      .then((response) => {
        Swal.fire("Good job!", "Your post has been add!", "success");
        console.log("3.berhasil add", response);
        dispatch({
          type: POST_POSTS_CREATE,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your post has not add!",
        });
        console.log("3. gagal");
        dispatch({
          type: POST_POSTS_CREATE,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postUser = () => {
  console.log("2.");
  return (dispatch) => {
    //loading
    dispatch({
      type: POST_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get api
    axios({
      method: "GET",
      url: `${API_URL}/posts/userPost`,
      timeout: 120000,
      headers: { token_for_access },
    })
      .then((response) => {
        console.log("3.berhasil", response.data);
        dispatch({
          type: POST_USER,
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
          type: POST_USER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const deletePost = (id) => {
  console.log("2. delete");
  return (dispatch) => {
    //loading
    dispatch({
      type: DELETE_POST,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get api
    axios({
      method: "DELETE",
      url: `${API_URL}/posts/delete/${id}`,
      timeout: 120000,
      headers: { token_for_access },
    })
      .then((response) => {
        console.log("3.berhasil delete", response.data);
        dispatch({
          type: DELETE_POST,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your post has not delete!",
        });
        console.log("3. gagal delete");
        dispatch({
          type: DELETE_POST,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postByUserId = (UserId) => {
  console.log("2.");
  return (dispatch) => {
    //loading
    dispatch({
      type: POST_USER_ID,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get api
    axios({
      method: "GET",
      url: `${API_URL}/posts/userPost/${UserId}`,
      timeout: 120000,
    })
      .then((response) => {
        console.log("3.berhasil", response.data);
        dispatch({
          type: POST_USER_ID,
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
          type: POST_USER_ID,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
