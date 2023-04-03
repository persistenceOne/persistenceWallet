import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createBrowserHistory} from "history";
import * as serviceWorker from "./serviceWorker";
import {Router} from "react-router-dom";
import './components/Internationalization/i18n';
import "../src/assets/scss/index.css";
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {rootReducer} from "./store/reducers";

const history = createBrowserHistory();

const store = createStore(
    rootReducer,
    composeWithDevTools({
        trace: true,
    })(applyMiddleware(thunk)),
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
