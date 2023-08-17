import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Card sx={{ 
      display: 'flex',
      marginTop: '5vh',
      alignItems: 'center',  // Center content vertically
      justifyContent: 'center',  // Center content horizontally
      backgroundColor: 'transparent',
      boxShadow: 'none',
      }}>
      <CardContent>
        <Typography sx={{ fontSize: 14, color: 'rgba(212, 212, 212, 1)' }}>
          © 2023 Aurora. All rights reserved.
        </Typography>
      </CardContent>
    </Card>
  );
}
