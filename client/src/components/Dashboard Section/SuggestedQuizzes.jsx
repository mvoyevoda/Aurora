import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function SuggestedTitle() {
  return (
    <Card 
    sx={{
        background: "rgba(212, 212, 212, 0.3)",
        height: '10vh',
        width: "50vh",
        marginBottom: "10vh",
    }}
    >
      <CardContent>
        <Typography 
        sx={{ mb: 1.5 }} 
        color="text.secondary"
        >
          Suggested
        </Typography>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </CardContent>
    </Card>
  );
}