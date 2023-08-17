import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Features() {
  return (
    <Box
      sx={{
        display: 'flex',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card sx={{backgroundColor: 'rgba(212, 212, 212, 0.0)'}}>
        <CardContent>
          <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
          textAlign: 'center', 
          color: 'white' }}>
            Features
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
