import React from 'react';

import Button  from '../components/Button';
import Panel from '../components/Panel';

import ViewTitle from '../components/ViewTitle';

import icon from './dashboard.svg';
import './Dashboard.css';

class Dashboard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      botStarted: false
    }

    this.handleBotButton = this.handleBotButton.bind(this);
  }

  handleBotButton() {
    this.setState(prevState => ({
      botStarted: !prevState.botStarted
    }));
  }

  render() {
    const botButtonText = (this.state.botStarted)? 'Stop bot' : 'Start bot';

    return (
      <div className="Dashboard">
        <ViewTitle
          icon={icon}
          title="Dashboard"
          subtitle="Main control screen for stop-loss bot."
        />

        <div className="Dashboard-Toolbar">
          <Button
            name={botButtonText}
            click={this.handleBotButton}
          />
        </div>

        <div className="Dashboard-Main">
          <h3 className="h5 white">Log history</h3>
          <Panel type="success" text="Bot has successfully started." />
          <Panel type="info" text="There is no symbol bellow the target level." />
        </div>

      </div>
    )
  }
}

export default Dashboard;