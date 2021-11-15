import React from 'react';
import { Redirect, Route } from "react-router-dom";
import {useEffect, useState} from "react" ;
import {isLoggedIn} from './auth.js';

export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isLoggedIn() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
);