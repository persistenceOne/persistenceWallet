import React, {useEffect, useState} from 'react';
import {Switch, Route, withRouter, useHistory} from 'react-router-dom';
import DashboardWallet from "./views/DashboardWallet";
import Homepage from "./views/Homepage";
import DashboardStaking from "./views/Staking";
import PrivateRoute from "./containers/PrivateRoute";
import ImportWallet from "./containers/ImpotWallet";
import KeplerHome from "./views/Kepler/KeplerHome";
import RouteNotFound from "./components/RouteNotFound";
import config from "./config"
import icon_white from "./assets/images/icon_white.svg"
const App = () => {
    const history = useHistory();
    const routes = [{
        path: '/dashboard/wallet',
        component: DashboardWallet,
        private: true,
    }, {
        path: '/dashboard/staking',
        component: DashboardStaking,
        private: true,
    }, {
        path: '/import_wallet',
        component: ImportWallet,
        private: false,
    }, {
        path: '/kepler',
        component: KeplerHome,
        private: false,
    }];
    const [isOnline, setNetwork] = useState(window.navigator.onLine);
    const updateNetwork = () => {
        setNetwork(window.navigator.onLine);
    };
    useEffect(() => {
        window.addEventListener("offline", updateNetwork);
        window.addEventListener("online", updateNetwork);
        return () => {
            window.removeEventListener("offline", updateNetwork);
            window.removeEventListener("online", updateNetwork);
        };
    });
    let address;
    const version = localStorage.getItem('version');
    if (version == null || config.version !== version) {
        localStorage.clear();
        history.push('/');
    } else {
        address = localStorage.getItem('address');
    }

    return (
       <>
           {
               !isOnline ?
                   <div className="network-check">
                       <div className="stage">
                               <div className="bouncer-holder">
                                   <div className="bouncer">
                                       <img src={icon_white} className="icon-white" alt="icon_white"/>
                                   </div>
                               </div>
                           <h3 className="text-left">No Internet</h3>
                           <p>Try:</p>
                           <ul>
                               <li>Checking the network cables, modem and router</li>
                               <li>Reconnecting to Wi-Fi</li>
                           </ul>
                       </div>
                   </div>
                   : ""
           }
           <Switch>
               <Route
                   key="/"
                   exact
                   component={address === undefined || address === null || address === '' ? withRouter(Homepage) : withRouter(DashboardWallet)}
                   path="/"/>
               {
                   routes.map((route) => {
                       if (route.private) {
                           return (
                               <PrivateRoute
                                   key={route.path}
                                   exact
                                   component={withRouter(route.component)}
                                   path={route.path}
                               />
                           );
                       }

                       return (
                           <Route
                               key={route.path}
                               exact
                               component={withRouter(route.component)}
                               path={route.path}/>
                       );
                   })
               }
               <Route component={RouteNotFound}/>
           </Switch>
           </>
    );
};

export default App;