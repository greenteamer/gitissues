import React, { PropTypes } from 'react';
import styles from './SearchForm.styl';
import SelectItem from './SelectItem';


const SearchForm = ({ query, items, searchHandler, selectItemHandler }) => (
  <div>
    <form
      className={styles.form}
      onSubmit={ event => {
        event.preventDefault();
        searchHandler(event.target.query.value);
      }}
    >
      <input type="text" name="query" defaultValue={query} placeholder="Имя пользователя" />
      <button type="submit">Поиск</button>
    </form>
    {items.length > 0 &&
      <SelectItem
        items={items}
        selectItemHandler={item => selectItemHandler(item) }
      />
    }
  </div>
);


SearchForm.propTypes = {
  query: PropTypes.string,
  searchHandler: PropTypes.func,
  selectItemHandler: PropTypes.func,
  items: PropTypes.array
};


export default SearchForm;
