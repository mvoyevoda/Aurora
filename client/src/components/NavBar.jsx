import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'flex-start', paddingLeft: '16px' }}>
          <Button
            color="inherit"
            sx={{
              marginRight: '16px',
              backgroundColor: 'transparent',
              border: '1px solid white', // Add a white stroke
              borderRadius: '4px', // Optional: add border radius to make the edges smoother
            }}
          >
            Home
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            &nbsp;
          </Typography>
          <Button
            color="inherit"
            href='./login'
            sx={{
              backgroundColor: 'transparent',
              border: '1px solid white', // Add a white stroke
              borderRadius: '4px', // Optional: add border radius to make the edges smoother
            }}
          >
            Log In
          </Button>
          <Button
            color="inherit"
            href='./signup'
            sx={{
              backgroundColor: 'transparent',
              border: '1px solid white', // Add a white stroke
              borderRadius: '4px', // Optional: add border radius to make the edges smoother
              marginLeft: '30px',
            }}
          >
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
