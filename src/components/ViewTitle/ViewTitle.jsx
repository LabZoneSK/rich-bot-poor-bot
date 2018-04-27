import React from 'react';

import './ViewTitle.css';

const ViewTitle = ({ icon, title, subtitle }) => (
  <div className="ViewTitle">
    <div className="Title-icon"><img src={ icon } alt="Icon for dashboard view" /></div>
      <div className="Title-text">
        <h2 className="h3 white">{ title }</h2>
        <small className="light-grey">{ subtitle }</small>
    </div>
  </div>
);

export default ViewTitle;