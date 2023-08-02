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
          <Button color="inherit" sx={{ marginRight: '16px', backgroundColor: 'rgba(212, 212, 212, 0.30)' }}>
            Home
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            &nbsp;
          </Typography>
          <Button color="inherit" sx={{ backgroundColor: 'rgba(212, 212, 212, 0.30)' }}>
            Log In
          </Button>
          <Button color="inherit" sx={{ backgroundColor: 'rgba(212, 212, 212, 0.30)', marginLeft: '30px' }}>
            Sign in
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
