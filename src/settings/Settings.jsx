import React from 'react';

import ViewTitle from '../components/ViewTitle';
import Button from '../components/Button';
import icon from './controls.svg';

import {ElectronContext, electronVariables} from '../electron-context';
import { handleInputChangesGeneric } from '../utils/FormUtils';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      krakenAPIKey: '',
      krakenAPISign: '',
      defaultPrecision: 2,
      
    }
    this.handleInputChange = this.handleInputChange.bind(this);

    console.log(electronVariables);
  }

  handleInputChange(event) {
    handleInputChangesGeneric(event, this);
  }

  render() {
    return (
      <ElectronContext.Consumer>
        {electronVariables => 
          <div className="Setting">
            <ViewTitle
              icon={icon}
              title="Settings"
              subtitle="Configure parameters for your bot."
            />

            <section className="section col3">
              <h3 className="h5 white">Kraken API Configuration</h3>

              <div className="form-group">
                <label>Kraken API Key</label>
                <input 
                  type="password"
                  className="form-control"
                  value={this.state.krakenAPIKey}
                  name="krakenAPIKey"
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Kraken API Sign</label>
                <input 
                  type="password"
                  className="form-control"
                  value={this.state.krakenAPISign}
                  name="krakenAPISign"
                  onChange={this.handleInputChange}
                />
              </div>

            </section> 

            <section className="col3">
              <h3 className="h5 white">Bot parameters</h3>

              <div className="form-group">
                <label>CryptoCompare API URL</label>
                <input type="text" className="form-control" value="" name="cc" />
              </div>

              <div className="form-group">
                <label>Default price precision</label>
                <input 
                  type="number"
                  className="form-control"
                  value={this.state.defaultPrecision}
                  name="defaultPrecision"
                  onChange={this.handleInputChange}
                />
              </div>

            </section> 

            <div className="Settings-Toolbar">
              <Button
                name="Save settings"
                click={() => console.log('Save settings')}
              />
            </div>
          </div>}
      </ElectronContext.Consumer>
    );
  }
}

export default Settings;