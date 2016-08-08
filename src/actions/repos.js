import fetch from 'isomorphic-fetch';
export const REQUEST_REPOS = 'REQUEST_REPOS';
export const RECEIVE_REPOS = 'RECEIVE_REPOS';


function requestRepos(query) {
  return {
    type: REQUEST_REPOS,
    query
  };
}


function receiveRepos(query, json) {
  return {
    type: RECEIVE_REPOS,
    query,
    data: json
  };
}


export function fetchRepos(query) {
  return dispatch => {
    dispatch(requestRepos(query));
    return fetch(`https://api.github.com/users/${query}/repos?per_page=100`)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveRepos(query, json));
      });
  };
}
