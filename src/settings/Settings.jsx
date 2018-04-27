import React from 'react';

import ViewTitle from '../components/ViewTitle';
import Button from '../components/Button';
import icon from './controls.svg';

import { electronVariables } from '../electron-context';
import { handleInputChangesGeneric } from '../utils/FormUtils';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    const conf = electronVariables.remote.getGlobal('sharedObj').configuration;
    const configuration = conf.getConfiguration(conf.PRIVATE);

    this.state = {
      APIKey: configuration.APIKey,
      APISign: configuration.APISign,
      defaultPrecision: configuration.defaultPrecision,
      CCApiURL: configuration.CCApiURL
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSaveSettings = this.handleSaveSettings.bind(this);
  }

  handleInputChange(event) {
    handleInputChangesGeneric(event, this);
  }

  handleSaveSettings(e) {
    e.preventDefault();
    e.stopPropagation();

    const updateConfiguration = {
      APIKey: this.state.APIKey,
      APISign: this.state.APISign,
      defaultPrecision: this.state.defaultPrecision,
      CCApiURL: this.state.CCApiURL
    }

    const configuration = electronVariables.remote.getGlobal('sharedObj').configuration;
    configuration.updateConfiguration(configuration.PRIVATE, updateConfiguration);
  }

  render() {
    return (
      <form>
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
                  value={this.state.APIKey}
                  name="APIKey"
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Kraken API Sign</label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.APISign}
                  name="APISign"
                  onChange={this.handleInputChange}
                />
              </div>

            </section>

            <section className="col3">
              <h3 className="h5 white">Bot parameters</h3>

              <div className="form-group">
                <label>CryptoCompare API URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.CCApiURL}
                  name="CCApiURL"
                  onChange={this.handleInputChange}
                />
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
                click={this.handleSaveSettings}
              />
            </div>
          </div>
      </form>
    );
  }
}

export default Settings;