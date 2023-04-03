import {Redirect, Route} from 'react-router-dom';
import React from 'react';
import {LOGIN_INFO} from "../../constants/localStorage";

const PrivateRoute = ({component: Component}) => {
    const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
    return (
        <Route
            render={
                (props) => {
                    if (loginInfo && loginInfo.loginToken === '' || loginInfo && loginInfo.loginToken === null) {
                        return <Redirect to={'/'}/>;
                    }

                    return <Component {...props}/>;
                }
            }
        />
    );
};


export default PrivateRoute;
