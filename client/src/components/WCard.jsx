import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Logo from '../images/Logo.png'; // Replace the path with the actual path to your image
import { Button } from '@mui/material';
export default function WCard() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
      <Card sx={{ minWidth: 150, maxWidth: 600, minHeight: 75, textAlign: 'center',  backgroundColor: 'rgba(212, 212, 212, 0.30)'
}}>
        <CardContent>
          <Typography variant="body2">
            WELCOME TO 
            <br />
            {'AURORA'}
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>

        </CardContent>
      </Card>
      <Button variant="contained"
            type="submit" 
            children= "Sign Up for free" 
            href='./signup'

            sx={{
                color: 'white',
                backgroundColor: 'rgba(212, 212, 212, 0.30)',
                border: '1px solid',
                position: 'absolute',
                top: '220px',
                borderRadius: '50px',
                '&:hover': { backgroundColor: 'rgba(212, 212, 212, 0.30)'
                }
            }}/>

      <Box sx={{ width: 100, p: 2 }}>
        <img src={Logo} alt="AURORA" style={{ width: '383px', height: 'auto', position: 'absolute', right: '68px' }} />
      </Box>
    </Box>
  );
}
