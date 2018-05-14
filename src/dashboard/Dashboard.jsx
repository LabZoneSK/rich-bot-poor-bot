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

    const botStatus = electronVariables.remote.getGlobal('sharedObj').bot.getBotStatus();

    this.state = {
      botStarted: botStatus,
      messages: new Set()
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
    setInterval(() => {
      const msg = electronVariables.remote.getGlobal('sharedObj').bot.getBotLog();
      const { messages } = this.state;
      if(msg) {
        msg.forEach((item) => { 

          messages.add(
            <Panel key={Math.random()} type={item.level} text={item.title} subheader={item.timestamp}/>
          );
  
          this.setState({
            messages: this.state.messages
          });
          /*
          if(messages.length > 3) {
            this.setState({
              messages: this.state.messages.slice(1, 4)
            })
          } else {
            this.setState({
              messages: this.state.messages
            })
          }
          */
      });  
      }
      electronVariables.remote.getGlobal('sharedObj').bot.clearBotLog();
    }, 2000);
  }

  render() {
    const botButtonText = (this.state.botStarted)? 'Stop bot' : 'Start bot';

    let logMessages = [];
    this.state.messages.forEach((item) => (
      logMessages.push(item)
    ));

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
          {logMessages}
        </div>

      </div>
    )
  }
}

export default Dashboard;