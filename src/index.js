import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';

// Routers
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// Containers
import { App, Home, Login, Register } from './containers';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path='/' component={App}></Route>
            <Route path='/home' component={Home}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
