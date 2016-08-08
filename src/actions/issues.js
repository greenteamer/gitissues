import fetch from 'isomorphic-fetch';
export const REQUEST_ISSUES = 'REQUEST_ISSUES';
export const RECEIVE_ISSUES = 'RECEIVE_ISSUES';
export const REQUEST_CURRENT_ISSUE = 'REQUEST_CURRENT_ISSUE';
export const RECEIVE_CURRENT_ISSUE = 'RECEIVE_CURRENT_ISSUE';


function requestIssues(repo, perPage) {
  return {
    type: REQUEST_ISSUES,
    repo,
    perPage
  };
}


function receiveIssues(repo, perPage, link, json) {
  return {
    type: RECEIVE_ISSUES,
    repo,
    perPage,
    link,
    data: json
  };
}


export function fetchIssues(repo, perPage, requestUrl) {
  return dispatch => {
    dispatch(requestIssues(repo));
    let link = '';
    const page = requestUrl ? requestUrl.split('&page=')[1].split('>')[0] : '1';
    const url = `${repo.issues_url.split('{')[0]}?per_page=${perPage}&page=${page}`;
    return fetch(url)
      .then(response => {
        link = response.headers.get('Link');
        return response.json();
      })
      .then(json => {
        dispatch(receiveIssues(repo, perPage, link, json));
      });
  };
}


function requestCurrentIssue(username, repoName, issueNumber) {
  return {
    type: REQUEST_CURRENT_ISSUE,
    username,
    repoName,
    issueNumber
  };
}


function receiveCurrentIssue(username, repoName, issueNumber, json) {
  return {
    type: RECEIVE_CURRENT_ISSUE,
    username,
    repoName,
    issueNumber,
    data: json
  };
}


export function fetchCurrentIssue(username, repoName, issueNumber) {
  return dispatch => {
    dispatch(requestCurrentIssue(username, repoName, issueNumber));
    return fetch(`https://api.github.com/repos/${username}/${repoName}/issues/${issueNumber}`)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveCurrentIssue(username, repoName, issueNumber, json));
      });
  };
}
