import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DashboardActions from './actions';

import { electronVariables } from '../electron-context';

import Button  from '../components/Button';
import Panel from '../components/Panel';

import ViewTitle from '../components/ViewTitle';

import icon from './dashboard.svg';
import './Dashboard.css';
class Dashboard extends React.Component {
  
  constructor(props) {
    super(props);

    console.log(this.props);
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
     
      if(msg) {
        msg.forEach((item) => { 
          console.log(item);

          this.props.addMessage(
            <Panel key={Math.random()} type={item.level} text={item.title} subheader={item.timestamp}/>
          );
  
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
    const { messages } = this.props;
    
    let logMessages = [];
    for (let iterator = messages.values(), message = null; message = iterator.next().value; ) {
      logMessages.push(message);
    }

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

/* Container part */
const mapStateToProps = (state) => {
  return {
    ...state.dashboard,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...DashboardActions,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);