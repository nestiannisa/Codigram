import {
  COMMENT_ID,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT
} from "../Action/commentAction";

let initialState = {
  
  commentIdResult: false,
  commentIdLoading: false,
  commentIdError: false,

  addCommentResult: false,
  addCommentLoading: false,
  addCommentError: false,

  deleteCommentResult: false,
  deleteCommentLoading: false,
  deleteCommentError: false,

  editCommentResult: false,
  editCommentLoading: false,
  editCommentError: false,

};

const comments = (state = initialState, action) => {
  switch (action.type) {
      
      case COMMENT_ID:
      return {
        ...state,
        commentIdResult: action.payload.data,
        commentIdLoading: action.payload.loading,
        commentIdError: action.payload.errorMessage,
      };
      
      case ADD_COMMENT:
      return {
        ...state,
        addCommentResult: action.payload.data,
        addCommentLoading: action.payload.loading,
        addCommentError: action.payload.errorMessage,
      };
      
      case DELETE_COMMENT:
      return {
        ...state,
        deleteCommentResult: action.payload.data,
        deleteCommentLoading: action.payload.loading,
        deleteCommentError: action.payload.errorMessage,
      };
      
      case EDIT_COMMENT:
      return {
        ...state,
        editCommentResult: action.payload.data,
        editCommentLoading: action.payload.loading,
        editCommentError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default comments;
