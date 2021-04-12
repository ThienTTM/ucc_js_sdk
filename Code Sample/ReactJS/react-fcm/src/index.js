import React from 'react';
import ReactDOM from 'react-dom';
// import { registerServiceWorker } from "./register-sw";
import AppComponent from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import VideoCallComponent from './VideoCallComponent';

// registerServiceWorker();

const App = () => (
    <Router>
        <Route exact path="/" component={AppComponent} />
        <Route path="/call" component={VideoCallComponent} />
    </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
