import React from 'react';
import { Redirect, Route } from "react-router-dom";
import {useEffect, useState} from "react" ;
import {isLoggedIn} from './auth.js';

export const PrivateRoute = ({test, component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isLoggedIn() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
);