import http  from "../../common/http"

const prefix = "merchants/";
export const REQUEST_ITEMS = prefix + 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = prefix + 'RECEIVE_ITEMS';
export const RECEIVE_CONFIG = prefix + 'RECEIVE_CONFIG';

function requestPosts(subreddit) {
  return {
    type: REQUEST_ITEMS
  }
}
function receivePosts(data) {
  return {
    type: RECEIVE_ITEMS,
    ...data
  }
}
function receiveConfig(data) {
  return {
    type: RECEIVE_CONFIG,
    ...data
  }
}

export function fetchPosts(params) {

  return function (dispatch) {
    dispatch(requestPosts());
    return http.postWithConvert("", params)
      .then(response => {
        if (response.status == 0) {
          dispatch(receivePosts(response.data));
        }else {
          throw data.message;
        }
      })
      .catch(error => {
        console.log("error", error);
      });

  }
}

export function fetchConfig(params) {

  return function (dispatch) {
    return http.postWithConvert("", params)
      .then(response => {
        console.log("receiveConfig",response.data);
        if (response.status == 0) {
          dispatch(receiveConfig(response.data));
        }else {
          throw data.message;
        }
      })
      .catch(error => {
        console.log("error", error);
      });

  }
}
