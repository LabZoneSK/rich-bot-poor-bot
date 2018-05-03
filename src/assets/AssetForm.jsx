import React from 'react';
import { withRouter } from 'react-router';

import { electronVariables } from '../electron-context';
import { handleInputChangesGeneric } from '../utils/FormUtils';

import Button from '../components/Button';

class AssetForm extends React.Component {
  constructor(props) {
    super(props);

    const { asset } = this.props;

    console.log(asset);

    this.state = {
      symbol: asset.symbol || '',
      kraken: asset.kraken || '',
      target: asset.target || 0.0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
  }

  handleInputChange(e) {
    handleInputChangesGeneric(e, this);
  }
  handleSaveChanges(e) {
    e.preventDefault();
    e.stopPropagation();

    const asset = electronVariables.remote.getGlobal('sharedObj').asset;


    let result = false;
    
    if(this.props.action === 'Add') {
      result = asset.addAsset({
        symbol: this.state.symbol,
        kraken: this.state.kraken,
        target: this.state.target
      });
    }

    if(this.props.action === 'Edit') {
      result = asset.updateAsset({
        symbol: this.state.symbol,
        kraken: this.state.kraken,
        target: this.state.target
      });
    }

    if(result) {
      this.props.history.push('/assets/list');
    }
  }

  render() {
    return (
      <section className="section col3">
        <h3 className="h5 white">{this.props.action} asset</h3>

        <div className="form-group">
          <label>Symbol</label>
          <input
            type="text"
            className="form-control"
            value={this.state.symbol}
            name="symbol"
            onChange={this.handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Kraken Symbol</label>
          <input
            type="text"
            className="form-control"
            value={this.state.kraken}
            name="kraken"
            onChange={this.handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Stop price</label>
          <input
            type="text"
            className="form-control"
            value={this.state.target}
            name="target"
            onChange={this.handleInputChange}
          />
        </div>

        <div className="Settings-Toolbar">
          <Button
              name="Save changes"
              click={this.handleSaveChanges}
          />
        </div>
      </section>
    )
  }
}

export default withRouter(AssetForm);