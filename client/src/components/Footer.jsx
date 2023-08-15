import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Card sx={{ 
    minWidth: 275,
    marginTop: '42px',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    }}>
      <CardContent>
        <Typography sx={{fontSize: 14}} marginTop= "4vh" color="rgba(212, 212, 212, 1)" gutterBottom>
        © 2023 Aurora. All rights reserved.
        </Typography>
      </CardContent>
    </Card>
  );
}