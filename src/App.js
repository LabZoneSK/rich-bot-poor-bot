import React, { Component } from 'react';
import './App.css';

import {
  MemoryRouter as Router,
  Route,
  Switch,
  NavLink as Link
} from 'react-router-dom';

import routes from './routes';
import {ElectronContext, electronVariables} from './electron-context';

/* Components */
import Header from './components/Header';

const remote = window.require('electron').remote || {};
const ipcRenderer = window.require('electron').ipcRenderer || {};

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      bot: remote.getGlobal('sharedObj').bot,
      counter: 0
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    
    //ipcRenderer.send('start-bot');
    (this.state.counter % 2 === 0) ? this.state.bot.start() : this.state.bot.stop();
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render() {
    return (
      <ElectronContext.Provider value={electronVariables}>
        <Router>
          <div className="App">
            <div className="App-Body">
              <div className="App-Sidebar">
                <Header />

                  <nav>
                    <div>
                      <ul className="nav">
                        { routes.map((route) => (
                          <li className="nav-category"><Link exact activeClassName="active" className="white not-decorated" to={ route.path }>{ route.name }</Link></li>
                        ))}
                      </ul>
                    </div>
                  </nav>

                  <span onClick={this.handleClick} >TEST ME</span>
              </div>

              <div className="App-MainContent">
                <Switch>
                  {routes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      component={route.component}
                    />
                  ))}
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </ElectronContext.Provider>
    );
  }
}

export default App;
