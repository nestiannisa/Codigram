import axios from "axios";
import { API_URL, token_for_access } from "../utils/constant";
import Swal from "sweetalert2";

export const COMMENT_ID = "COMMENT_ID";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";

export const commentById = (PostId) => {
  console.log("2. comment");
  return (dispatch) => {
    //loading
    dispatch({
      type: COMMENT_ID,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get api
    axios({
      method: "GET",
      url: `${API_URL}/comments/${PostId}`,
      timeout: 120000,
    })
      .then((response) => {
        console.log("3.berhasil comment", response.data);
        dispatch({
          type: COMMENT_ID,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log("3. gagal comment");
        dispatch({
          type: COMMENT_ID,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const addComment = (id, data) => {
  console.log("2. comment add");
  return (dispatch) => {
    //loading
    dispatch({
      type: ADD_COMMENT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get api
    axios({
      method: "POST",
      url: `${API_URL}/comments/add/${id}`,
      timeout: 120000,
      headers: { token_for_access },
      data: id,
      data,
    })
      .then((response) => {
        Swal.fire("Good job!", "Your comment has been add!", "success");
        console.log("3.berhasil comment add", response.data);
        dispatch({
          type: ADD_COMMENT,
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
        console.log("3. gagal comment add");
        dispatch({
          type: ADD_COMMENT,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const deleteComment = (id) => {
  console.log("2. delete comment");
  return (dispatch) => {
    //loading
    dispatch({
      type: DELETE_COMMENT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get api

    axios({
      method: "DELETE",
      url: `${API_URL}/comments/delete/${id}`,
      timeout: 120000,
      headers: { token_for_access },
    })
      .then((response) => {
        console.log("3.berhasil delete comment", response.data);
        dispatch({
          type: DELETE_COMMENT,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log("3. gagal comment");
        dispatch({
          type: DELETE_COMMENT,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const editComment = (id, data) => {
  console.log("2. update comment");
  return (dispatch) => {
    //loading
    dispatch({
      type: EDIT_COMMENT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get api

    axios({
      method: "PUT",
      url: `${API_URL}/comments/update/${id}`,
      timeout: 120000,
      headers: { token_for_access },
      data: data,
    })
      .then((response) => {
        console.log("3.berhasil update comment", response.data);
        dispatch({
          type: EDIT_COMMENT,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log("3. gagal comment");
        dispatch({
          type: EDIT_COMMENT,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
