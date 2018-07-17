import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index'
import thunkMiddleware from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import {Route } from "react-router-dom"
import 'semantic-ui-css/semantic.css';
import Home from './components/Home/Home'
import CreateDataSet from './components/CreateDataSet/CreateDataSet'

const history = createHistory()

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
     applyMiddleware(
       thunkMiddleware,
     routerMiddleware(history))
   ))

ReactDOM.render(
        <Provider store= {store} >
          <ConnectedRouter history= {history}>
            <div>
              <Route exact path = "/" component= {Home}/>
              <Route path = "/createAsset" component = {CreateDataSet} />
            </div>
          </ConnectedRouter>
        </Provider>

, document.getElementById('root'));
registerServiceWorker();
