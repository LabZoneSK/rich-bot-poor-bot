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

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      bot: remote.getGlobal('sharedObj').bot,
      counter: 0
    };
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
                        { routes.map((route, index) => (
                          <li key={'route-' + index} className="nav-category"><Link exact activeClassName="active" className="white not-decorated" to={ route.path }>{ route.name }</Link></li>
                        ))}
                      </ul>
                    </div>
                  </nav>
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
