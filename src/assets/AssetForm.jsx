import React from "react";
import { withRouter } from "react-router";

import { electronVariables } from "../electron-context";
import { parsePrice } from '../utils/NumberUtils';
import { handleInputChangesGeneric, validatePrice } from "../utils/FormUtils";

import Button from "../components/Button";

class AssetForm extends React.Component {
  constructor(props) {
    super(props);

    const { asset } = this.props;

    console.log(asset);

    this.state = {
      symbol: asset.symbol || "",
      kraken: asset.kraken || "",
      target: asset.target || 0.0,
      krakenError: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleInputChange(e) {
    handleInputChangesGeneric(e, this);
  }

  validate(e) {
    const { name, value } = e.target;
    switch (name) {
      case "kraken":
        if (value.length === 0 || value.length > 4) {
          this.setState({
            krakenError:
              "Kraken symbol should not be empty and should have proper value.",
          });
        } else {
          this.setState({
            krakenError: false,
          });
        }
        return;
      case "symbol":
        if (value.length === 0 || value.length > 4) {
          this.setState({
            symbolError:
              "Symbol should not be empty and should have proper value.",
          });
        } else {
          this.setState({
            symbolError: false,
          });
        }
        return;
      case "target":
        const price = parsePrice(value);
        if (validatePrice(price)) {
          this.setState({
            targetError: "Price should be number.",
          });
        } else {
          this.setState({
            target: price,
            targetError: false,
          });
        }
        return;
      default:
        return;
    }
  }

  handleSaveChanges(e) {
    e.preventDefault();
    e.stopPropagation();

    const asset = electronVariables.remote.getGlobal("sharedObj").asset;

    let result = false;

    if (this.props.action === "Add") {
      result = asset.addAsset({
        symbol: this.state.symbol,
        kraken: this.state.kraken,
        target: this.state.target,
      });
    }

    if (this.props.action === "Edit") {
      result = asset.updateAsset({
        symbol: this.state.symbol,
        kraken: this.state.kraken,
        target: this.state.target,
      });
    }

    if (result) {
      this.props.history.push("/assets/list");
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
            onBlur={this.validate}
          />
          {this.state.symbolError && (
            <div className="error">{this.state.symbolError}</div>
          )}
        </div>

        <div className="form-group">
          <label>Kraken Symbol</label>
          <input
            type="text"
            className="form-control"
            value={this.state.kraken}
            name="kraken"
            onChange={this.handleInputChange}
            onBlur={this.validate}
          />
          {this.state.krakenError && (
            <div className="error">{this.state.krakenError}</div>
          )}
        </div>

        <div className="form-group">
          <label>Stop price</label>
          <input
            type="text"
            className="form-control"
            value={this.state.target}
            pattern="[0-9.,]+"
            name="target"
            onChange={this.handleInputChange}
            onBlur={this.validate}
          />
          {this.state.targetError && (
            <div className="error">{this.state.targetError}</div>
          )}
        </div>

        <div className="Settings-Toolbar">
          <Button name="Save changes" click={this.handleSaveChanges} />
        </div>
      </section>
    );
  }
}

export default withRouter(AssetForm);
