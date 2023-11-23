import { combineReducers } from '@reduxjs/toolkit';
import general from './general';
import appStore from './app-store';
import deploy from './deploy';
import drawer from './drawer';
import hardware from './hardware';
import swap from './swap';

const rootReducer = combineReducers({
  general,
  appStore,
  deploy,
  drawer,
  hardware,
  swap,
});

export default rootReducer;
