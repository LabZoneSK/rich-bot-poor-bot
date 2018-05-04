import React from 'react';

import './Panel.css';

const Panel = ({type, text, subheader}) => {
  
  let color = 'panel-c-default';
  switch(type) {
    case 'info':
      color = 'panel-c-info';
      break;
    case 'success':
      color = 'panel-c-success';
      break;
  }

  return (
    <div className={'panel ' + color}>
      { text } <small className="right">| { subheader }</small>
    </div>
  );
}

export default Panel;