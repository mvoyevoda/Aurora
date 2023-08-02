import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Logo from './images/Logo.png'; // Replace the path with the actual path to your image

export default function WCard() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
      <Card sx={{ minWidth: 150, maxWidth: 600, minHeight: 75, textAlign: 'center' }}>
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
      <Box sx={{ width: 100, p: 2 }}>
        <img src={Logo} alt="AURORA" style={{ width: '100%', height: 'auto' }} />
      </Box>
    </Box>
  );
}
