import repos from './repos';
import issues from './issues';
import currentIssue from './currentIssue';
import { combineReducers } from 'redux';

export default combineReducers({
  repos,
  issues,
  currentIssue
});
