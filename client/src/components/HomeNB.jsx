// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
// import { Link } from 'react-router-dom';

export default function HomeNB() {
  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
    //     <Toolbar sx={{ justifyContent: 'flex-start', paddingLeft: '1em' }}>
    //     <Link to={'/'} style={{textDecoration: 'none', color: 'white'}}>
            <Button
              color="inherit"
              sx={{
                // marginRight: '1em',
                backgroundColor: 'transparent',
                border: '1px solid white', // Add a white stroke
                borderRadius: '0.25em', // Optional: add border radius to make the edges smoother
              }}
            >
              Home
            </Button>
    //       </Link>
    //     </Toolbar>
    //   </AppBar>
    // </Box>
  );}
