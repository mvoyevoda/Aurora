import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export default function HomeNB() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'flex-start', paddingLeft: '16px' }}>
          <Button
            color="inherit"
            href='./'
            sx={{
              marginRight: '16px',
              backgroundColor: 'transparent',
              border: '1px solid white', // Add a white stroke
              borderRadius: '4px', // Optional: add border radius to make the edges smoother
            }}
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
