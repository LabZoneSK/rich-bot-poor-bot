import React from 'react';

import ViewTitle from '../components/ViewTitle';
import icon from './savings.svg';

class Assets extends React.Component {

  render() {
    return (
      <div className="Assets">
        <ViewTitle
          icon={icon}
          title="Digital Assets"
          subtitle="Configure stop-loss parameters for your assets."
        />
      </div>
    );
  }
}

export default Assets;