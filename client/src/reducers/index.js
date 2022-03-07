import { combineReducers } from 'redux';
import posts from './posts';
import users from './users';
import comments from './comments';

export default combineReducers({
    users,
    posts,
    comments,
});

