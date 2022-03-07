import {
  GET_POSTS_DETAIL,
  LIST_POST,
  POST_POSTS_CREATE,
  POST_USER,
  UPDATE_POST,
  DELETE_POST,
  POST_USER_ID
} from "../Action/postAction";

let initialState = {
  listPostResult: false,
  listPostLoading: false,
  listPostError: false,

  getPostDetailResult: false,
  getPostDetailLoading: false,
  getPostDetailError: false,
  
  updatePostResult: false,
  updatePostLoading: false,
  updatePostError: false,

  postPostCreateLoading: false,
  postPostCreateResult: false,
  postPostCreateError: false,

  userPostResult: false,
  userPostLoading: false,
  userPostError: false,
 
  userPostIdResult: false,
  userPostIdLoading: false,
  userPostIdError: false,
  
  deletePostResult: false,
  deletePostLoading: false,
  deletePostError: false,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case LIST_POST:
      return {
        ...state,
        listPostResult: action.payload.data,
        listPostLoading: action.payload.loading,
        listPostError: action.payload.errorMessage,
      };

    case GET_POSTS_DETAIL:
      return {
        ...state,
        getPostDetailResult: action.payload.data,
        getPostDetailLoading: action.payload.loading,
        getPostDetailError: action.payload.errorMessage,
      };
    
      case UPDATE_POST:
      return {
        ...state,
        updatePostResult: action.payload.data,
        updatePostLoading: action.payload.loading,
        updatePostError: action.payload.errorMessage,
      };

    case POST_POSTS_CREATE:
      return {
        ...state,
        postPostCreateResult: action.payload.data,
        postPostCreateLoading: action.payload.loading,
        postPostCreateError: action.payload.errorMessage,
      };
    
      case POST_USER:
      return {
        ...state,
        userPostResult: action.payload.data,
        userPostLoading: action.payload.loading,
        userPostError: action.payload.errorMessage,
      };
     
      case POST_USER_ID:
      return {
        ...state,
        userPostIdResult: action.payload.data,
        userPostIdLoading: action.payload.loading,
        userPostIdError: action.payload.errorMessage,
      };
      
      case DELETE_POST:
      return {
        ...state,
        deletePostResult: action.payload.data,
        deletePostLoading: action.payload.loading,
        deletePostError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default posts;
