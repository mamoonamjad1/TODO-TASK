import { AppBar, Box } from '@mui/material';
import React from 'react';

const NavBar = () => {
    return ( 
        <>
            <AppBar position='static'>
                <Box sx={{textAlign:'center', p:3, backgroundColor:'black'}}>
                SIMPLE TODO APP
                </Box>
                
            </AppBar>
        </>
     );
}
 
export default NavBar;