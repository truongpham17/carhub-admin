import fetchAPI from '../../utils/service';

import { postsTypes } from '../action-types';

// Get posts
function getPostsRequest() {
  return {
    type: postsTypes.GET_POSTS_REQUEST,
  };
}
function getPostsSuccess(payload) {
  return {
    type: postsTypes.GET_POSTS_SUCCESS,
    payload,
  };
}
function getPostsFailure() {
  return {
    type: postsTypes.GET_POSTS_FAILURE,
  };
}
function getPosts(dispatch) {
  return async callbacks => {
    dispatch(getPostsRequest());
    try {
      const response = await fetchAPI({
        method: 'GET',
        endpoints: '/posts',
      });
      if (response.status === 200) {
        console.log(response.data);
        dispatch(getPostsSuccess(response.data));
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.success();
      } else {
        dispatch(getPostsFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(getPostsFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

// Update post
function updatePostRequest() {
  return {
    type: postsTypes.UPDATE_POST_REQUEST,
  };
}
function updatePostSuccess(payload) {
  return {
    type: postsTypes.UPDATE_POST_SUCCESS,
    payload,
  };
}
function updatePostFailure() {
  return {
    type: postsTypes.UPDATE_POST_FAILURE,
  };
}
function updatePost(dispatch) {
  return async (id, data, callbacks) => {
    dispatch(updatePostRequest());
    try {
      const response = await fetchAPI({
        method: 'PATCH',
        endpoints: `/posts/${id}`,
        data,
      });
      if (response.status === 200) {
        dispatch(updatePostSuccess(response.data));
        getPosts(dispatch)(callbacks);
      } else {
        dispatch(updatePostFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(updatePostFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

// Delete post
function deletePostRequest() {
  return {
    type: postsTypes.DELETE_POST_REQUEST,
  };
}
function deletePostSuccess(payload) {
  return {
    type: postsTypes.DELETE_POST_SUCCESS,
    payload,
  };
}
function deletePostFailure() {
  return {
    type: postsTypes.DELETE_POST_FAILURE,
  };
}
function deletePost(dispatch) {
  return async (id, callbacks) => {
    dispatch(deletePostRequest());
    try {
      const response = await fetchAPI({
        method: 'DELETE',
        endpoints: `/posts/${id}`,
      });
      if (response.status === 200) {
        dispatch(deletePostSuccess(response.data));
        getPosts(dispatch)(callbacks);
      } else {
        dispatch(deletePostFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(deletePostFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

function logoutPosts() {
  return {
    type: postsTypes.LOGOUT_POSTS,
  };
}

export { getPosts, deletePost, updatePost, logoutPosts };
