import {
  REQUEST_CURRENT_ISSUE,
  RECEIVE_CURRENT_ISSUE,
} from '../../actions';


const initialState = {
  isFetching: false,
  didinvalidate: false,
  issue: {}
};


export default function (state = initialState, action = {}) {
  const { type, number, data } = action;
  switch (type) {
    case REQUEST_CURRENT_ISSUE:
      return Object.assign({}, state, {
        isFetching: true,
        didinvalidate: false,
        number
      });
    case RECEIVE_CURRENT_ISSUE:
      return Object.assign({}, state, {
        isFetching: false,
        didinvalidate: false,
        number,
        issue: data
      });
    default:
      return state;
  }
}
