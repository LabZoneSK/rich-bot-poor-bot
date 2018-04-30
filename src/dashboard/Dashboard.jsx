import React from 'react';
import { electronVariables } from '../electron-context';

import Button  from '../components/Button';
import Panel from '../components/Panel';

import ViewTitle from '../components/ViewTitle';

import icon from './dashboard.svg';
import './Dashboard.css';

class Dashboard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      botStarted: false,
      messages: new Array()
    }

    this.handleBotButton = this.handleBotButton.bind(this);
  }

  handleBotButton() {
    if (this.state.botStarted) {
      electronVariables.remote.getGlobal('sharedObj').bot.stop();
    } else {
      electronVariables.remote.getGlobal('sharedObj').bot.start();
    }

    this.setState(prevState => ({
      botStarted: !prevState.botStarted
    }));
    
  }

  componentDidMount() {
    let index = 0;
    setInterval(() => {
      const msg = electronVariables.remote.getGlobal('sharedObj').bot.getBotLog();
      const { messages } = this.state;
      if(msg) {
        messages.push(
          <Panel key={Math.random()} type="info" text={index + msg} />
        );
        index++;

        if(messages.length > 3) {
          this.setState({
            messages: this.state.messages.slice(1, 4)
          })
        } else {
          this.setState({
            messages: this.state.messages
          })
        }
      }
    }, 2000);
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
          {this.state.messages}
          <Panel type="success" text="Bot has successfully started." />
          
        </div>

      </div>
    )
  }
}

export default Dashboard;