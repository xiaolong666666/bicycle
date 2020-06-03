import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Home from './pages/home'
import Buttons from './pages/ui/Buttons'
import Modals from './pages/ui/Modals'
import Loadings from './pages/ui/Loadings'
import Notification from './pages/ui/Notification'
import Messages from './pages/ui/Messages'
import Tabs from './pages/ui/Tabs'
import Gallery from './pages/ui/Gallery'
import Carousel from './pages/ui/Carousel'
import FormLogin from './pages/form/FormLogin'
import FormReg from './pages/form/FormReg'
import Basic from './pages/table/Basic'
import High from './pages/table/High'
import City from './pages/city'
import Order from './pages/order'
import Common from './common'
import OrderDetail from './pages/order/detail'
import Nomatch from './pages/nomatch'

const IRouter = () => {
    return (
        <App>
            <Router>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/common' render={() =>
                        <Common>
                            <Route path='/common/order/detail/:orderId' component={OrderDetail} />
                        </Common>
                    } />
                    <Route path='/' render={() =>
                        <Admin>
                            <Switch>
                                <Route path='/home' component={Home} />
                                <Route path='/ui/buttons' component={Buttons} />
                                <Route path='/ui/modals' component={Modals} />
                                <Route path='/ui/loadings' component={Loadings} />
                                <Route path='/ui/notification' component={Notification} />
                                <Route path='/ui/messages' component={Messages} />
                                <Route path='/ui/tabs' component={Tabs} />
                                <Route path='/ui/gallery' component={Gallery} />
                                <Route path='/ui/carousel' component={Carousel} />
                                <Route path='/form/login' component={FormLogin} />
                                <Route path='/form/reg' component={FormReg} />
                                <Route path='/table/basic' component={Basic} />
                                <Route path='/table/high' component={High} />
                                <Route path='/city' component={City} />
                                <Route path='/order' component={Order} />
                                <Redirect to='/home' />
                            </Switch>
                        </Admin>
                    } />
                    <Route component={Nomatch} />
                </Switch>
            </Router>
        </App>
    );
};

export default IRouter;