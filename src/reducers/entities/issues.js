import {
  REQUEST_ISSUES,
  RECEIVE_ISSUES,
} from '../../actions';


const initialState = {
  isFetching: false,
  didinvalidate: false,
  items: []
};


export default function (state = initialState, action = {}) {
  const { type, repo, link, data } = action;
  switch (type) {
    case REQUEST_ISSUES:
      return Object.assign({}, state, {
        isFetching: true,
        didinvalidate: false,
        repo
      });
    case RECEIVE_ISSUES:
      return Object.assign({}, state, {
        isFetching: false,
        didinvalidate: false,
        repo,
        link,
        items: data
      });
    default:
      return state;
  }
}
