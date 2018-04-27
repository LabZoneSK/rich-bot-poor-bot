import React from 'react';

import './Panel.css';

const Panel = ({type, text}) => {
  
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
      { text }
    </div>
  );
}

export default Panel;