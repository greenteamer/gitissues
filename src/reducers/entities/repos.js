import {
  REQUEST_REPOS,
  RECEIVE_REPOS,
} from '../../actions';


const initialState = {
  isFetching: false,
  didinvalidate: false,
  items: []
};


export default function (state = initialState, action = {}) {
  const { type, query, data } = action;
  switch (type) {
    case REQUEST_REPOS:
      return Object.assign({}, state, {
        isFetching: true,
        didinvalidate: false,
        query
      });
    case RECEIVE_REPOS:
      return Object.assign({}, state, {
        isFetching: false,
        didinvalidate: false,
        query,
        items: data
      });
    default:
      return state;
  }
}
