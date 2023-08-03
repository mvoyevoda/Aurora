import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../styles/signup.css"
import Link from '@mui/material/Link';
import axios from 'axios';


export default function LogIn(){
    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
          const response = await axios({
            method: 'post',
            url: 'http://localhost:4000/api/auth/login',
            data: {
              email: emailRef.current.value,
              password: passwordRef.current.value,
            },
            withCredentials: true,
          });
          console.log(response.data);
          navigate('/app');
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      };      
    return (
        <>
        <h1>Log In</h1>
        <form onSubmit={handleLogIn} className="signup_form">
            <TextField
            sx={{
                backgroundColor: 'rgba(217, 217, 217, 0.20)',
                marginBottom: '10px'
            }}
            variant="standard"
            label= "Email"
            id="email"
            fullWidth= "true"
            required
            inputRef = { emailRef }
            />
            <TextField
            sx={{
                backgroundColor: 'rgba(217, 217, 217, 0.20)',
                marginBottom: '10px'
            }}
            variant="standard"
            label= "Password"
            id="password"
            type="password"
            fullWidth= "true"
            required
            inputRef = { passwordRef }
            />
            <Link href="#" variant="p" color = 'inherit' 
            sx={{
                position: 'relative',
                left: '320px',
                
            }}>
                Forgot password?
            </Link>
            <Button href="./signup" 
            variant="outlined" 
            sx={{
                marginTop: '10px',
                color: 'white',
                border: '1px solid',
                borderRadius: '50px',
                display: 'block',
                marginBottom: '20px' 
            }}>
                Don&apos;t have an account?
            </Button>
            <Button variant="outlined"
            type="submit" 
            sx={{
                color: 'white',
                border: '1px solid',
                display: 'block',
                width: '100%',
                borderRadius: '50px',
                '&:hover': {
                }
            }}>
                Log In
            </Button>
         </form>
        </>
    )
}
