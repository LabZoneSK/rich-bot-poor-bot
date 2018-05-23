import React from 'react';

import { electronVariables } from '../electron-context';

import ViewTitle from '../components/ViewTitle';
import AssetsList from './AssetsList';
import AssetForm from './AssetForm';

import './Assets.css';
import icon from './savings.svg';

class Assets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAsset: null
    };

    this.setSelectedAsset = this.setSelectedAsset.bind(this);
  }

  setSelectedAsset(asset) {
    this.setState({
      selectedAsset: asset
    });
  }

  deleteSelectedAsset() {
    const asset = electronVariables.remote.getGlobal('sharedObj').asset;
    asset.deleteAsset(this.state.selectedAsset);
  }

  render() {
    let content = '';
    switch(this.props.match.params.action) {
      case 'add':
        content = <AssetForm action="Add" asset={false} />;
        break;
      case 'delete':
        this.deleteSelectedAsset();
        break;
      case 'edit':
        content = <AssetForm action="Edit" asset={this.state.selectedAsset} />;
        break;
      case 'list':
      default:
        const assets = electronVariables.remote.getGlobal('sharedObj').asset.getAssets();
        content = <AssetsList assets={assets} selectAsset={this.setSelectedAsset} />
    }

    return (
      <div className="Assets">
        <ViewTitle
          icon={icon}
          title="Digital Assets"
          subtitle="Configure stop-loss parameters for your assets."
        />

      {content}
      </div>
    );
  }
}

export default Assets;