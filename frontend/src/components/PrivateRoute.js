import React from 'react';
import { Redirect, Route } from "react-router-dom";
import {useEffect, useState} from "react" ;
import { useCookies } from 'react-cookie';

export default function PrivateRoute({path}) {
    // const [cookie, setCookie] = useState("")
    // useEffect(() => {
    //     setCookie(cookie.get('Id'))
    //     console.log("this is a cookie :" + cookie)
    // })
    // if(cookie.name !== "admin"){
        return (    
            <Route> 
                    <Redirect
                    to={{
                        pathname: path,
                    }}
                    />
            </Route> 
        )
    // }
}