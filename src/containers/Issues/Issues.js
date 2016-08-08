import styles from './Issues.styl';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const Issues = ({ issues, username }) => (
  <div className={styles.listIssues}>
    {(issues.items.length > 0) &&
      issues.items.map(issue =>
        <div
          key={issue.number}
          className={styles.issue}
        >
          <div className={styles.user_info}>
            <p className={styles.number}>#{issue.number}</p>
            <p><a href={ issue.user.html_url }>{ issue.user.login }</a></p>
            <img width="50" height="50" src={ issue.user.avatar_url } />
            <p>{ issue.created_at }</p>
          </div>
          <div className={styles.issue_info}>
            <Link to={`/repos/${username}/${issues.repo.name}/issues/${issue.number}`}>{issue.title}</Link>
          </div>
        </div>
      )
    }
  </div>
);

Issues.propTypes = {
  issues: PropTypes.object,
  username: PropTypes.string
};

export default Issues;
