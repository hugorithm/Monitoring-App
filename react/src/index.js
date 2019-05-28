// import "./index.css";
import "./nvd3.css";
import * as serviceWorker from "./serviceWorker";
import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import {Root} from "./components/Root";
import {Home} from "./components/Home";
import {User} from "./components/User";
import {Ping} from "./components/Ping";
import {Mongo} from "./components/Mongo";
import {Mysql} from "./components/Mysql";
// import {Http} from "./components/Http"


import "./nvd3.css";
// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path={"/"} component={Root} >
                    <IndexRoute component={Home} />
                    <Route path={"user/:id"} component={User} />
                    <Route path={"home"} component={Home} />
                    <Route path={"config/ping"} component={Ping}/>
                    <Route path={"config/mongo"} component={Mongo}/>
                    <Route path={"config/mysql"} component={Mysql}/>
                </Route>
                <Route path={"home-single"} component={Home}/>
            </Router>
        );
    }
}

render(<App />, window.document.getElementById('root'));

// const app = ReactDOM.render(<App/>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
