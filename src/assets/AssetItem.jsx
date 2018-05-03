import React from 'react';
import { withRouter } from 'react-router'
import Button from '../components/Button';
import defaultLogo from './bag.svg';

class AssetItem extends React.Component {

  constructor(props) {
    super(props);

    this.handleItemButtonClick = this.handleItemButtonClick.bind(this);
  }

  handleItemButtonClick(e, action = 'list') {
    const { symbol, kraken, target } = this.props;

    this.props.select({
      symbol: symbol,
      kraken: kraken,
      target: target
    });
    
    this.props.history.push(`/assets/${action}`);
  }

  render() {
    const { kraken, symbol, target } = this.props;

    return (
      <div className="AssetItem">
        <div className="flex-g1">
          <img className="icon" src={ defaultLogo } />
        </div>
        <div className="flex-g2">
          <h4 className="no-margin h5 gold">{ symbol }</h4>
          <p className="white">Kraken Symbol: { kraken }</p>
        </div>
        <div className="flex-g4 AssetItem-section">
          <h4 className="no-margin white">Stop Sell Price</h4>
          <p className="no-margin">
            <span className="h3 gold">{ target }</span><span className="white"> EUR</span>
          </p>
        </div>
        <div className="AssetItem-section">
          <Button name="Edit" click={(e) => this.handleItemButtonClick(e, 'edit')}/><br />
          <Button name="Delete" click={(e) => this.handleItemButtonClick(e, 'delete')} />
        </div>
      </div>
    )
  }
}

export default withRouter(AssetItem);