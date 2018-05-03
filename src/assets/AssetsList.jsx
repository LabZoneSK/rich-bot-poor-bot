import React from 'react';
import { Link } from 'react-router-dom';

import AssetItem from './AssetItem';
import Button from '../components/Button';

class AssetsList extends React.PureComponent {

  render() {

    const { assets, selectAsset } = this.props;
    console.log(assets);

    return(
      <div>
        <div className="Toolbar">
          <Link to="/assets/add">
            <Button name="Add asset" click={(e) => console.log('Clicked')} />
          </Link>
        </div>

        <section>
          <h3 className="h5 white">Stop-loss assets</h3>

          { assets.map((asset, index) => 
            <AssetItem 
              key={'asset-item-' + index} 
              symbol={asset.symbol}
              kraken={asset.kraken}
              target={asset.target}
              select={selectAsset} 
            />
          )}
        </section>
      </div>
    )
  }
}

export default AssetsList;