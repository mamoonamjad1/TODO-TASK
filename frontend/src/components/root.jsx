import React from 'react';
import NavBar from './navbar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return ( 
        <>
        <NavBar/>
        <Outlet/>
        </>
     );
}
 
export default RootLayout;