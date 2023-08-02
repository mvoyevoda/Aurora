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
          <Button color="inherit" sx={{ marginRight: '16px' }}>
            Home
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            &nbsp;
          </Typography>
          <Button color="inherit">Sign in</Button>
          <Button color="inherit">Log in</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
