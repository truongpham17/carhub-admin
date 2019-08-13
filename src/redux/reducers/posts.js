import { POSTS_INITIAL_STATE } from '../initial-states';
import { postsTypes } from '../action-types';

export default (state = POSTS_INITIAL_STATE, action) => {
  switch (action.type) {
    case postsTypes.GET_POSTS_REQUEST:
      return {
        ...state,
        getPostsLoading: true,
      };
    case postsTypes.GET_POSTS_SUCCESS:
      return {
        ...state,
        getPostsLoading: false,
        list: action.payload,
      };
    case postsTypes.GET_POSTS_FAILURE:
      return {
        ...state,
        getPostsLoading: false,
      };
    case postsTypes.DELETE_POST_REQUEST:
      return {
        ...state,
        deletePostLoading: true,
      };
    case postsTypes.DELETE_POST_SUCCESS:
      return {
        ...state,
        deletePostLoading: false,
        list: state.list.filter(post => post._id !== action.payload._id),
      };
    case postsTypes.DELETE_POST_FAILURE:
      return {
        ...state,
        deletePostLoading: false,
      };
    case postsTypes.UPDATE_POST_REQUEST:
      return {
        ...state,
        updatePostLoading: true,
      };
    case postsTypes.UPDATE_POST_SUCCESS:
      return {
        ...state,
        updatePostLoading: false,
      };
    case postsTypes.UPDATE_POST_FAILURE:
      return {
        ...state,
        updatePostLoading: false,
      };
    case postsTypes.LOGOUT_POSTS:
      return POSTS_INITIAL_STATE;
    default:
      return state;
  }
};
