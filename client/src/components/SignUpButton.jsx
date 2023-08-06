import Button from '@mui/material/Button';

const SignUpButton = () => {
  return (
    <Button
      variant="contained"
      type="submit"
      href="./signup"
      sx={{
        color: 'white',
        backgroundColor: 'rgba(212, 212, 212, 0.30)',
        border: '0.06em solid',
        borderRadius: '50px',
        '&:hover': { backgroundColor: 'rgba(212, 212, 212, 0.30)' }
      }}
    >
      Sign Up for free
    </Button>
  );
};

export default SignUpButton;
