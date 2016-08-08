import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, Home, NotFound, StyleScoping, IssueDetail } from './containers';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/repos/:username/:repoName/issues/:issueNumber" component={IssueDetail} />
    <Route path="styles" component={StyleScoping} />
    { /* catch all route */ }
    <Route path="*" component={NotFound} />
  </Route>
);
