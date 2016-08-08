import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchRepos, fetchIssues } from '../../actions';
import { SearchForm } from '../../components/CustomComponents/SearchForm';
import { Issues } from '../';
import Paginator from '../../components/CustomComponents/Paginator/Paginator';

// const Home = () => <div dangerouslySetInnerHTML={{ __html: content }} />;

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quantity: 30,
      repo: props.entities.issues.repo
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchRepos('facebook'));
  }

  changeQuantity(e) {
    const { dispatch } = this.props;
    const { repo } = this.state;
    dispatch(fetchIssues(repo, e.target.value));
    this.setState({ quantity: e.target.value });
  }

  selectItemHandler(item) {
    const { dispatch } = this.props;
    const { quantity } = this.state;
    dispatch(fetchIssues(item, quantity));
    this.setState({ repo: item });
  }

  render() {
    const { entities, dispatch } = this.props;
    const { quantity, repo } = this.state;
    if (entities.repos.isFetching) {
      return <h1>...Loading</h1>;
    }
    return (
      <div>
        <h1>Введите имя github пользователя</h1>
        <div>
          <div style={{ float: 'left', width: '50%' }}>
            <SearchForm
              query={entities.repos.query}
              items={entities.repos.items}
              searchHandler={query => {
                dispatch(fetchRepos(query));
              }}
              selectItemHandler={(item) => this.selectItemHandler(item)}
            />
          </div>
          <div style={{ float: 'left', width: '50%' }}>
            <p>Выберите колличество отображаемых обращений</p>
            <select onChange={(e) => this.changeQuantity(e)}>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div style={{ float: 'left', width: '100%' }}>
            <Issues issues={entities.issues} username={entities.repos.query} />
          </div>
          <div style={{ float: 'left', width: '100%' }}>
            <Paginator
              link={entities.issues.link}
              paginatorHandler={(url) => dispatch(fetchIssues(repo, quantity, url))}
            />
          </div>
        </div>
      </div>
    );
  }
}


Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  entities: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  const { dispatch, entities } = state;
  return { dispatch, entities };
}

export default connect(mapStateToProps)(Home);
