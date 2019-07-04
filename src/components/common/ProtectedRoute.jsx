import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Check User Status
// Check Onboarding then role (expert or doctor)
// if there is no onboarding status then have to redirect to resprctive dashboard

const LoginRoute = ({ component: Component, ...rest }) => {
    const userToken = localStorage.getItem('userdetail');

    return (
        <Route
            {...rest}
            render={props => {
                return (
                    (userToken ?
                        <Component {...props} />
                        :
                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    )
                )
            }
            }
        />
    );
};

export default LoginRoute