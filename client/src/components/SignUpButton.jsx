import React from 'react';
import Button from '@mui/material/Button';

const SignUpButton = () => {
  return (
    <Button
      variant="contained"
      type="submit"
      children="Sign Up for free"
      href="./signup"
      sx={{
        color: 'white',
        backgroundColor: 'rgba(212, 212, 212, 0.30)',
        border: '1px solid',
        borderRadius: '50px',
        '&:hover': { backgroundColor: 'rgba(212, 212, 212, 0.30)' }
      }}
    />
  );
};

export default SignUpButton;
