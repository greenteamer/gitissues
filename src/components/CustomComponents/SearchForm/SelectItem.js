import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import styles from './SelectItem.styl';


class SelectItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      filteredItems: (props.items) ? props.items : [],
      keyIndex: undefined,
      hiddenList: true
    };
  }

  changeText(e) {
    const text = e.target.value;
    this.setState({ text });
    this.filterItems(text);
  }

  filterItems(text) {
    const { items } = this.props;
    const filteredItems = _.filter(items, item => {
      const str = item.name.toLowerCase();
      if (str.indexOf(text) >= 0) {
        return true;
      } else if (item.name.indexOf(text) >= 0) {
        return true;
      }
      return null;
    });
    this.setState({
      filteredItems
    });
  }

  selectByKeyPress(e) {
    const { selectItemHandler } = this.props;
    const { filteredItems, keyIndex } = this.state;
    if (e.keyCode === 40) {
      //  нажатие на стрелку вниз
      const index = ((keyIndex || keyIndex === 0) && keyIndex < filteredItems.length) ? keyIndex + 1 : 0;
      this.setState({
        keyIndex: index,
        text: filteredItems[index].name
      });
    } else if (e.keyCode === 38) {
      // нажатие на стрелку вверх
      const index = (keyIndex >= 0 || keyIndex) ? keyIndex - 1 : filteredItems.length - 1;
      this.setState({
        keyIndex: index,
        text: filteredItems[index].name
      });
    } else if (e.keyCode === 13) {
      // нажатие на Enter
      e.preventDefault();
      e.stopPropagation();
      selectItemHandler(filteredItems[keyIndex]);
      this.closeSelect();
    }
  }

  cancelEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
    }
    return false;
  }

  closeSelect() {
    // this.setState({
    //   hiddenList: true,
    //   keyIndex: undefined
    // });
    setTimeout(() => {
      this.setState({
        hiddenList: true,
        keyIndex: undefined
      });
    }, 100);
  }

  render() {
    const { selectItemHandler } = this.props;
    const { text, filteredItems, keyIndex, hiddenList } = this.state;
    return (
      <div>
        <form>
          <input
            ref="nameInput"
            type="text"
            value={text}
            placeholder="начните воодить название репозитория"
            onChange={(e) => this.changeText(e)}
            onKeyUp={(e) => this.selectByKeyPress(e)}
            onKeyDown={(e) => this.cancelEnter(e)}
            onFocus={() => this.setState({ hiddenList: false })}
            onBlur={() => this.closeSelect()}
          />
          {!hiddenList &&
            <div className={styles.list_wrapper}>
              <ul className={styles.list}>
                {filteredItems.map((item, index) =>
                  <li
                    key={item.id}
                    className={(keyIndex === index) ? styles.selected : ''}
                    onClick={() => {
                      selectItemHandler(item);
                      this.setState({
                        keyIndex: index,
                        text: item.name
                      });
                      this.closeSelect();
                    }}
                  >{item.name}</li>
                )}
              </ul>
            </div>
          }
        </form>
      </div>
    );
  }
}

SelectItem.propTypes = {
  items: PropTypes.array,
  selectItemHandler: PropTypes.func
};

export default SelectItem;
