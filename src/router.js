import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Buttons from './pages/ui/buttons'
import Nomatch from './pages/nomatch'

class IRouter extends Component {
    render() {
        return (
            <App>
                <Router>
                    <Switch>
                        <Route path='/login' component={Login} />
                        <Route path='/' render={() =>
                            <Admin>
                                <Switch>
                                    <Route path='/ui/buttons' component={Buttons} />
                                    <Route component={Nomatch} />
                                </Switch>
                            </Admin>
                        } />
                        <Route path='/order/detail' component={Login} />
                        <Route component={Admin} />
                    </Switch>
                </Router>
            </App>
        );
    }
}

export default IRouter;