
import React from 'react';
import DataManager from '../data-vault/DataManager';

interface DataVaultTabProps {
  userProfile: any;
}

const DataVaultTab: React.FC<DataVaultTabProps> = ({ userProfile }) => {
  return <DataManager />;
};

export default DataVaultTab;
