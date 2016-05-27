 /**
  * @flow
  */

import { AsyncStorage } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import reducers from '../reducers';

const isDebuggingInChrome = __DEV__ && !! window.navigator.userAgent;

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const createRN2Store = applyMiddleware( thunk, logger )( createStore );

export default function ( onComplete: ?() => void ) {
  const store = createRN2Store( reducers, undefined, autoRehydrate() );

  persistStore( store, { storage: AsyncStorage }, onComplete );

  if ( isDebuggingInChrome ) {
    window.store = store;
  }

  return store;
}

