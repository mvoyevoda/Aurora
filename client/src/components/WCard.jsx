import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Logo from '../images/Logo.png'; // Replace the path with the actual path to your image

export default function WCard() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 24 }}>
      <Card sx={{ minWidth: 300, maxWidth: 700, minHeight: 300, textAlign: 'center', backgroundColor: 'rgba(212, 212, 212, 0.30)', boxShadow: 'none' }}>
        <CardContent>
          <Typography variant="body1" fontWeight="bold" fontSize={48} color={"white"} paddingTop={3} sx={{ lineHeight: 1 }}>
            WELCOME TO
          </Typography>

          <Typography variant="body1" fontWeight="bold" fontSize={52} color={"white"} paddingTop={1} paddingBottom={1} sx={{ lineHeight: 1 }}>
            AURORA
          </Typography>

          <Typography variant="body2" fontWeight="light-bold" color={"white"} fontSize={30} paddingTop={1} sx={{ lineHeight: 1 }} >
            Generate, assess, and improve with interactive quizzes. Track progress, receive valuable feedback, and unlock your learning potential.
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ width: 700, paddingRight: 22, paddingTop: 10 }}>
        <img src={Logo} alt="AURORA" style={{ width: '100%', height: 'auto' }} />
      </Box>
    </Box>
  );
}
