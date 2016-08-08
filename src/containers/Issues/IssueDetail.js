import styles from './IssueDetail.styl';
import React, { PropTypes, Component } from 'react';
import { fetchCurrentIssue } from '../../actions';
import { connect } from 'react-redux';


class IssueDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { username, repoName, issueNumber } = this.props.params;
    dispatch(fetchCurrentIssue(username, repoName, issueNumber));
  }

  render() {
    const { currentIssue } = this.props;
    if (currentIssue.isFetching && !currentIssue.issue.user) {
      return <h1>...Loading</h1>;
    }
    const user = currentIssue.issue.user || {};
    return (
      <div className={styles.issue_detail}>
        <h1>{ currentIssue.issue.title }</h1>
        <div className={styles.user_info}>
          <img width="100" height="100" src={ user.avatar_url } />
          <a href={ user.html_url }>{ user.login }</a>
        </div>
        <div className={styles.issue_info}>
          <button
            disabled
            style={{
              backgroundColor: (currentIssue.issue.state === 'open') ? '#e82b2b' : ''
            }}
          >{ currentIssue.issue.state }</button>
          <p>{ currentIssue.issue.body }</p>
        </div>
      </div>
    );
  }
}

IssueDetail.propTypes = {
  issues: PropTypes.array,
  params: PropTypes.object,
  currentIssue: PropTypes.object,
  dispatch: PropTypes.func
};


function mapStateToProps(state) {
  const { dispatch, currentIssue } = state.entities;
  return { dispatch, currentIssue };
}

export default connect(mapStateToProps)(IssueDetail);
