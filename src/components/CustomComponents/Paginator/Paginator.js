import React, { PropTypes } from 'react';


const Paginator = ({ link, paginatorHandler }) => (
  <div>
    {link &&
      link.split(', ').map((linkItem, index) => {
        const name = linkItem.split('; ')[1].split('"')[1];
        const linkUrl = linkItem.split('; ')[0].split('<')[1];
        return (
          <button
            key={index}
            onClick={() => paginatorHandler(linkUrl)}
          >{ name }</button>
        );
      })
    }
  </div>
);


Paginator.propTypes = {
  link: PropTypes.string,
  paginatorHandler: PropTypes.func
};


export default Paginator;
