import React from 'react';

const remote = window.require('electron').remote || {};
const ipcRenderer = window.require('electron').ipcRenderer || {};
export const electronVariables = {
  remote,
  ipcRenderer
};

export const ElectronContext = React.createContext(electronVariables);