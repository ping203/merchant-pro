
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import promise from './promise';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import createFilter from 'redux-persist-transform-filter';

const enhancer = compose(
  applyMiddleware(
    thunk, promise
  ),
  devTools({
    name: 'NativeStarterProwithExpNav', realtime: true,
  })
);

var store = createStore(
  reducer,
  enhancer,
  autoRehydrate(),
);

export function configureStore(onCompletion:()=>void):any {
  persistStore(store, { storage: AsyncStorage }, onCompletion);
  return store;
}

export default store;
