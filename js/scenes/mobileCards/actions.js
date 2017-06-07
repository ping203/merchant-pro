import http  from "../../common/http"

const prefix = "mobileCards/";
export const REQUEST_ITEMS = prefix + 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = prefix + 'RECEIVE_ITEMS';

function request(subreddit) {
  return {
    type: REQUEST_ITEMS
  }
}
function receive(data) {
  return {
    type: RECEIVE_ITEMS,
    items : data
  }
}

export function fetchMobileCard(params) {

  return function (dispatch) {
    dispatch(request());
    return http.postWithConvert("", params)
      .then(response => {
        if (response.status == 0) {
          dispatch(receive(response.data["1"]));
        }else {
          throw data.message;
        }
      })
      .catch(error => {
        console.log("error", error);
      });
     
  }
}
